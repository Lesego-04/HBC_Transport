// ============================================================
//  views.js — All render/view functions (pure HTML strings)
// ============================================================

// ---- Home ----
function renderHomeScreen() {
    const unreadMessages = state.messages.filter(m => !m.read).length;

    return `
        <div style="max-width:1400px;margin:0 auto;">
            <div class="fade-in" style="text-align:center;margin-bottom:4rem;padding:2rem 0;">
                <h1 class="hero-title">Heritage Baptist Church</h1>
                <h2 style="font-size:1.75rem;color:var(--text-secondary);font-weight:400;margin-bottom:.5rem;font-family:'Crimson Text',serif;">Transportation Ministry</h2>
                <p style="font-size:1.125rem;color:var(--text-secondary);max-width:700px;margin:0 auto;line-height:1.8;">
                    Coordinating rides for students to Sunday morning service at 9:30 AM
                </p>
                ${state.weather ? `<div style="margin-top:1rem;font-size:.9rem;color:var(--text-secondary);">${state.weather.condition} · ${state.weather.temp}°C</div>` : ''}
            </div>

            ${state.weather?.alert ? `<div class="alert alert-warning fade-in" style="margin-bottom:2rem;max-width:900px;margin-left:auto;margin-right:auto;">
                <div style="width:24px;height:24px;color:var(--accent);">${icons.cloud}</div>
                <p>${state.weather.alert}</p>
            </div>` : ''}

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-bottom:4rem;">
                <div class="card fade-in stagger-1" onclick="navigateTo('studentDash')" style="cursor:pointer;">
                    <div class="icon-wrapper">${icons.users}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">I'm a Student</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Request a ride to Sunday service</p>
                    <div class="badge badge-primary">Request Now →</div>
                </div>
                <div class="card fade-in stagger-2" onclick="navigateTo('volunteer')" style="cursor:pointer;">
                    <div class="icon-wrapper success">${icons.car}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">Volunteer Driver</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Help transport students to church</p>
                    <div class="badge badge-success">Sign Up →</div>
                </div>
                <div class="card fade-in stagger-3" onclick="navigateTo('liveTracking')" style="cursor:pointer;position:relative;">
                    <div class="icon-wrapper accent">${icons.location}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">Live Tracking</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Track buses in real-time</p>
                    <div class="badge badge-accent">Track Now →</div>
                    <div class="live-indicator" style="position:absolute;top:1rem;right:1rem;">
                        <div class="live-dot"></div>LIVE
                    </div>
                </div>
                <div class="card fade-in stagger-4" onclick="navigateTo('admin')" style="cursor:pointer;">
                    <div class="icon-wrapper">${icons.settings}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">Admin</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Manage routes and coordination</p>
                    <div class="badge badge-primary">Manage →</div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-bottom:4rem;">
                <div class="card fade-in" onclick="navigateTo('analytics')" style="cursor:pointer;">
                    <div class="icon-wrapper">${icons.chart}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">Analytics</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">View insights and statistics</p>
                    <div class="badge badge-primary">View Stats →</div>
                </div>
                <div class="card fade-in" onclick="navigateTo('chat')" style="cursor:pointer;position:relative;">
                    <div class="icon-wrapper success">${icons.chat}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">Messages</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Chat with drivers & admin</p>
                    <div class="badge badge-success">Open Chat →</div>
                    ${unreadMessages > 0 ? `<div class="notification-badge">${unreadMessages}</div>` : ''}
                </div>
                <div class="card fade-in" onclick="navigateTo('qrCheckin')" style="cursor:pointer;">
                    <div class="icon-wrapper accent">${icons.qrcode}</div>
                    <h3 style="font-size:1.5rem;margin-bottom:.5rem;">QR Check-in</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Quick attendance scanning</p>
                    <div class="badge badge-accent">Scan Now →</div>
                </div>
            </div>

            <div class="card fade-in" style="background:var(--primary);color:white;padding:3rem;margin-bottom:4rem;">
                <h2 style="font-size:2rem;margin-bottom:2rem;color:white;font-family:'Crimson Text',serif;">How It Works</h2>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:3rem;">
                    <div>
                        <div class="step-number" style="background:rgba(255,255,255,.15);margin-bottom:1rem;">1</div>
                        <h3 style="font-size:1.25rem;margin-bottom:.75rem;color:white;">Submit Request</h3>
                        <p style="color:rgba(255,255,255,.9);line-height:1.8;">Students request rides before Saturday 6 PM with saved addresses</p>
                    </div>
                    <div>
                        <div class="step-number" style="background:rgba(255,255,255,.15);margin-bottom:1rem;">2</div>
                        <h3 style="font-size:1.25rem;margin-bottom:.75rem;color:white;">Route Optimisation</h3>
                        <p style="color:rgba(255,255,255,.9);line-height:1.8;">Smart algorithm creates efficient routes with Google Maps integration</p>
                    </div>
                    <div>
                        <div class="step-number" style="background:rgba(255,255,255,.15);margin-bottom:1rem;">3</div>
                        <h3 style="font-size:1.25rem;margin-bottom:.75rem;color:white;">Get Notified</h3>
                        <p style="color:rgba(255,255,255,.9);line-height:1.8;">Receive pickup time and driver info via SMS and email</p>
                    </div>
                </div>
            </div>

            <div class="feature-grid fade-in">
                <div class="feature-card">
                    <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--primary);">${icons.location}</div>
                    <h3 style="font-size:1.125rem;margin-bottom:.5rem;">Real-Time Tracking</h3>
                    <p style="color:var(--text-secondary);font-size:.875rem;">Watch buses arrive with live ETAs</p>
                </div>
                <div class="feature-card">
                    <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--success);">${icons.chat}</div>
                    <h3 style="font-size:1.125rem;margin-bottom:.5rem;">Instant Messaging</h3>
                    <p style="color:var(--text-secondary);font-size:.875rem;">Chat directly with your driver</p>
                </div>
                <div class="feature-card">
                    <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--accent);">${icons.qrcode}</div>
                    <h3 style="font-size:1.125rem;margin-bottom:.5rem;">QR Check-in</h3>
                    <p style="color:var(--text-secondary);font-size:.875rem;">Contactless attendance scanning</p>
                </div>
            </div>
        </div>

        <button onclick="handleVoiceCommand()" class="floating-action" title="Voice Commands">
            <div style="width:32px;height:32px;">${icons.mic}</div>
        </button>
    `;
}

// ---- Student Request Form ----
function renderStudentRequestForm() {
    const weatherAlert = state.weather?.alert ? `
        <div class="alert alert-warning fade-in">
            <div style="width:24px;height:24px;color:var(--accent);">${icons.cloud}</div>
            <div>
                <p style="font-weight:600;margin-bottom:.25rem;">Sunday Forecast: ${state.weather.condition}, ${state.weather.temp}°C</p>
                <p style="font-size:.875rem;color:var(--text-secondary);">${state.weather.alert}</p>
            </div>
        </div>` : '';

    return `
        <div style="max-width:700px;margin:0 auto;">
            <div class="card fade-in">
                <div style="text-align:center;margin-bottom:2rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--primary);">${icons.bus}</div>
                    <h2 style="font-size:2.5rem;margin-bottom:.5rem;">Request a Ride</h2>
                    <p style="color:var(--text-secondary);font-size:1.125rem;">Sunday Service at 9:30 AM</p>
                </div>

                <div class="alert alert-info fade-in" style="margin-bottom:2rem;">
                    <div style="width:24px;height:24px;color:var(--primary);">${icons.clock}</div>
                    <div>
                        <p style="font-weight:600;margin-bottom:.25rem;">Deadline: Saturday 6:00 PM</p>
                        <p style="font-size:.875rem;color:var(--text-secondary);">You'll receive your pickup time via SMS & Email after cutoff</p>
                    </div>
                </div>

                ${weatherAlert}

                <form id="studentForm" style="margin-top:2rem;">
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Full Name *</label>
                        <input type="text" name="name" required class="input" placeholder="Enter your full name">
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Phone Number *</label>
                        <input type="tel" name="phone" required class="input" placeholder="+27 12 345 6789">
                        <p style="font-size:.875rem;color:var(--text-secondary);margin-top:.5rem;">📱 We'll SMS you pickup details</p>
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Email Address</label>
                        <input type="email" name="email" class="input" placeholder="your.email@example.com">
                        <p style="font-size:.875rem;color:var(--text-secondary);margin-top:.5rem;">📧 Optional: Receive email confirmation</p>
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Home Address *</label>
                        <input type="text" name="address" required class="input" placeholder="123 Main Street, Benoni">
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Pickup Point</label>
                        <select name="pickupPoint" class="input">
                            <option value="">My home address</option>
                            <option value="Northmead Square">Northmead Square</option>
                            <option value="Benoni Lake">Benoni Lake</option>
                            <option value="Rynfield Shopping Centre">Rynfield Shopping Centre</option>
                            <option value="Petit Shopping Centre">Petit Shopping Centre</option>
                        </select>
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Emergency Contact *</label>
                        <input type="tel" name="emergencyContact" required class="input" placeholder="+27 12 345 6789">
                        <p style="font-size:.875rem;color:var(--text-secondary);margin-top:.5rem;">Parent/Guardian contact</p>
                    </div>
                    <div style="margin-bottom:2rem;">
                        <label class="label">Special Needs (optional)</label>
                        <textarea name="specialNeeds" class="input" rows="3" placeholder="Wheelchair access, medical equipment, etc."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;padding:1.25rem;">
                        <div style="width:24px;height:24px;">${icons.check}</div>
                        Submit Request
                    </button>
                </form>
            </div>
        </div>`;
}

// ---- Volunteer Form ----
function renderVolunteerForm() {
    return `
        <div style="max-width:700px;margin:0 auto;">
            <div class="card fade-in">
                <div style="text-align:center;margin-bottom:2rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--success);">${icons.car}</div>
                    <h2 style="font-size:2.5rem;margin-bottom:.5rem;">Volunteer to Drive</h2>
                    <p style="color:var(--text-secondary);font-size:1.125rem;">Serve by transporting students</p>
                </div>

                <div class="alert alert-success fade-in" style="margin-bottom:2rem;">
                    <div style="width:24px;height:24px;color:var(--success);">${icons.check}</div>
                    <div>
                        <p style="font-weight:600;margin-bottom:.25rem;">Thank you for volunteering!</p>
                        <p style="font-size:.875rem;color:var(--text-secondary);">You'll receive a Google Maps route with pickup times by Saturday evening</p>
                    </div>
                </div>

                <form id="volunteerForm">
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Full Name *</label>
                        <input type="text" name="name" required class="input" placeholder="Your full name">
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Phone Number *</label>
                        <input type="tel" name="phone" required class="input" placeholder="+27 12 345 6789">
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Email Address</label>
                        <input type="email" name="email" class="input" placeholder="your.email@example.com">
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label class="label">Your Address *</label>
                        <input type="text" name="address" required class="input" placeholder="123 Main Street, Benoni">
                        <p style="font-size:.875rem;color:var(--text-secondary);margin-top:.5rem;">We'll assign students near you</p>
                    </div>
                    <div style="margin-bottom:2rem;">
                        <label class="label">Available Seats *</label>
                        <select name="seats" class="input">
                            <option value="1">1 seat</option>
                            <option value="2">2 seats</option>
                            <option value="3" selected>3 seats</option>
                            <option value="4">4 seats</option>
                            <option value="5">5 seats</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success" style="width:100%;padding:1.25rem;">
                        Confirm Availability
                    </button>
                </form>
            </div>
        </div>`;
}

// ---- Admin Dashboard ----
function renderAdminDashboard() {
    const attendanceCount = Object.values(state.attendance).filter(a => a.present).length;
    const bus1Progress    = (state.routes.bus1.length / 15) * 100;
    const bus2Progress    = (state.routes.bus2.length / 15) * 100;

    return `
        <div style="max-width:1400px;margin:0 auto;">
            <div class="header-gradient fade-in">
                <div style="position:relative;z-index:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                        <div>
                            <h2 style="font-size:2.5rem;margin-bottom:.5rem;color:white;">Admin Dashboard</h2>
                            <p style="color:rgba(255,255,255,.9);">Manage transportation coordination</p>
                        </div>
                        <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
                            <button onclick="exportRideRequestsCSV()" class="btn" style="background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3);">
                                <div style="width:20px;height:20px;">${icons.export}</div>
                                Export CSV
                            </button>
                            <button onclick="navigateTo('notifications')" class="btn" style="background:rgba(255,255,255,.2);color:white;border:2px solid rgba(255,255,255,.3);">
                                <div style="width:20px;height:20px;">${icons.bell}</div>
                                ${state.notifications.length} Notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:2rem;">
                <div class="stat-card fade-in stagger-1">
                    <div style="font-size:2.5rem;font-weight:700;color:var(--primary);margin-bottom:.5rem;">${state.rideRequests.length}</div>
                    <div style="color:var(--text-secondary);font-weight:600;">Total Requests</div>
                </div>
                <div class="stat-card fade-in stagger-2">
                    <div style="font-size:2.5rem;font-weight:700;color:var(--success);margin-bottom:.5rem;">${state.routes.bus1.length}/15</div>
                    <div style="color:var(--text-secondary);font-weight:600;">Bus 1 Capacity</div>
                    <div class="progress-bar" style="margin-top:1rem;"><div class="progress-fill" style="width:${bus1Progress}%;"></div></div>
                </div>
                <div class="stat-card fade-in stagger-3">
                    <div style="font-size:2.5rem;font-weight:700;color:var(--success);margin-bottom:.5rem;">${state.routes.bus2.length}/15</div>
                    <div style="color:var(--text-secondary);font-weight:600;">Bus 2 Capacity</div>
                    <div class="progress-bar" style="margin-top:1rem;"><div class="progress-fill" style="width:${bus2Progress}%;"></div></div>
                </div>
                <div class="stat-card fade-in stagger-4">
                    <div style="font-size:2.5rem;font-weight:700;color:var(--accent);margin-bottom:.5rem;">${state.volunteers.length}</div>
                    <div style="color:var(--text-secondary);font-weight:600;">Volunteers</div>
                </div>
                <div class="stat-card fade-in stagger-4">
                    <div style="font-size:2.5rem;font-weight:700;color:var(--primary-light);margin-bottom:.5rem;">${attendanceCount}/${state.rideRequests.length}</div>
                    <div style="color:var(--text-secondary);font-weight:600;">Attendance</div>
                </div>
            </div>

            <div class="card fade-in" style="margin-bottom:2rem;display:flex;gap:1rem;flex-wrap:wrap;">
                <button onclick="optimizeRoutes()" class="btn btn-primary" style="flex:1;padding:1.25rem;font-size:1.125rem;min-width:200px;">
                    <div style="width:24px;height:24px;">${icons.navigation}</div>
                    Generate Optimised Routes & Send Notifications
                </button>
                <button onclick="clearAllData()" class="btn btn-danger" style="padding:1.25rem;">
                    <div style="width:24px;height:24px;">${icons.trash}</div>
                    Clear All Data
                </button>
            </div>

            ${renderBusRoute('Bus 1', state.routes.bus1, 'primary', 1)}
            ${renderBusRoute('Bus 2', state.routes.bus2, 'success', 2)}
            ${renderVolunteerRoutes()}

            ${state.rideRequests.length > 0 ? `
            <div class="card fade-in" style="margin-top:2rem;">
                <h3 style="font-size:1.5rem;margin-bottom:1.5rem;">All Ride Requests (${state.rideRequests.length})</h3>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:.875rem;">
                        <thead>
                            <tr style="border-bottom:2px solid var(--border);">
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Name</th>
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Phone</th>
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Address</th>
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Status</th>
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Vehicle</th>
                                <th style="text-align:left;padding:.75rem 1rem;color:var(--text-secondary);">Pickup</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.rideRequests.map(r => `
                                <tr style="border-bottom:1px solid var(--border);">
                                    <td style="padding:.75rem 1rem;">${r.name}</td>
                                    <td style="padding:.75rem 1rem;">${r.phone}</td>
                                    <td style="padding:.75rem 1rem;">${r.pickupPoint || r.address}</td>
                                    <td style="padding:.75rem 1rem;"><span class="badge badge-${r.status === 'confirmed' ? 'success' : 'accent'}">${r.status}</span></td>
                                    <td style="padding:.75rem 1rem;">${r.assignedVehicle || '—'}</td>
                                    <td style="padding:.75rem 1rem;">${r.pickupTime || '—'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>` : ''}
        </div>`;
}

function renderBusRoute(title, stops, color, busNumber) {
    if (!stops.length) {
        return `
            <div class="card fade-in" style="margin-bottom:2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <h3 style="font-size:1.5rem;display:flex;align-items:center;gap:.75rem;">
                        <div style="width:32px;height:32px;color:var(--${color});">${icons.bus}</div>
                        ${title} Route
                    </h3>
                    <span class="badge badge-${color}">0 students</span>
                </div>
                <p style="text-align:center;color:var(--text-secondary);padding:2rem;">No students assigned yet</p>
            </div>`;
    }

    const mapsUrl = generateMapsRoute(stops);
    return `
        <div class="card fade-in" style="margin-bottom:2rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
                <h3 style="font-size:1.5rem;display:flex;align-items:center;gap:.75rem;">
                    <div style="width:32px;height:32px;color:var(--${color});">${icons.bus}</div>
                    ${title} Route
                </h3>
                <div style="display:flex;gap:1rem;align-items:center;">
                    <span class="badge badge-${color}">${stops.length} students</span>
                    <button onclick="window.open('${mapsUrl}','_blank')" class="btn btn-${color}">
                        <div style="width:20px;height:20px;">${icons.navigation}</div>
                        Open in Maps
                    </button>
                    <button onclick="completeTrip('bus${busNumber}')" class="btn btn-secondary">
                        <div style="width:20px;height:20px;">${icons.check}</div>
                        Complete Trip
                    </button>
                </div>
            </div>
            <div style="display:grid;gap:1rem;">
                ${stops.map((stop, idx) => {
                    const isPresent = state.attendance[stop.id]?.present;
                    return `
                        <div class="route-card">
                            <div style="display:flex;gap:1rem;align-items:start;">
                                <div class="step-number" style="width:40px;height:40px;font-size:1rem;flex-shrink:0;">${idx + 1}</div>
                                <div style="flex:1;">
                                    <h4 style="font-size:1.125rem;margin-bottom:.25rem;">${stop.name}</h4>
                                    <p style="color:var(--text-secondary);font-size:.875rem;margin-bottom:.5rem;">${stop.pickupPoint || stop.address}</p>
                                    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                                        <span class="badge badge-${color}">${stop.pickupTime}</span>
                                        <span style="font-size:.875rem;color:var(--text-secondary);">${stop.phone}</span>
                                    </div>
                                </div>
                                <button onclick="markAttendance(${stop.id},${!isPresent})" class="btn" style="padding:.75rem;${isPresent ? 'background:var(--success);color:white;' : 'background:#f5f5f5;color:var(--text-secondary);'}">
                                    <div style="width:20px;height:20px;">${icons.check}</div>
                                </button>
                            </div>
                        </div>`;
                }).join('')}
            </div>
        </div>`;
}

function renderVolunteerRoutes() {
    const keys = Object.keys(state.routes.volunteers).filter(k => k !== 'overflow');
    if (!keys.length) return '';

    return `
        <div class="card fade-in">
            <h3 style="font-size:1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;">
                <div style="width:32px;height:32px;color:var(--accent);">${icons.car}</div>
                Volunteer Assignments
            </h3>
            <div style="display:grid;gap:2rem;">
                ${keys.map(volId => {
                    const vol      = state.volunteers.find(v => v.id === parseInt(volId));
                    const students = state.routes.volunteers[volId];
                    const mapsUrl  = generateMapsRoute(students);
                    return `
                        <div style="border-left:4px solid var(--accent);padding-left:1.5rem;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                                <div>
                                    <h4 style="font-size:1.25rem;margin-bottom:.25rem;">${vol?.name}</h4>
                                    <p style="color:var(--text-secondary);font-size:.875rem;">${students.length} student(s) assigned</p>
                                </div>
                                <button onclick="window.open('${mapsUrl}','_blank')" class="btn btn-accent">
                                    <div style="width:20px;height:20px;">${icons.navigation}</div>Route
                                </button>
                            </div>
                            <div style="display:grid;gap:.75rem;">
                                ${students.map(s => {
                                    const isPresent = state.attendance[s.id]?.present;
                                    return `
                                        <div style="background:rgba(155,139,126,.05);border-radius:12px;padding:1rem;display:flex;justify-content:space-between;align-items:center;">
                                            <div>
                                                <p style="font-weight:600;">${s.name}</p>
                                                <p style="font-size:.875rem;color:var(--text-secondary);">${s.address}</p>
                                                <span class="badge badge-accent" style="margin-top:.5rem;">${s.pickupTime}</span>
                                            </div>
                                            <button onclick="markAttendance(${s.id},${!isPresent})" class="btn" style="padding:.75rem;${isPresent ? 'background:var(--success);color:white;' : 'background:#f5f5f5;color:var(--text-secondary);'}">
                                                <div style="width:20px;height:20px;">${icons.check}</div>
                                            </button>
                                        </div>`;
                                }).join('')}
                            </div>
                        </div>`;
                }).join('')}
            </div>
        </div>`;
}

// ---- Student Dashboard ----
function renderStudentDashboard() {
    const myRequest = state.rideRequests.find(r => r.phone === state.userData?.phone);

    if (!myRequest) {
        return `
            <div style="max-width:600px;margin:0 auto;">
                <div class="card fade-in" style="text-align:center;padding:4rem 2rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--text-secondary);opacity:.3;">${icons.alert}</div>
                    <h2 style="font-size:2rem;margin-bottom:1rem;">No Ride Request Yet</h2>
                    <p style="color:var(--text-secondary);margin-bottom:2rem;font-size:1.125rem;">You haven't requested a ride for this Sunday</p>
                    <button onclick="navigateTo('request')" class="btn btn-primary" style="padding:1.25rem 2.5rem;">
                        Request a Ride
                    </button>
                </div>
            </div>`;
    }

    const isConfirmed   = myRequest.status === 'confirmed';
    const statusColor   = isConfirmed ? 'success' : 'accent';
    const myDriver      = isConfirmed && myRequest.assignedVehicle && !myRequest.assignedVehicle.includes('Bus')
        ? state.volunteers.find(v => v.name === myRequest.assignedVehicle)
        : null;

    return `
        <div style="max-width:700px;margin:0 auto;">
            <div class="card fade-in">
                <h2 style="font-size:2.5rem;margin-bottom:2rem;text-align:center;">My Ride Status</h2>

                <div class="alert alert-${statusColor}" style="margin-bottom:2rem;">
                    <div style="width:32px;height:32px;color:var(--${statusColor});">${isConfirmed ? icons.check : icons.clock}</div>
                    <div>
                        <p style="font-weight:700;font-size:1.125rem;margin-bottom:.25rem;">
                            ${isConfirmed ? 'Ride Confirmed! 🎉' : 'Request Pending…'}
                        </p>
                        <p style="font-size:.875rem;color:var(--text-secondary);">
                            ${isConfirmed ? 'Your ride has been scheduled' : 'Routes will be optimised after Saturday 6 PM'}
                        </p>
                    </div>
                </div>

                ${isConfirmed ? `
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:1.5rem;">
                    <div style="background:linear-gradient(135deg,var(--primary-light),var(--primary));color:white;padding:2rem;border-radius:16px;text-align:center;">
                        <p style="font-size:.875rem;opacity:.9;margin-bottom:.5rem;">Pickup Time</p>
                        <p style="font-size:2.5rem;font-weight:700;">${myRequest.pickupTime}</p>
                    </div>
                    <div style="background:white;border:2px solid var(--border);padding:2rem;border-radius:16px;text-align:center;">
                        <p style="font-size:.875rem;color:var(--text-secondary);margin-bottom:.5rem;">Vehicle</p>
                        <p style="font-size:1.5rem;font-weight:700;">${myRequest.assignedVehicle}</p>
                    </div>
                </div>

                <div style="background:white;border:2px solid var(--border);padding:1.5rem;border-radius:16px;margin-bottom:1.5rem;">
                    <p style="font-size:.875rem;color:var(--text-secondary);margin-bottom:.75rem;">Pickup Location</p>
                    <p style="font-weight:600;font-size:1.125rem;margin-bottom:1rem;">${myRequest.pickupPoint || myRequest.address}</p>
                    <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(myRequest.pickupPoint || myRequest.address)}','_blank')" class="btn btn-primary" style="width:100%;">
                        <div style="width:20px;height:20px;">${icons.navigation}</div>
                        Open in Google Maps
                    </button>
                </div>

                ${myDriver ? `
                <div style="background:linear-gradient(135deg,var(--success),#236B4E);color:white;padding:1.5rem;border-radius:16px;">
                    <p style="font-size:.875rem;opacity:.9;margin-bottom:1rem;">Your Driver</p>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:1.5rem;font-weight:700;margin-bottom:.25rem;">${myDriver.name}</p>
                            <p style="opacity:.9;">${myDriver.phone}</p>
                        </div>
                        <a href="tel:${myDriver.phone}" class="btn" style="background:rgba(255,255,255,.2);color:white;padding:1rem;">
                            <div style="width:24px;height:24px;">${icons.phone}</div>
                        </a>
                    </div>
                </div>` : ''}` : ''}

                <div style="background:rgba(58,79,92,.06);border-radius:16px;padding:1.5rem;margin-top:1.5rem;margin-bottom:1.5rem;">
                    <p style="font-weight:600;margin-bottom:1rem;">Sunday Service Details</p>
                    <div style="display:grid;gap:.75rem;font-size:.875rem;">
                        <div style="display:flex;align-items:center;gap:.5rem;">
                            <div style="width:20px;height:20px;color:var(--primary);">${icons.clock}</div>
                            <span>Service starts at 9:30 AM</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:.5rem;">
                            <div style="width:20px;height:20px;color:var(--primary);">${icons.mapPin}</div>
                            <span>${myRequest.pickupPoint || myRequest.address}</span>
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                    <button onclick="navigateTo('request')" class="btn btn-secondary">Update Request</button>
                    <button onclick="navigateTo('chat')" class="btn btn-primary">
                        <div style="width:20px;height:20px;">${icons.chat}</div>Message Driver
                    </button>
                </div>
            </div>
        </div>`;
}

// ---- Confirmation ----
function renderConfirmation() {
    return `
        <div style="max-width:600px;margin:0 auto;">
            <div class="card fade-in" style="text-align:center;padding:3rem 2rem;">
                <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--success);">${icons.check}</div>
                <h2 style="font-size:2.5rem;margin-bottom:1rem;">Request Submitted!</h2>
                <p style="color:var(--text-secondary);font-size:1.125rem;margin-bottom:2rem;">You'll receive your pickup time after Saturday 6:00 PM</p>
                <div class="alert alert-success" style="margin-bottom:2rem;">
                    <div style="width:24px;height:24px;color:var(--success);">${icons.check}</div>
                    <div style="text-align:left;font-size:.875rem;">
                        <p style="font-weight:600;margin-bottom:.25rem;">✓ SMS confirmation sent</p>
                        ${state.userData?.email ? '<p style="font-weight:600;">✓ Email confirmation sent</p>' : ''}
                    </div>
                </div>
                <button onclick="navigateTo('studentDash')" class="btn btn-primary" style="padding:1.25rem 2.5rem;">
                    View My Status
                </button>
            </div>
        </div>`;
}

// ---- Live Tracking ----
function renderLiveTracking() {
    startLiveTracking('bus1');
    startLiveTracking('bus2');

    const b1 = state.liveTracking['bus1'] || { eta: 0, status: 'waiting', speed: 0, lastUpdate: Date.now() };
    const b2 = state.liveTracking['bus2'] || { eta: 0, status: 'waiting', speed: 0, lastUpdate: Date.now() };

    return `
        <div style="max-width:1200px;margin:0 auto;">
            <div class="header-gradient fade-in">
                <div style="position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <h2 style="font-size:2.5rem;margin-bottom:.5rem;color:white;">Live Tracking</h2>
                        <p style="color:rgba(255,255,255,.9);">Real-time bus locations and ETAs</p>
                    </div>
                    <div class="live-indicator" style="background:rgba(255,255,255,.2);color:white;">
                        <div class="live-dot" style="background:white;"></div>LIVE TRACKING
                    </div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:2rem;margin-bottom:2rem;">
                ${[['bus1','Bus 1',b1,'var(--primary)','primary','40%; left: 40%'],['bus2','Bus 2',b2,'var(--success)','success','50%; left: 60%']].map(([id,label,t,color,badge,markerPos]) => `
                    <div class="card fade-in">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                            <h3 style="font-size:1.5rem;display:flex;align-items:center;gap:.75rem;">
                                <div style="width:40px;height:40px;color:${color};">${icons.bus}</div>
                                ${label}
                            </h3>
                            <div class="badge badge-${badge}">${state.routes[id].length} students</div>
                        </div>
                        <div class="eta-countdown" style="margin-bottom:1.5rem;${id==='bus2' ? 'background:linear-gradient(135deg,var(--success),#236B4E);' : ''}">
                            <div style="font-size:1rem;opacity:.9;margin-bottom:.5rem;">Estimated Arrival</div>
                            <div class="time">${t.eta} min</div>
                            <div style="font-size:.875rem;opacity:.9;">${t.status === 'en_route' ? '🚌 En Route' : '⏸️ Waiting to Depart'}</div>
                        </div>
                        <div style="display:grid;gap:1rem;">
                            <div class="speed-indicator" style="${id==='bus2' ? 'background:linear-gradient(135deg,rgba(92,117,102,.1),rgba(92,117,102,.05));color:var(--success);' : ''}">
                                <div style="width:20px;height:20px;">${icons.lightning}</div>
                                ${t.speed} km/h
                            </div>
                            <div style="font-size:.875rem;color:var(--text-secondary);">Last updated: ${new Date(t.lastUpdate).toLocaleTimeString()}</div>
                        </div>
                        <div class="map-preview" style="margin-top:1.5rem;">
                            <div class="map-marker" style="top:${markerPos};background:${color};"></div>
                            <div style="position:absolute;bottom:1rem;left:1rem;right:1rem;background:white;padding:.75rem;border-radius:8px;font-size:.875rem;">
                                📍 Currently at Stop ${t.currentStop + 1} of ${state.routes[id].length || '—'}
                            </div>
                        </div>
                    </div>`).join('')}
            </div>

            <div class="card fade-in">
                <h3 style="font-size:1.5rem;margin-bottom:1.5rem;">Bus 1 Route Timeline</h3>
                ${state.routes.bus1.length ? `
                <div class="timeline">
                    ${state.routes.bus1.map((stop, idx) => `
                        <div class="timeline-item ${idx === b1.currentStop ? 'active' : ''}">
                            <div style="font-weight:600;margin-bottom:.25rem;">${stop.name}</div>
                            <div style="color:var(--text-secondary);font-size:.875rem;">${stop.pickupPoint || stop.address}</div>
                            <div style="margin-top:.5rem;"><span class="badge badge-primary">${stop.pickupTime}</span></div>
                        </div>`).join('')}
                </div>` : '<p style="text-align:center;color:var(--text-secondary);padding:2rem;">Routes not yet generated</p>'}
            </div>
        </div>`;
}

// ---- Chat ----
function renderChat() {
    const msgs = state.messages.slice(-20);
    return `
        <div style="max-width:800px;margin:0 auto;">
            <div class="card fade-in" style="min-height:600px;display:flex;flex-direction:column;">
                <div style="padding-bottom:1.5rem;border-bottom:2px solid var(--border);">
                    <h2 style="font-size:2rem;margin-bottom:.5rem;">Messages</h2>
                    <p style="color:var(--text-secondary);">Chat with drivers and coordinators</p>
                </div>
                <div style="flex:1;overflow-y:auto;padding:2rem 0;display:flex;flex-direction:column;gap:.5rem;">
                    ${!msgs.length ? `
                        <div style="text-align:center;padding:4rem 2rem;">
                            <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--text-secondary);opacity:.3;">${icons.chat}</div>
                            <p style="color:var(--text-secondary);">No messages yet. Start a conversation!</p>
                        </div>` :
                        msgs.map(m => `
                            <div class="chat-bubble ${m.from === 'You' ? 'sent' : 'received'}">
                                <div style="font-size:.75rem;opacity:.7;margin-bottom:.25rem;">${m.from}</div>
                                <div>${m.message}</div>
                                <div style="font-size:.75rem;opacity:.6;margin-top:.5rem;">${new Date(m.timestamp).toLocaleTimeString()}</div>
                            </div>`).join('')}
                </div>
                <div style="padding-top:1.5rem;border-top:2px solid var(--border);">
                    <form id="chatForm" style="display:flex;gap:1rem;">
                        <input type="text" name="message" required placeholder="Type your message…" class="input" style="flex:1;">
                        <button type="submit" class="btn btn-primary" style="padding:1rem;">
                            <div style="width:24px;height:24px;">${icons.send}</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>`;
}

// ---- Analytics ----
function renderAnalytics() {
    return `
        <div style="max-width:1200px;margin:0 auto;">
            <div class="header-gradient fade-in">
                <div style="position:relative;z-index:1;">
                    <h2 style="font-size:2.5rem;margin-bottom:.5rem;color:white;">Analytics Dashboard</h2>
                    <p style="color:rgba(255,255,255,.9);">Performance insights and statistics</p>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-bottom:2rem;">
                ${[
                    [icons.users,'primary',state.analytics.totalStudents,'Total Students'],
                    [icons.bus,'success',state.analytics.totalTrips,'Total Trips'],
                    [icons.trending,'accent',`${state.analytics.onTimeRate}%`,'On-Time Rate'],
                    [icons.star,'accent',state.analytics.satisfactionRate,'Satisfaction Score']
                ].map(([icon,color,val,label],i) => `
                    <div class="metric-card fade-in stagger-${i+1}">
                        <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--${color});">${icon}</div>
                        <div class="metric-value">${val}</div>
                        <div style="color:var(--text-secondary);font-weight:600;margin-top:.5rem;">${label}</div>
                        ${label === 'Satisfaction Score' ? `<div class="rating-stars" style="justify-content:center;margin-top:.5rem;">${Array(5).fill(icons.star).join('')}</div>` : ''}
                    </div>`).join('')}
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:2rem;">
                <div class="analytics-card fade-in">
                    <h3 style="font-size:1.5rem;margin-bottom:1.5rem;">Weekly Performance</h3>
                    <div style="display:grid;gap:1rem;">
                        ${[['Bus 1 Utilisation',87],['Bus 2 Utilisation',92],['Volunteer Drivers',78]].map(([label,pct]) => `
                            <div>
                                <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
                                    <span style="font-size:.875rem;font-weight:600;">${label}</span>
                                    <span style="font-size:.875rem;color:var(--primary);">${pct}%</span>
                                </div>
                                <div class="chart-bar"><div class="chart-fill" style="width:${pct}%;"></div></div>
                            </div>`).join('')}
                    </div>
                </div>

                <div class="analytics-card fade-in">
                    <h3 style="font-size:1.5rem;margin-bottom:1.5rem;">Recent Trips</h3>
                    <div style="display:grid;gap:1rem;">
                        ${!state.tripHistory.length ?
                            '<p style="text-align:center;color:var(--text-secondary);padding:2rem;">No trips recorded yet</p>' :
                            state.tripHistory.slice(-5).reverse().map(trip => `
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem;background:white;border-radius:12px;border:1px solid var(--border);">
                                    <div>
                                        <div style="font-weight:600;margin-bottom:.25rem;">${trip.vehicleId} — ${trip.studentsTransported} students</div>
                                        <div style="font-size:.875rem;color:var(--text-secondary);">${new Date(trip.date).toLocaleDateString('en-ZA')}</div>
                                    </div>
                                    <span class="badge badge-${trip.onTime ? 'success' : 'accent'}">${trip.onTime ? '✓ On Time' : '⏰ Delayed'}</span>
                                </div>`).join('')}
                    </div>
                </div>
            </div>
        </div>`;
}

// ---- Notifications log ----
function renderNotifications() {
    return `
        <div style="max-width:900px;margin:0 auto;">
            <div class="card fade-in">
                <h2 style="font-size:2.5rem;margin-bottom:2rem;">Notification Log</h2>
                ${!state.notifications.length ? `
                    <div style="text-align:center;padding:4rem 2rem;">
                        <div style="width:64px;height:64px;margin:0 auto 1rem;color:var(--text-secondary);opacity:.3;">${icons.bell}</div>
                        <p style="color:var(--text-secondary);">No notifications sent yet</p>
                    </div>` :
                    `<div style="display:grid;gap:1rem;">
                        ${state.notifications.slice().reverse().map(n => `
                            <div class="notification-item">
                                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:.75rem;">
                                    <div style="font-weight:600;">${n.recipient}</div>
                                    <div style="font-size:.75rem;color:var(--text-secondary);">${new Date(n.timestamp).toLocaleString('en-ZA')}</div>
                                </div>
                                <p style="color:var(--text-secondary);font-size:.875rem;line-height:1.6;margin-bottom:.75rem;white-space:pre-wrap;">${n.message}</p>
                                <span class="badge badge-${n.type==='sms' ? 'primary' : n.type==='email' ? 'success' : 'accent'}">${n.type.toUpperCase()}</span>
                            </div>`).join('')}
                    </div>`}
            </div>
        </div>`;
}

// ---- Driver View ----
function renderDriverView() {
    return `
        <div style="max-width:700px;margin:0 auto;">
            <div class="card fade-in" style="text-align:center;padding:4rem 2rem;">
                <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--text-secondary);opacity:.3;">${icons.car}</div>
                <h2 style="font-size:2rem;margin-bottom:1rem;">No Route Assigned Yet</h2>
                <p style="color:var(--text-secondary);font-size:1.125rem;">Check back after routes are optimised on Saturday evening</p>
            </div>
        </div>`;
}

// ---- QR Check-in ----
function renderQRCheckin() {
    const qrData = `CHURCH-RIDES-${Date.now()}`;
    return `
        <div style="max-width:600px;margin:0 auto;">
            <div class="card fade-in" style="text-align:center;">
                <div style="width:80px;height:80px;margin:0 auto 1.5rem;color:var(--primary);">${icons.qrcode}</div>
                <h2 style="font-size:2.5rem;margin-bottom:1rem;">QR Check-in</h2>
                <p style="color:var(--text-secondary);font-size:1.125rem;margin-bottom:3rem;">Scan to mark attendance</p>

                <div class="qr-code-container">
                    <p style="font-weight:600;margin-bottom:1rem;">Student Check-in Code</p>
                    <img src="${generateQRCode(qrData)}" alt="QR Code" />
                    <p style="font-size:.875rem;color:var(--text-secondary);margin-top:1rem;">Code: ${qrData.slice(-8)}</p>
                </div>

                <div style="margin-top:2rem;padding:1.5rem;background:rgba(58,79,92,.06);border-radius:16px;">
                    <h3 style="font-size:1.125rem;margin-bottom:1rem;">How to Use</h3>
                    <div style="text-align:left;display:grid;gap:.75rem;max-width:400px;margin:0 auto;">
                        ${['Students show this QR code when boarding','Driver scans with phone camera','Attendance automatically recorded'].map((text,i) => `
                            <div style="display:flex;gap:1rem;align-items:start;">
                                <div style="background:var(--primary);color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:.875rem;">${i+1}</div>
                                <p style="font-size:.875rem;">${text}</p>
                            </div>`).join('')}
                    </div>
                </div>

                <button onclick="alert('QR code saved to your device!')" class="btn btn-primary" style="width:100%;margin-top:2rem;padding:1.25rem;">
                    <div style="width:24px;height:24px;">${icons.check}</div>
                    Save QR Code
                </button>
            </div>
        </div>`;
}
