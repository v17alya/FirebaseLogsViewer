# Firebase Logs Viewer - Setup Guide

This guide will help you set up the Firebase Logs Viewer application to work with your Firebase Realtime Database using the `firebase_logs.module.js` schema.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase project with Realtime Database enabled
- Logs stored using the `firebase_logs.module.js` schema

## Firebase Project Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name
4. Follow the setup wizard

### 2. Enable Realtime Database

1. In your Firebase project, go to "Realtime Database"
2. Click "Create database"
3. Choose a location (preferably close to your users)
4. Start in test mode (you can secure it later)

### 3. Database Structure

Your Firebase Realtime Database should have the following structure:

```json
{
  "logs": {
    "entries": {
      "Mega|SHOLAHEYSERVER|Linux|2025-01-15|user123|0": {
        "project": "Mega",
        "server": "SHOLAHEYSERVER",
        "platform": "Linux",
        "date": "2025-01-15",
        "userId": "user123",
        "seq": 0,
        "nickname": "Player1",
        "message": "User logged in",
        "ts": 1705276800000
      }
    },
    "indexes": {
      "byProjectDate": {
        "Mega": {
          "2025-01-15": {
            "Mega|SHOLAHEYSERVER|Linux|2025-01-15|user123|0": true
          }
        }
      },
      "byUserDate": {
        "user123": {
          "2025-01-15": {
            "Mega|SHOLAHEYSERVER|Linux|2025-01-15|user123|0": true
          }
        }
      },
      "byProjSrvPlatDate": {
        "Mega": {
          "SHOLAHEYSERVER": {
            "Linux": {
              "2025-01-15": {
                "Mega|SHOLAHEYSERVER|Linux|2025-01-15|user123|0": true
              }
            }
          }
        }
      }
    }
  }
}
```

### 4. Security Rules

Set up Firebase security rules to allow read access to logs:

```json
{
  "rules": {
    "logs": {
      ".read": "auth != null || true",  // Allow read access (adjust as needed)
      ".write": "auth != null"          // Require auth for writes
    }
  }
}
```

## Application Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd FirebaseLogsViewer
npm install
```

### 2. Configure Firebase

1. Get your Firebase configuration:
   - Go to Firebase Console → Project Settings → General
   - Scroll down to "Your apps"
   - Click the web app icon (</>) to add a web app
   - Copy the configuration object

2. Update `src/config/firebase-config.js`:

```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.region.firebasedatabase.app",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Update the default project name if different from "Mega"
export const DEFAULT_PROJECT = 'YourProjectName';
```

### 3. Test Configuration

1. Start the development server:
```bash
npm run dev
```

2. Open `http://localhost:5173` in your browser
3. Check the browser console for any connection errors
4. Try loading some logs to verify the setup

## Data Migration (if needed)

If you have logs in the old format, you'll need to migrate them to the new schema.

### Old Format
```
/StreamersMegagames/{server}/{platform}/{date}/{userId}/{logIndex}/{field}
```

### New Format
```
/logs/entries/{logId}
/logs/indexes/byProjectDate/{project}/{date}/{logId}
/logs/indexes/byUserDate/{userId}/{date}/{logId}
// ... other indexes
```

### Migration Script Example

```javascript
// Example migration script (run in Firebase Functions or Node.js)
const admin = require('firebase-admin');
const db = admin.database();

async function migrateLogs() {
  const oldLogsRef = db.ref('StreamersMegagames');
  const newLogsRef = db.ref('logs');
  
  const snapshot = await oldLogsRef.once('value');
  const oldLogs = snapshot.val();
  
  const updates = {};
  
  // Process old logs and create new structure
  // This is a simplified example - implement based on your data
  Object.keys(oldLogs).forEach(server => {
    Object.keys(oldLogs[server]).forEach(platform => {
      Object.keys(oldLogs[server][platform]).forEach(date => {
        Object.keys(oldLogs[server][platform][date]).forEach(userId => {
          Object.keys(oldLogs[server][platform][date][userId]).forEach(logIndex => {
            const logData = oldLogs[server][platform][date][userId][logIndex];
            const logId = `Mega|${server}|${platform}|${date}|${userId}|${logIndex}`;
            
            // Create entry
            updates[`entries/${logId}`] = {
              project: 'Mega',
              server,
              platform,
              date,
              userId,
              seq: parseInt(logIndex),
              nickname: logData.nickname || 'Unknown',
              message: logData.message || '',
              ts: logData.timestamp || Date.now()
            };
            
            // Create indexes
            updates[`indexes/byProjectDate/Mega/${date}/${logId}`] = true;
            updates[`indexes/byUserDate/${userId}/${date}/${logId}`] = true;
            updates[`indexes/byProjSrvPlatDate/Mega/${server}/${platform}/${date}/${logId}`] = true;
          });
        });
      });
    });
  });
  
  await newLogsRef.update(updates);
  console.log('Migration completed');
}
```

## Troubleshooting

### Common Issues

1. **"Failed to initialize application"**
   - Check your Firebase configuration
   - Verify the database URL is correct
   - Ensure your project has Realtime Database enabled

2. **"No logs found"**
   - Verify your database structure matches the expected schema
   - Check that logs exist in the `/logs/entries/` path
   - Ensure indexes are properly created

3. **"Permission denied"**
   - Check your Firebase security rules
   - Verify your API key is correct
   - Ensure your project allows read access

4. **Filter options not loading**
   - Check that indexes exist in the `/logs/indexes/` path
   - Verify the project name matches your configuration
   - Check browser console for specific error messages

### Debug Mode

Enable detailed logging by opening the browser console. The application will log:
- Firebase connection attempts
- Database queries and responses
- Filter operations
- Error conditions with stack traces

### Testing with Sample Data

If you don't have logs yet, you can create sample data:

```javascript
// Run this in Firebase Console or via admin SDK
const sampleLogs = {
  "logs": {
    "entries": {
      "Mega|TestServer|Linux|2025-01-15|testuser|0": {
        "project": "Mega",
        "server": "TestServer",
        "platform": "Linux",
        "date": "2025-01-15",
        "userId": "testuser",
        "seq": 0,
        "nickname": "TestUser",
        "message": "Sample log message",
        "ts": 1705276800000
      }
    },
    "indexes": {
      "byProjectDate": {
        "Mega": {
          "2025-01-15": {
            "Mega|TestServer|Linux|2025-01-15|testuser|0": true
          }
        }
      }
    }
  }
};
```

## Production Deployment

### 1. Build for Production

```bash
npm run build
```

### 2. Deploy Options

- **Firebase Hosting**: Deploy to Firebase Hosting
- **Static Hosting**: Deploy to any static hosting service
- **Local Server**: Serve the `dist/` folder with any web server

### 3. Environment Configuration

For production, consider:
- Using environment variables for Firebase config
- Setting up proper Firebase security rules
- Enabling authentication if needed
- Setting up monitoring and logging

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the browser console for errors
3. Verify your Firebase configuration
4. Open an issue with detailed information about your setup
