// ============================================================
//  app.js — Application entry point: render loop & form wiring
// ============================================================

// ---- Main render function ----
function render() {
    const app = document.getElementById('app');

    const viewMap = {
        home:         renderHomeScreen,
        request:      renderStudentRequestForm,
        volunteer:    renderVolunteerForm,
        admin:        renderAdminDashboard,
        studentDash:  renderStudentDashboard,
        driverView:   renderDriverView,
        notifications: renderNotifications,
        confirmation: renderConfirmation,
        liveTracking: renderLiveTracking,
        chat:         renderChat,
        analytics:    renderAnalytics,
        qrCheckin:    renderQRCheckin
    };

    const renderFn = viewMap[state.currentView] || renderHomeScreen;
    let content = renderFn();

    // Back button (shown on all views except home)
    if (state.currentView !== 'home') {
        content += `
            <button onclick="navigateTo('home')" class="back-btn" title="Back to home">
                <div style="width:24px;height:24px;color:var(--primary);">${icons.arrowLeft}</div>
            </button>`;
    }

    app.innerHTML = content;

    // Bind forms after render (defer to next tick to allow DOM to settle)
    setTimeout(setupFormHandlers, 0);
}

// ---- Form handlers ----
function setupFormHandlers() {
    // Student ride request
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = e.target;
            const formData = {
                name:             fd.name.value,
                phone:            fd.phone.value,
                email:            fd.email.value,
                address:          fd.address.value,
                pickupPoint:      fd.pickupPoint.value,
                emergencyContact: fd.emergencyContact.value,
                specialNeeds:     fd.specialNeeds.value
            };
            await submitRideRequest(formData);
            navigateTo('confirmation');
        });
    }

    // Volunteer sign-up
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = e.target;
            const formData = {
                name:    fd.name.value,
                phone:   fd.phone.value,
                email:   fd.email.value,
                address: fd.address.value,
                seats:   fd.seats.value
            };
            await submitVolunteerAvailability(formData);
            alert('✅ Thank you for volunteering! You will be assigned nearby students and receive route details via SMS on Saturday evening.');
            navigateTo('home');
        });
    }

    // Chat
    const chatForm = document.getElementById('chatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = e.target.message.value.trim();
            if (!message) return;
            sendMessage('Admin', 'You', message);
            e.target.message.value = '';
            render();
        });
    }
}

// ---- Initialise ----
async function init() {
    await loadData();
    fetchWeather();
    render();

    // Service Worker registration (for offline support — see README)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Silently fail if sw.js not present during development
        });
    }
}

// Boot
init();
