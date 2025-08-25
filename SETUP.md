# Firebase Logs Viewer - Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build CSS
```bash
npm run build
```

### 3. Start the Application

#### Option A: Real Firebase Data (Port 3000)
```bash
npm start
```
Then open: http://localhost:3000

#### Option B: Mock Data Demo (Port 3001)
```bash
npm run start:mock
```
Then open: http://localhost:3001

## Development

### Watch CSS Changes
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Features Overview

### 🔍 Filtering
- **Server**: Filter by specific server
- **Platform**: Filter by OS platform (Linux, Windows, macOS)
- **Date**: Filter by specific date
- **User ID**: Filter by user identifier
- **Nickname**: Text search in user nicknames
- **Message**: Text search in log messages

### 📊 Grouping
- Group logs by date, server, platform, or nickname
- View statistics for each group
- Export individual groups

### 📤 Export Options
- **JSON**: Structured data format
- **CSV**: Spreadsheet-compatible format
- **TXT**: Plain text format

### 🎯 Table Features
- Sortable columns
- Pagination (25, 50, 100, 200 items per page)
- Responsive design
- Modal details view

## File Structure

```
FirebaseLogsViewer/
├── index.html              # Main app (Firebase data)
├── index-mock.html         # Demo app (mock data)
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
├── src/
│   ├── css/input.css       # Tailwind source
│   ├── config/
│   │   └── firebase-config.js  # Firebase settings
│   ├── components/
│   │   ├── FilterPanel.js      # Filter UI component
│   │   ├── LogsTable.js        # Table UI component
│   │   └── ExportPanel.js      # Export UI component
│   ├── js/
│   │   ├── app.js             # Main app logic
│   │   ├── app-mock.js        # Mock app logic
│   │   └── firebase.js        # Firebase service
│   └── utils/
│       ├── export-utils.js    # Export functions
│       └── mock-data.js       # Mock data generator
└── public/
    └── assets/
        └── styles.css         # Compiled CSS
```

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Troubleshooting

### Common Issues

1. **"Failed to initialize application"**
   - Check internet connection
   - Verify Firebase configuration in `src/config/firebase-config.js`
   - Check browser console (F12) for errors

2. **"No logs found"**
   - Verify database path structure matches `/StreamersMegagames/{server}/{platform}/{date}/{userId}/{logIndex}/{field}`
   - Check Firebase database rules allow read access
   - Ensure data exists in the specified path

3. **CSS not loading**
   - Run `npm run build` to compile CSS
   - Check that `public/assets/styles.css` exists

4. **Export not working**
   - Check browser download settings
   - Disable popup blockers
   - Verify file permissions

### Debug Mode

1. Open browser developer tools (F12)
2. Check Console tab for errors
3. Check Network tab for Firebase requests
4. Look for any JavaScript errors

## Customization

### Change Firebase Configuration

Edit `src/config/firebase-config.js`:
```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.region.firebasedatabase.app",
  // ... other config
};
```

### Change Database Path

Edit `src/config/firebase-config.js`:
```javascript
export const DATABASE_PATH = 'YourCustomPath';
```

### Modify UI Styling

Edit `src/css/input.css` and run `npm run build`:
```css
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg;
  }
}
```

## Performance Tips

1. **Use filters** to reduce data load
2. **Pagination** helps with large datasets
3. **Mock data** for testing without Firebase
4. **Browser caching** improves load times

## Security Notes

- Firebase API keys are safe to expose in client-side code
- Database rules should restrict read access as needed
- Consider implementing authentication for production use

## Support

For issues:
1. Check troubleshooting section
2. Review browser console errors
3. Verify Firebase configuration
4. Test with mock data first
