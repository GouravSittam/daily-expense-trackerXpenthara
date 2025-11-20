# 📴 Offline Mode & Auto-Sync Feature

## Overview

Your expense tracker now supports **offline-first functionality** with automatic synchronization. When the backend connection drops, all data is automatically saved to localStorage and synced back to the server when connection is restored.

## 🎯 Key Features

### 1. Automatic Offline Detection

- ✅ Detects when backend is unreachable
- ✅ Automatically switches to offline mode
- ✅ Shows visual indicator to user

### 2. Local Data Storage

- ✅ All expenses saved to localStorage
- ✅ CRUD operations work offline
- ✅ Data persists across browser sessions

### 3. Automatic Synchronization

- ✅ Syncs when connection is restored
- ✅ Periodic sync attempts every 30 seconds
- ✅ Manual retry option available
- ✅ Smart sync queue management

### 4. Visual Feedback

- ✅ Offline indicator badge
- ✅ Pending operations counter
- ✅ Sync progress indicator
- ✅ Success/failure notifications

## 🔄 How It Works

### Normal Online Operation

```
User Action → Frontend → Backend API → MongoDB → Response → UI Update
                                    ↓
                              localStorage (cache)
```

### Offline Operation

```
User Action → Frontend → localStorage → UI Update
                              ↓
                        Sync Queue (pending)
```

### Auto-Sync on Reconnection

```
Connection Restored → Sync Queue → Backend API → MongoDB
                                         ↓
                                   Success → Clear Queue
```

## 📊 Data Flow

### Adding Expense (Offline)

1. User fills form and submits
2. Backend check fails (offline)
3. Expense saved to localStorage with `local_` prefix ID
4. Operation added to pending sync queue
5. Offline indicator appears
6. UI updates immediately

### Adding Expense (Online)

1. User fills form and submits
2. Backend check succeeds
3. POST request to `/api/expenses`
4. Response received with server-generated ID
5. Data cached in localStorage
6. UI updates with synced data

### Automatic Sync

1. Connection restored (network online event)
2. Sync function triggered automatically
3. Pending queue processed sequentially
4. CREATE operations → POST to backend
5. DELETE operations → DELETE to backend
6. UPDATE operations → PUT to backend
7. Successful operations removed from queue
8. Failed operations remain for retry
9. localStorage cache updated
10. Offline mode disabled

## 🎨 UI Components

### OfflineIndicator Component

Located at: `src/components/OfflineIndicator.jsx`

**Features:**

- Fixed position badge (bottom-right)
- Orange badge when offline
- Blue badge when syncing
- Shows pending operation count
- Manual retry button
- Auto-hides when online with no pending ops

**States:**

- **Online + Synced**: Hidden
- **Offline**: Orange badge with pending count
- **Syncing**: Blue badge with spinner
- **Error**: Orange badge with retry button

## 🔧 Technical Implementation

### Storage Keys

```javascript
STORAGE_KEYS = {
  EXPENSES: "expenses", // Cached expenses
  PENDING_SYNC: "pendingSync", // Operations queue
  LAST_SYNC: "lastSync", // Last sync timestamp
  OFFLINE_MODE: "offlineMode", // Current mode flag
};
```

### Sync Queue Structure

```javascript
{
  id: "pending_1234567890_abc123",
  type: "CREATE" | "UPDATE" | "DELETE",
  data: { /* expense data */ },
  timestamp: "2025-11-20T10:30:00.000Z"
}
```

### Local Expense Structure

```javascript
{
  id: "local_1234567890_abc123",  // Temporary ID
  amount: 50.99,
  category: "Food",
  description: "Lunch",
  date: "2025-11-20",
  createdAt: "2025-11-20T10:30:00.000Z",
  updatedAt: "2025-11-20T10:30:00.000Z",
  _isLocal: true                   // Flag for local-only
}
```

## 📝 API Functions

### Core Functions

#### `isOfflineMode()`

Returns current offline mode status

```javascript
const offline = isOfflineMode();
// Returns: boolean
```

#### `syncPendingOperations()`

Syncs all pending operations to backend

```javascript
const result = await syncPendingOperations();
// Returns: { success: true, synced: 3, failed: 0 }
```

#### `getPendingSyncCount()`

Gets number of pending operations

```javascript
const count = getPendingSyncCount();
// Returns: number
```

#### `getLastSyncTime()`

Gets timestamp of last successful sync

```javascript
const lastSync = getLastSyncTime();
// Returns: "2025-11-20T10:30:00.000Z" or null
```

### Modified Functions

All CRUD operations now support offline mode:

#### `getExpenses(filters)`

- Attempts backend call
- Falls back to localStorage on failure
- Triggers auto-sync if offline

#### `addExpense(expense)`

- Checks backend availability
- Saves to localStorage if offline
- Queues for sync
- Generates temporary `local_` ID

#### `deleteExpense(id)`

- Deletes from localStorage immediately
- Queues backend delete if online
- Handles local-only expenses

## 🚨 Error Handling

### Network Errors

```javascript
try {
  await addExpense(data);
} catch (error) {
  // Automatically saved to localStorage
  // Queued for sync
  // User sees offline indicator
}
```

### Sync Failures

- Failed operations remain in queue
- Retry attempted every 30 seconds
- Manual retry button available
- User notified of pending operations

## 🎯 User Experience

### When Backend Goes Offline

1. ✅ User sees orange badge immediately
2. ✅ Can continue adding/deleting expenses
3. ✅ Sees pending operation count
4. ✅ Gets notification about auto-sync

### When Connection Restores

1. ✅ Auto-sync triggered immediately
2. ✅ Badge turns blue (syncing)
3. ✅ Operations synced sequentially
4. ✅ Badge disappears on success
5. ✅ UI updated with server IDs

## 🧪 Testing Offline Mode

### Method 1: Stop Backend Server

```powershell
# Stop the backend
# Ctrl+C in backend terminal

# Frontend continues working
# Check offline indicator appears
```

### Method 2: Browser DevTools

```javascript
1. Open DevTools (F12)
2. Network tab
3. Check "Offline" checkbox
4. Try adding expenses
5. Uncheck to restore
```

### Method 3: Test Sync Queue

```javascript
// In browser console
localStorage.getItem("pendingSync");
// Shows pending operations

localStorage.getItem("offlineMode");
// Shows offline status
```

## 📊 Monitoring

### Check Sync Status

```javascript
// Browser console
import {
  getPendingSyncCount,
  getLastSyncTime,
} from "./services/ExpenseService";

getPendingSyncCount(); // Number of pending ops
getLastSyncTime(); // Last sync timestamp
```

### View Pending Operations

```javascript
// Browser console
const queue = JSON.parse(localStorage.getItem("pendingSync") || "[]");
console.table(queue);
```

### View Cached Expenses

```javascript
// Browser console
const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
console.table(expenses);
```

## 🔐 Data Consistency

### Conflict Resolution

- Server data always takes precedence
- Local IDs replaced with server IDs on sync
- Timestamps updated from server
- Duplicate prevention via queue management

### Data Integrity

- ✅ Operations queued in order
- ✅ Sequential sync processing
- ✅ Failed operations retried
- ✅ No data loss on reconnection

## 🚀 Performance

### Optimizations

- ✅ 3-second timeout for backend checks
- ✅ Cached data for fast reads
- ✅ Batched sync operations
- ✅ Periodic sync (30s intervals)
- ✅ Event-driven sync triggers

### Network Efficiency

- ✅ Health check before operations
- ✅ Single sync per reconnection
- ✅ Avoided redundant API calls
- ✅ Smart queue management

## 📱 Browser Compatibility

Works in all modern browsers supporting:

- ✅ localStorage
- ✅ fetch API
- ✅ Custom events
- ✅ online/offline events

## 🎓 Best Practices

### For Users

1. Internet connection recommended for first use
2. Data syncs automatically - no action needed
3. Check indicator for pending operations
4. Use retry button if auto-sync fails

### For Developers

1. Always check `isOfflineMode()` for conditional UI
2. Listen to `offlineModeChange` event for updates
3. Test offline scenarios thoroughly
4. Handle sync failures gracefully
5. Monitor localStorage size (typically not an issue)

## 📋 Configuration

### Sync Interval

Change in `OfflineIndicator.jsx`:

```javascript
// Current: 30 seconds
const syncInterval = setInterval(async () => {
  // ...
}, 30000);

// Change to 1 minute:
}, 60000);
```

### Backend Timeout

Change in `ExpenseService.js`:

```javascript
// Current: 3 seconds
const timeoutId = setTimeout(() => controller.abort(), 3000);

// Change to 5 seconds:
const timeoutId = setTimeout(() => controller.abort(), 5000);
```

## 🎉 Benefits

✅ **Never lose data** - Works offline completely
✅ **Automatic sync** - No user intervention needed
✅ **Real-time feedback** - Visual indicators
✅ **Seamless UX** - Transparent to user
✅ **Production-ready** - Tested and reliable

## 🔍 Troubleshooting

### Issue: Sync not working

**Solution:** Check browser console for errors, verify backend is running

### Issue: Duplicate entries

**Solution:** Clear localStorage: `localStorage.clear()`, refresh page

### Issue: Indicator stuck on "Syncing"

**Solution:** Check network tab in DevTools, manually retry

### Issue: Old data showing

**Solution:** Backend successfully synced, just needs page refresh

---

**Your app now works offline with automatic sync! 🎊**
