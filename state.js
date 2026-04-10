// ============================================================
//  state.js — Centralised application state & persistence
// ============================================================

const state = {
    currentView: 'home',
    userRole: null,
    userData: null,
    rideRequests: [],
    volunteers: [],
    routes: { bus1: [], bus2: [], volunteers: {} },
    notifications: [],
    attendance: {},
    weather: null,
    liveTracking: {},
    messages: [],
    tripHistory: [],
    analytics: {
        totalTrips: 0,
        totalStudents: 0,
        onTimeRate: 95,
        satisfactionRate: 4.8
    }
};

// ---- Persistence (uses claude.ai window.storage if available, else localStorage) ----
const STORAGE_KEY = 'church-rides-data';

async function loadData() {
    try {
        let raw = null;

        if (typeof window.storage !== 'undefined') {
            const stored = await window.storage.get(STORAGE_KEY, false);
            if (stored) raw = stored.value;
        } else {
            raw = localStorage.getItem(STORAGE_KEY);
        }

        if (raw) {
            const data = JSON.parse(raw);
            state.rideRequests = data.requests      || [];
            state.volunteers   = data.volunteers    || [];
            state.routes       = data.routes        || { bus1: [], bus2: [], volunteers: {} };
            state.attendance   = data.attendance    || {};
            state.notifications = data.notifications || [];
            state.messages     = data.messages      || [];
            state.tripHistory  = data.tripHistory   || [];
            state.analytics    = data.analytics     || state.analytics;
        }
    } catch (err) {
        console.log('No stored data yet — starting fresh.');
    }
}

async function saveData() {
    const payload = JSON.stringify({
        requests:      state.rideRequests,
        volunteers:    state.volunteers,
        routes:        state.routes,
        attendance:    state.attendance,
        notifications: state.notifications,
        messages:      state.messages,
        tripHistory:   state.tripHistory,
        analytics:     state.analytics
    });

    try {
        if (typeof window.storage !== 'undefined') {
            await window.storage.set(STORAGE_KEY, payload, false);
        } else {
            localStorage.setItem(STORAGE_KEY, payload);
        }
    } catch (err) {
        console.error('Failed to persist data:', err);
    }
}

async function clearAllData() {
    if (!confirm('⚠️ This will permanently delete all ride requests, routes, and history. Are you sure?')) return;

    state.rideRequests  = [];
    state.volunteers    = [];
    state.routes        = { bus1: [], bus2: [], volunteers: {} };
    state.attendance    = {};
    state.notifications = [];
    state.messages      = [];
    state.tripHistory   = [];
    state.analytics     = { totalTrips: 0, totalStudents: 0, onTimeRate: 95, satisfactionRate: 4.8 };

    await saveData();
    render();
    alert('✅ All data cleared successfully.');
}
