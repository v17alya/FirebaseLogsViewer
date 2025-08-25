# Firebase Logs Viewer

A lightweight JavaScript web app to browse, filter, group, and export logs from Firebase Realtime Database.

## Features

- 🔍 **Advanced Filtering**: Filter logs by server, platform, date, user ID, nickname, and message content
- 📊 **Grouping**: Group logs by date, server, platform, or nickname to identify patterns
- 📤 **Export Options**: Export logs in JSON, CSV, or TXT formats
- 📱 **Responsive Design**: Modern, clean UI that works on desktop and mobile
- ⚡ **Real-time**: Direct connection to Firebase Realtime Database
- 🎯 **Sorting & Pagination**: Sort logs by any field with pagination support

## Data Structure

Logs are stored in Firebase under the following nested path structure:
```
/StreamersMegagames/{server}/{platform}/{date}/{userId}/{logIndex}/{field}
```

### Example Path:
```
/StreamersMegagames/SHOLAHEYSERVER/Linux/2025-07-30/2ad48dcf-fa87-4a21-85ef-f9d583cba5c9/0/message
```

### Log Fields:
- **message** → log text content
- **nickname** → user nickname
- **timestamp** → time of the log entry

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd FirebaseLogsViewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the CSS**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

This will watch for CSS changes and rebuild automatically.

## Usage

### Filtering Logs

1. **Server Filter**: Select a specific server from the dropdown
2. **Platform Filter**: Choose platform (Linux, Windows, etc.)
3. **Date Filter**: Select a specific date
4. **User ID Filter**: Filter by specific user ID
5. **Nickname Filter**: Search by user nickname (text search)
6. **Message Filter**: Search within log messages (text search)

### Viewing Logs

- **Table View**: Logs are displayed in a sortable table
- **Sorting**: Click column headers or use the sort dropdown
- **Pagination**: Navigate through large datasets
- **Details**: Click "Details" to view full log information
- **Full Message**: Click "..." to view complete message content

### Grouping Logs

1. Select a grouping option (Date, Server, Platform, or Nickname)
2. Click "Apply Grouping"
3. View grouped results with statistics
4. Export individual groups if needed

### Exporting Logs

1. **Set filename** (optional, defaults to "logs")
2. **Choose format**:
   - **JSON**: Structured data format
   - **CSV**: Spreadsheet-compatible format
   - **TXT**: Plain text format
3. **Click export button**

Files are automatically downloaded with timestamp suffix.

## Configuration

### Firebase Configuration

The app uses the following Firebase configuration (already set up):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1T_bGrmu7reGcsW3V70hAznbE3L_Uo8o",
  authDomain: "logexporter-42a5f.firebaseapp.com",
  databaseURL: "https://logexporter-42a5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logexporter-42a5f",
  storageBucket: "logexporter-42a5f.firebasestorage.app",
  messagingSenderId: "334718041282",
  appId: "1:334718041282:web:857f398951dd2eddfd8f5b",
  measurementId: "G-6LGNFPT0BK"
};
```

### Custom Configuration

To use with your own Firebase project:

1. Update `src/config/firebase-config.js`
2. Modify the `DATABASE_PATH` constant if needed
3. Ensure your Firebase Realtime Database rules allow read access

## Project Structure

```
FirebaseLogsViewer/
├── index.html                 # Main HTML file
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── src/
│   ├── css/
│   │   └── input.css         # Tailwind CSS input
│   ├── config/
│   │   └── firebase-config.js # Firebase configuration
│   ├── components/
│   │   ├── FilterPanel.js    # Filter component
│   │   ├── LogsTable.js      # Table component
│   │   └── ExportPanel.js    # Export component
│   ├── js/
│   │   ├── app.js           # Main application logic
│   │   └── firebase.js      # Firebase service
│   └── utils/
│       └── export-utils.js  # Export utilities
└── public/
    └── assets/
        └── styles.css       # Compiled CSS
```

## Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Database**: Firebase Realtime Database
- **Build Tool**: Tailwind CLI
- **Development Server**: http-server

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **"Failed to initialize application"**
   - Check internet connection
   - Verify Firebase configuration
   - Check browser console for errors

2. **"No logs found"**
   - Verify database path structure
   - Check Firebase database rules
   - Ensure data exists in the specified path

3. **Export not working**
   - Check browser download settings
   - Ensure popup blockers are disabled
   - Verify file permissions

### Debug Mode

Open browser developer tools (F12) to view:
- Console logs for debugging
- Network requests to Firebase
- Application errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify Firebase configuration
4. Create an issue with detailed information
