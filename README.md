# Firebase Logs Viewer

A lightweight JavaScript application for viewing and analyzing logs stored in Firebase Realtime Database using the `firebase_logs.module.js` schema.

**🌐 Live Demo: [https://v17alya.github.io/FirebaseLogsViewer/](https://v17alya.github.io/FirebaseLogsViewer/)**

## Features

- **Real-time Log Viewing**: Connect to Firebase RTDB and display logs in a structured table
- **Advanced Filtering**: Filter logs by server, platform, date, user ID, nickname, and message content
- **Smart Error Grouping**: Automatically group similar errors (e.g., `InvalidOperationException` with different parameters) together
  - Expandable groups showing count of similar messages
  - Visual indicators and collapsible UI for better organization
- **User-Error Grouping**: Group logs by user with nested error grouping
  - Two-level hierarchy: users → similar errors
  - Count badges showing number of logs in each group
- **Progressive Loading**: Load filter options dynamically based on available data
- **Sorting & Pagination**: Sort logs by any field and navigate through large datasets
- **Export Functionality**: Export filtered logs to JSON, CSV, or TXT formats
- **Responsive Design**: Clean, modern UI that works on desktop and mobile devices
- **Data Deletion (with confirmation)**: Delete any Firebase RTDB path via a two-step dialog

## Data Structure

This application works with logs stored using the `firebase_logs.module.js` schema:

### Database Structure
```
/logs/
  /entries/
    {logId}: {
      project: string,
      server: string,
      platform: string,
      date: string (YYYY-MM-DD),
      userId: string,
      seq: number,
      nickname: string,
      message: string,
      ts: number (timestamp)
    }
  /indexes/
    /byProjectDate/{project}/{date}/{logId}: true
    /byUserDate/{userId}/{date}/{logId}: true
    /byProjSrvPlatDate/{project}/{server}/{platform}/{date}/{logId}: true
    /byProjectUserDate/{project}/{userId}/{date}/{logId}: true
    /byProjectPlatformDate/{project}/{platform}/{date}/{logId}: true
    /byProjectServerDate/{project}/{server}/{date}/{logId}: true
    /byProject/{project}/{timestamp}_{logId}: true
    /byProjectServer/{project}/{server}/{timestamp}_{logId}: true
    /byProjectPlatform/{project}/{platform}/{timestamp}_{logId}: true
    /byProjectServerPlatform/{project}/{server}/{platform}/{timestamp}_{logId}: true
    /byProjectPlatformTs/{project}/{platform}/{timestamp}_{logId}: true
    /byUser/{userId}/{timestamp}_{logId}: true
```

### Log Entry Fields
- **project**: Logical project name (e.g., "Mega")
- **server**: Server identifier
- **platform**: Platform name (e.g., "Linux", "Windows")
- **date**: Date in YYYY-MM-DD format
- **userId**: Unique user identifier
- **seq**: Per-session sequence number
- **nickname**: User nickname
- **message**: Log message content
- **ts**: Unix timestamp (milliseconds)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FirebaseLogsViewer
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Update `src/config/firebase-config.js` with your Firebase project configuration
   - Ensure your Firebase RTDB has the correct structure as shown above

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Configuration

### Firebase Configuration

Update `src/config/firebase-config.js` with your Firebase project details:

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
```

### Default Project

The application uses "Mega" as the default project name. You can change this in `src/config/firebase-config.js`:

```javascript
export const DEFAULT_PROJECT = 'YourProjectName';
```

## Usage

### Filtering Logs

1. **Server Filter**: Select a specific server to view logs from
2. **Platform Filter**: Filter by platform (e.g., Linux, Windows)
3. **Date Filter**: Select a specific date to view logs from
4. **User ID Filter**: Search for logs from a specific user
5. **Nickname Filter**: Filter by user nickname
6. **Message Filter**: Search for specific text in log messages

### Viewing Logs

- Logs are displayed in a sortable table
- Click column headers to sort by different fields
- Use pagination controls to navigate through large datasets
- Click "Details" to view full log information in a modal
- Click "..." next to long messages to view the full text

### Grouping Logs

The application offers intelligent grouping options to help organize and analyze large volumes of logs:

#### Similar Errors Grouping
Select **"Group by: Similar Errors"** to automatically group logs with similar error messages:
- Errors like `InvalidOperationException: position: 578, reading: 18` and `InvalidOperationException: position: 715, reading: 36` are grouped together
- Each group shows:
  - A sample message from the group
  - A count badge indicating the number of similar messages
  - An expandable arrow to show/hide all messages in the group
- Click on any group header to expand and see all individual log entries

#### User with Errors Grouping
Select **"Group by: User (with errors)"** to organize logs by user with nested error grouping:
- Creates a two-level hierarchy:
  1. **User level**: Groups logs by user ID/nickname
  2. **Error level**: Within each user, groups similar errors together
- Each user group displays:
  - User nickname and ID
  - Total count of all logs for that user
  - Expandable arrow to show/hide user's errors
- Each error subgroup shows:
  - Sample error message
  - Count of similar errors for that specific user
  - Expandable arrow to view all occurrences

This makes it easy to:
- Identify patterns in error messages
- Track which errors affect which users
- Quickly analyze error distribution across your user base

### Exporting Logs

1. Apply your desired filters
2. Click the "Export" button in the header
3. Enter a filename (optional)
4. **If using grouping** (Similar Errors or User grouping):
   - Check **"Export groups only (summary)"** to export group statistics instead of full logs
   - Unchecked: exports all individual log entries
   - Checked: exports only group patterns, counts, and sample messages
5. Choose your preferred format:
   - **JSON**: Structured data format
   - **CSV**: Spreadsheet-compatible format
   - **TXT**: Plain text format with formatted log entries

#### Group Export Example

When exporting groups, you get:
- **JSON**: Array of objects with pattern, count, and sample message
- **CSV**: Table with columns: Error Pattern, Count, Sample Message (or User/Group for nested)
- **TXT**: Formatted text with counts and patterns clearly visible

### Deleting Data (use with caution)

1. Click the "Delete" button in the header.
2. Enter the Firebase Realtime Database path to delete (relative to the root, no leading slash). Examples:
   - `logs/entries/LOG_ID`
   - `logs/indexes/byProject/Mega`
   - Any subtree under your database
3. Click "Next" and review the path in the confirmation dialog.
4. Click "Delete" to confirm. This action is irreversible.

Notes:
- Paths must be absolute within the database root but must not start with `/`.
- Ensure you have appropriate Firebase security rules and permissions to perform deletions.

## API Reference

### FirebaseService

Main service for interacting with Firebase RTDB.

#### Methods

- `fetchLogs(filters)`: Fetch logs with optional filtering
- `fetchServers()`: Get available server names
- `fetchPlatforms(server)`: Get platforms for a specific server
- `fetchDates(server, platform)`: Get available dates for server/platform combination
- `fetchUserIds(server, platform, date)`: Get user IDs for specific criteria
- `deletePath(absolutePath)`: Delete a node/subtree by RTDB path (no leading slash)

### FilterPanel

Component for managing log filters.

#### Methods

- `getFilters()`: Get current filter values
- `loadInitialData()`: Load initial filter options
- `updateOptions(options)`: Update available filter options

### LogsTable

Component for displaying logs in a table format.

#### Methods

- `updateLogs(logs)`: Update the table with new log data
- `getLogsCount()`: Get the current number of displayed logs

### ExportPanel

Component for exporting logs to different formats.

#### Methods

- `updateLogs(logs)`: Update the export panel with current logs

### DeletePanel

Component for deleting data by a specified path with confirmation.

#### Methods

- `onDone(callback)`: Register a callback to run after successful deletion (used to refresh UI)

## Development

### Project Structure

```
src/
├── components/          # UI components
│   ├── FilterPanel.js   # Filter management
│   ├── LogsTable.js     # Log display table
│   ├── ExportPanel.js   # Export functionality
│   └── DeletePanel.js   # Two-step delete (input + confirmation)
├── config/              # Configuration files
│   └── firebase-config.js
├── js/                  # Core application logic
│   ├── app.js           # Main application
│   └── firebase.js      # Firebase service
└── utils/               # Utility functions
    └── export-utils.js  # Export helpers
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Previewing the Production Build

Serve the production build locally and open in your browser:

```bash
npm run preview
```

Then open `http://localhost:4173`.

## Troubleshooting

### Common Issues

1. **No logs displayed**: Check your Firebase configuration and ensure the database structure matches the expected schema
2. **Filter options not loading**: Verify your Firebase security rules allow read access to the logs path
3. **Export not working**: Ensure your browser supports the File API and blob downloads

### Debug Mode

Enable debug logging by opening the browser console. The application logs detailed information about:
- Firebase connection status
- Filter operations
- Data loading progress
- Error conditions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the browser console for error messages
3. Verify your Firebase configuration
4. Open an issue on the repository
