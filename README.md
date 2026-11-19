# Geelume ✦

**Glow in your own rhythm.**
Geelume is a mobile-first web app for managing your daily skincare routine and tracking how your skin changes over time. It can be installed on a phone as a PWA.

🔗 **Live demo:** 

## Screenshots

## Features

- **Account** – sign up and log in; the home greeting uses your name.
- **Morning and evening routines** – check off each step, see live progress, and add or delete your own steps.
- **Daily streak** – a day counts only when both the morning and evening routines are complete.
- **Skin Journal** – log how your skin feels each day, see a weekly chart, manage tracked concerns, and keep a photo log.
- **Skin Health Score** – calculated from your last 7 skin logs.
- **Product Cabinet** – search, filter by category, and add or remove skincare products.
- **Profile** – stats overview, edit display name, log out, and reset data.
- **Installable and offline-ready** – works as a PWA with a service worker.

## Tech Stack

- React 18 and React Router
- Vite
- Plain CSS (CSS variables, responsive, mobile-first)
- localStorage for data persistence (no backend)
- PWA: web manifest and service worker

## Project Structure

```
src/
├── components/   reusable UI (Button, Card, Chip, ProductCard, BottomNav)
├── pages/        Splash, SignUp, Home, Routine, Tracker, Products, Profile
├── hooks/        useStore (global state + localStorage)
├── lib/          stats helpers (progress, streak, skin score)
├── data/         seed data and constants
└── styles/       global.css
public/           manifest, service worker, icons
```

## Notes

- All products and brands in the app are fictional, created for demo purposes.
- Accounts and passwords are stored in the browser's localStorage as a simulation. This is **not** real authentication, so do not use real passwords.
- Data lives on a single device; there is no cross-device sync yet.

## Roadmap

- Real authentication and cloud database (Supabase or Firebase)
- Reminder notifications for morning and evening routines
- Link products from the cabinet directly to routine steps
- Skin progress insights over longer periods

## Design

UI designed in Figma by the author; implemented as a functional web app.

## License

MIT
