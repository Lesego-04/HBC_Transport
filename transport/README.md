# Heritage Baptist Church — Transportation Ministry

A lightweight, browser-based app for coordinating Sunday morning student transport.  
No backend required to run locally — all data is persisted in the browser.

---

## Project Structure

```
transport-ministry/
├── index.html          ← Entry point (loads all scripts in order)
├── css/
│   └── styles.css      ← All styles: design tokens, components, animations
├── js/
│   ├── icons.js        ← Inline SVG icon library (no external dependency)
│   ├── state.js        ← App state object + load/save persistence helpers
│   ├── services.js     ← Business logic: routing, notifications, QR, voice, analytics
│   ├── views.js        ← All render functions (return HTML strings)
│   └── app.js          ← Entry point: render loop, form handlers, init()
└── README.md
```

---

## How to Run (Development)

Just open `index.html` in a browser — no build step needed.

For a slightly better DX (live reload + proper fetch/SW support):

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Features

| Feature | Status | Notes |
|---|---|---|
| Student ride requests | ✅ Working | Form → persisted state |
| Volunteer sign-up | ✅ Working | Assigns nearby students |
| Nearest-neighbour route optimisation | ✅ Working | Mock distance heuristic |
| Google Maps route links | ✅ Working | Opens Maps with waypoints |
| SMS / Email notifications | ⚠️ Simulated | Logs to console + state |
| Live bus tracking | ⚠️ Simulated | Countdown timer (1 min intervals) |
| QR Check-in | ⚠️ Placeholder | SVG placeholder QR code |
| Chat / messaging | ✅ Working | In-memory, persisted |
| Analytics dashboard | ✅ Working | Reads from trip history |
| CSV export | ✅ Working | Admin panel → Export CSV button |
| Voice commands | ✅ Working | Web Speech API (Chrome) |
| Data persistence | ✅ Working | localStorage fallback + window.storage |
| Dark mode | ❌ Not yet | See "Next Features" below |
| Offline / PWA | ❌ Not yet | sw.js stub registered, not implemented |

---

## What's Needed to Make It Work Perfectly

### 1. Real SMS — Twilio (or Africa's Talking for ZA)

The `sendNotification()` function in `services.js` currently logs to console.  
To send real SMS, you need a small backend (Node/Express or a serverless function):

```js
// Example: POST /api/notify
// Body: { to, message, type }
// Uses Twilio or Africa's Talking SDK server-side
```

**Why server-side?** API keys must never be exposed in browser JS.

Recommended for South Africa: **Africa's Talking** (`africastalking.com`) — cheaper rates than Twilio for ZA numbers.

### 2. Real GPS Tracking — Google Maps Platform

Current tracking is a simulated countdown.  
For real tracking you need:

- **Google Maps JavaScript API** + Maps SDK
  - Replace `.map-preview` divs with actual `google.maps.Map` instances
  - Drivers share location via `navigator.geolocation` on their phone
  - Update a shared Firestore/Realtime DB document with lat/lng every 30s
  - Students poll that document to render the marker

Estimated cost: ~$0 under Maps free tier for a small church use case.

### 3. Real Distance Matrix — Google Distance Matrix API

`calculateDistance()` in `services.js` uses a string-hash heuristic.  
Replace it with real road distances:

```js
// GET https://maps.googleapis.com/maps/api/distancematrix/json
//   ?origins=...&destinations=...&key=YOUR_KEY
```

This will make route optimisation significantly more accurate.

### 4. QR Code Library

Replace `generateQRCode()` in `services.js` with a real library:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

```js
new QRCode(element, { text: qrData, width: 200, height: 200 });
```

Then pair with a QR scanner on the driver's phone (use `html5-qrcode` library).

### 5. Authentication

Currently there is no login — anyone who opens the app can access Admin.  
Options (simplest to most robust):

- **PIN-based admin lock** — store a hashed PIN in localStorage
- **Google Sign-In** (Firebase Auth) — free, very fast to set up
- **Supabase Auth** — open-source Firebase alternative

### 6. Backend / Database (for multi-device sync)

Data currently lives in one browser only.  
For the admin to see requests submitted by students on different devices, you need a shared store:

| Option | Cost | Effort |
|---|---|---|
| **Firebase Firestore** | Free tier generous | Low |
| **Supabase** | Free tier generous | Low-Medium |
| **PocketBase** | Self-hosted, free | Medium |

Replace `loadData()` / `saveData()` in `state.js` with Firestore listeners.

---

## Suggested Next Features

- **Dark mode** — CSS `prefers-color-scheme` media query + a toggle button
- **Recurring weekly reset** — auto-clear requests every Sunday night
- **Push notifications** — Web Push API so students get alerts without opening the app
- **Driver mobile app** — Progressive Web App (PWA) install prompt (`manifest.json` + `sw.js`)
- **Accessibility** — Add `aria-label` attributes and keyboard navigation to all interactive cards
- **Multi-language** — Afrikaans / Zulu translation strings
- **Parent portal** — Separate view for parents to track their child's ride
- **Waitlist** — If buses are full, add students to a waitlist and notify them if space opens
- **Route history** — View past Sunday routes with actual vs planned times
- **Volunteer ratings** — Students can rate their ride experience (feeds satisfaction score)
- **WhatsApp integration** — Use WhatsApp Business API (via Africa's Talking) instead of SMS

---

## Environment Variables (when backend is added)

Never commit secrets to git. Use a `.env` file:

```env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
GOOGLE_MAPS_API_KEY=...
FIREBASE_API_KEY=...
```

Add `.env` to `.gitignore`.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/whatsapp-notifications`
3. Commit your changes
4. Open a Pull Request

---

## Licence

MIT — free to use, modify, and distribute.
