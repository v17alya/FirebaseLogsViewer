# Firebase Logs Viewer

A lightweight JavaScript web app to browse, filter, group, and export logs from Firebase Realtime Database.

## Features
- Filter by project, server, platform, date, userId, nickname, or message
- Group by date, server, or user
- Export filtered results to JSON/CSV
- Clean, minimal UI

## Data Path Schema
Logs live under nested paths:

```
/StreamersMegagames/{server}/{platform}/{date}/{userId}/{logIndex}/{field}
```

Example:
```
/StreamersMegagames/SHOLAHEYSERVER/Linux/2025-07-30/2ad48dcf-fa87-4a21-85ef-f9d583cba5c9/0/message
```

Fields:
- message → log text
- nickname → user nickname
- timestamp → time of the log

## Firebase Configuration
Add your Firebase config to the app:

```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.region.firebasedatabase.app",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Project Structure
```
FirebaseLogsViewer/
├── src/                    # JavaScript code only
│   └── js/
│       ├── app.js
│       └── firebase.js
└── public/                 # Static files
    ├── index.html
    ├── css/
    ├── config/
    ├── assets/
    ├── components/
    └── utils/
```

## Getting Started
1. Clone the repository
2. Add your Firebase config to `public/config/firebase-config.js`
3. Open `public/index.html` in a browser or run a local server
4. Start browsing and filtering logs

## Project Goals
- Simple but polished UI
- Connect to Firebase Realtime Database and display logs in a structured way
- Core functions: filtering, grouping, saving/exporting logs

## License
MIT
