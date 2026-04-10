// ============================================================
//  services.js — Business logic: routing, notifications,
//  weather, QR, voice, analytics, trip management
// ============================================================

// ---- Navigation ----
function navigateTo(view) {
    state.currentView = view;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Weather (mock — swap for OpenWeatherMap API in production) ----
function fetchWeather() {
    const conditions = ['Sunny ☀️', 'Partly Cloudy ⛅', 'Rainy 🌧️', 'Windy 💨', 'Thunderstorm ⛈️'];
    const temps = [18, 22, 25, 28, 15, 20];
    state.weather = {
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        temp: temps[Math.floor(Math.random() * temps.length)],
        alert: Math.random() > 0.75 ? '⚠️ Rain expected — remind students to bring umbrellas!' : null
    };
}

// ---- Notifications (mock — wire to Twilio/SendGrid in production) ----
function sendNotification(recipient, message, type = 'info') {
    const notification = {
        id: Date.now() + Math.random(),
        recipient,
        message,
        type,
        timestamp: new Date().toISOString(),
        sent: true
    };
    state.notifications.push(notification);
    console.log(`📱 [${type.toUpperCase()}] → ${recipient}: ${message}`);
    return notification;
}

// ---- Messaging ----
function sendMessage(to, from, message) {
    const msg = {
        id: Date.now(),
        to,
        from,
        message,
        timestamp: new Date().toISOString(),
        read: false
    };
    state.messages.push(msg);
    saveData();
    sendNotification(to, `New message from ${from}: ${message}`, 'chat');
    return msg;
}

// ---- Ride requests ----
async function submitRideRequest(formData) {
    const newRequest = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        pickupPoint: formData.pickupPoint,
        specialNeeds: formData.specialNeeds || '',
        emergencyContact: formData.emergencyContact,
        status: 'pending',
        assignedVehicle: null,
        pickupTime: null,
        submittedAt: new Date().toISOString()
    };

    state.rideRequests.push(newRequest);
    await saveData();

    sendNotification(
        formData.phone,
        `Hi ${formData.name}! 🙏 Your ride request for Sunday has been received. You'll get your pickup time after Saturday 6 PM.`,
        'sms'
    );
    if (formData.email) {
        sendNotification(
            formData.email,
            `Ride request confirmed for Sunday service at 9:30 AM. We'll notify you with pickup details by Saturday evening.`,
            'email'
        );
    }

    state.userData = formData;
    return newRequest;
}

// ---- Volunteer registration ----
async function submitVolunteerAvailability(formData) {
    const newVolunteer = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        seats: parseInt(formData.seats),
        available: true,
        assignedStudents: []
    };

    state.volunteers.push(newVolunteer);
    await saveData();

    sendNotification(
        formData.phone,
        `Thank you for volunteering to drive on Sunday! 🚗 We'll assign you ${formData.seats} nearby student(s) and send route details Saturday evening.`,
        'sms'
    );
    return newVolunteer;
}

// ---- Distance (heuristic — replace with Google Distance Matrix API in production) ----
function calculateDistance(point1, point2) {
    const hash = (str) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = ((h << 5) - h) + str.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h);
    };
    const lat1 = (hash(point1) % 1000) / 100;
    const lng1 = (hash(point1 + 'lng') % 1000) / 100;
    const lat2 = (hash(point2) % 1000) / 100;
    const lng2 = (hash(point2 + 'lng') % 1000) / 100;
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

// ---- Google Maps deep link ----
function generateMapsRoute(stops) {
    if (!stops.length) return '';
    const church = encodeURIComponent('Heritage Baptist Church, Benoni, South Africa');
    const waypoints = stops.map(s => encodeURIComponent(s.pickupPoint || s.address)).join('/');
    return `https://www.google.com/maps/dir/${church}/${waypoints}/${church}`;
}

// ---- Route optimisation (nearest-neighbour heuristic) ----
function optimizeRoutes() {
    if (state.rideRequests.length === 0) {
        alert('⚠️ No ride requests to process yet. Students need to submit their requests first!');
        return;
    }

    const churchLocation   = 'Church — Heritage Baptist, Benoni';
    const serviceTime      = new Date();
    serviceTime.setHours(9, 30, 0, 0);

    const busCapacity       = 15;
    const availableVolunteers = state.volunteers.filter(v => v.available);
    let unassigned          = [...state.rideRequests];
    const bus1Stops         = [];
    const bus2Stops         = [];
    const volunteerAssignments = {};

    let bus1Count = 0;
    let bus2Count = 0;
    let currentBus = 1;

    while (unassigned.length > 0 && (bus1Count < busCapacity || bus2Count < busCapacity)) {
        const bus1Last = bus1Stops.length ? bus1Stops[bus1Stops.length - 1].address : churchLocation;
        const bus2Last = bus2Stops.length ? bus2Stops[bus2Stops.length - 1].address : churchLocation;

        if (bus1Count < busCapacity && bus2Count >= busCapacity) currentBus = 1;
        else if (bus2Count < busCapacity && bus1Count >= busCapacity) currentBus = 2;

        const target = currentBus === 1 ? bus1Last : bus2Last;
        let nearestIdx = 0, minDist = Infinity;

        unassigned.forEach((student, idx) => {
            const dist = calculateDistance(target, student.address);
            if (dist < minDist) { minDist = dist; nearestIdx = idx; }
        });

        const student = unassigned.splice(nearestIdx, 1)[0];

        if (currentBus === 1 && bus1Count < busCapacity) { bus1Stops.push(student); bus1Count++; }
        else if (currentBus === 2 && bus2Count < busCapacity) { bus2Stops.push(student); bus2Count++; }
        else { unassigned.push(student); break; }

        currentBus = currentBus === 1 ? 2 : 1;
    }

    // Assign overflow to volunteers
    unassigned.forEach(student => {
        let assigned = false;
        for (const vol of availableVolunteers) {
            if (!volunteerAssignments[vol.id]) volunteerAssignments[vol.id] = [];
            if (volunteerAssignments[vol.id].length < vol.seats) {
                volunteerAssignments[vol.id].push(student);
                assigned = true;
                break;
            }
        }
        if (!assigned) {
            if (!volunteerAssignments['overflow']) volunteerAssignments['overflow'] = [];
            volunteerAssignments['overflow'].push(student);
        }
    });

    // Assign pickup times
    const assignPickupTimes = (stops, vehicleLabel, speed = 5) => {
        let totalTime = 0;
        const timed = stops.map((stop, idx) => {
            if (idx > 0) {
                const dist = calculateDistance(stops[idx - 1].address, stop.address);
                totalTime += dist * speed + 3;
            } else { totalTime += 5; }

            const pickupTime = new Date(serviceTime.getTime() - (30 + totalTime) * 60000);
            return { ...stop, pickupTime: pickupTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }), assignedVehicle: vehicleLabel, status: 'confirmed' };
        });
        return timed.reverse();
    };

    const bus1WithTimes = assignPickupTimes(bus1Stops, 'Bus 1');
    const bus2WithTimes = assignPickupTimes(bus2Stops, 'Bus 2');

    Object.keys(volunteerAssignments).forEach(volId => {
        if (volId === 'overflow') return;
        const vol = state.volunteers.find(v => v.id === parseInt(volId));
        if (vol) {
            volunteerAssignments[volId] = volunteerAssignments[volId].map((s, idx) => ({
                ...s,
                pickupTime: new Date(serviceTime.getTime() - (25 + idx * 5) * 60000)
                    .toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
                assignedVehicle: vol.name,
                status: 'confirmed'
            }));
        }
    });

    state.routes = { bus1: bus1WithTimes, bus2: bus2WithTimes, volunteers: volunteerAssignments };

    // Update ride request statuses
    state.rideRequests = state.rideRequests.map(req => {
        const inBus1 = bus1WithTimes.find(s => s.id === req.id);
        const inBus2 = bus2WithTimes.find(s => s.id === req.id);
        if (inBus1) return inBus1;
        if (inBus2) return inBus2;
        for (const volId in volunteerAssignments) {
            const found = volunteerAssignments[volId].find(s => s.id === req.id);
            if (found) return found;
        }
        return req;
    });

    // Send notifications
    bus1WithTimes.forEach(s => sendNotification(s.phone, `🚌 Sunday Pickup: Bus 1 will collect you at ${s.pickupTime} from ${s.pickupPoint || s.address}. Service starts 9:30 AM.`, 'sms'));
    bus2WithTimes.forEach(s => sendNotification(s.phone, `🚌 Sunday Pickup: Bus 2 will collect you at ${s.pickupTime} from ${s.pickupPoint || s.address}. Service starts 9:30 AM.`, 'sms'));

    Object.keys(volunteerAssignments).forEach(volId => {
        if (volId === 'overflow') return;
        const vol = state.volunteers.find(v => v.id === parseInt(volId));
        const students = volunteerAssignments[volId];
        if (vol && students.length) {
            const list = students.map((s, i) => `${i + 1}. ${s.name} — ${s.pickupTime} at ${s.pickupPoint || s.address}`).join('\n');
            sendNotification(vol.phone, `🚗 Your Sunday route:\n\n${list}\n\nThank you for serving!`, 'sms');
            sendNotification(vol.phone, `📍 Google Maps Route: ${generateMapsRoute(students)}`, 'sms');
            students.forEach(s => sendNotification(s.phone, `🚗 Sunday Pickup: ${vol.name} will collect you at ${s.pickupTime}. Their number: ${vol.phone}`, 'sms'));
        }
    });

    saveData();

    const totalAssigned = bus1WithTimes.length + bus2WithTimes.length +
        Object.keys(volunteerAssignments).filter(k => k !== 'overflow').reduce((sum, k) => sum + volunteerAssignments[k].length, 0);

    alert(`✅ Routes optimised!\n\n${totalAssigned} students assigned\n${state.notifications.length} notifications queued\n\nAll students and drivers have been notified!`);
    render();
}

// ---- Attendance ----
function markAttendance(studentId, present) {
    state.attendance[studentId] = { present, markedAt: new Date().toISOString() };
    saveData();
    render();
}

// ---- Live tracking simulation ----
function startLiveTracking(vehicleId) {
    if (state.liveTracking[vehicleId]) return;

    state.liveTracking[vehicleId] = {
        status: 'en_route',
        currentStop: 0,
        eta: 15,
        speed: 45,
        lastUpdate: Date.now()
    };

    const interval = setInterval(() => {
        const track = state.liveTracking[vehicleId];
        if (!track) { clearInterval(interval); return; }

        track.eta = Math.max(0, track.eta - 1);
        track.lastUpdate = Date.now();

        if (track.eta === 0) {
            clearInterval(interval);
            track.status = 'arrived';
        }

        if (state.currentView === 'liveTracking') render();
    }, 60000);
}

// ---- Trip completion ----
function completeTrip(vehicleId) {
    state.tripHistory.push({
        id: Date.now(),
        vehicleId,
        date: new Date().toISOString(),
        onTime: Math.random() > 0.1,
        studentsTransported: state.routes[vehicleId]?.length || 0
    });
    updateAnalytics();
    alert('🎉 Trip completed successfully! Thank you for serving.');
}

// ---- Analytics ----
function updateAnalytics() {
    state.analytics.totalTrips    = state.tripHistory.length;
    state.analytics.totalStudents = state.rideRequests.length;
    const onTimeTrips = state.tripHistory.filter(t => t.onTime).length;
    state.analytics.onTimeRate = state.tripHistory.length > 0
        ? Math.round((onTimeTrips / state.tripHistory.length) * 100)
        : 95;
    saveData();
}

// ---- Export CSV ----
function exportRideRequestsCSV() {
    if (!state.rideRequests.length) { alert('No ride requests to export.'); return; }
    const header = ['Name', 'Phone', 'Email', 'Address', 'Pickup Point', 'Special Needs', 'Status', 'Vehicle', 'Pickup Time', 'Submitted At'];
    const rows = state.rideRequests.map(r => [
        r.name, r.phone, r.email || '', r.address, r.pickupPoint || '',
        r.specialNeeds || '', r.status, r.assignedVehicle || '', r.pickupTime || '',
        new Date(r.submittedAt).toLocaleString()
    ]);
    const csv = [header, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `ride-requests-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ---- QR code (placeholder — swap for qrcode.js in production) ----
function generateQRCode(data) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect x='20' y='20' width='60' height='60' fill='none' stroke='%233A4F5C' stroke-width='6'/%3E%3Crect x='35' y='35' width='30' height='30' fill='%233A4F5C'/%3E%3Crect x='120' y='20' width='60' height='60' fill='none' stroke='%233A4F5C' stroke-width='6'/%3E%3Crect x='135' y='35' width='30' height='30' fill='%233A4F5C'/%3E%3Crect x='20' y='120' width='60' height='60' fill='none' stroke='%233A4F5C' stroke-width='6'/%3E%3Crect x='35' y='135' width='30' height='30' fill='%233A4F5C'/%3E%3Ctext x='100' y='115' text-anchor='middle' fill='%233A4F5C' font-size='9' font-family='monospace'%3E${encodeURIComponent(data.slice(-10))}%3C/text%3E%3C/svg%3E`;
}

// ---- Voice announcement (Web Speech API) ----
function speakAnnouncement(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// ---- Voice command handler ----
function handleVoiceCommand() {
    speakAnnouncement('Voice commands activated. How can I help you?');

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
        alert('🎤 Voice commands:\n\n• "Track" — View live tracking\n• "Message" — Open chat\n• "Status" — Check ride status\n• "Home" — Go home\n• "Admin" — Open admin panel');
        return;
    }

    const recognition = new SR();
    recognition.onresult = (event) => {
        const cmd = event.results[0][0].transcript.toLowerCase();
        if      (cmd.includes('track') || cmd.includes('location')) { speakAnnouncement('Opening live tracking');  navigateTo('liveTracking'); }
        else if (cmd.includes('message') || cmd.includes('chat'))   { speakAnnouncement('Opening messages');       navigateTo('chat'); }
        else if (cmd.includes('status'))                             { speakAnnouncement('Opening ride status');    navigateTo('studentDash'); }
        else if (cmd.includes('admin'))                              { speakAnnouncement('Opening admin panel');    navigateTo('admin'); }
        else if (cmd.includes('home'))                               { speakAnnouncement('Going home');             navigateTo('home'); }
        else { speakAnnouncement("Sorry, I didn't understand that command."); }
    };
    recognition.start();
}
