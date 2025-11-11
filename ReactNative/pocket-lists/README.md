 # Pocket Lists (React Native / Expo)

A React Native app (Expo) for a small homework/demo: add lightweight lists, edit details, attach optional photos, and toggle light/dark theme. Data persists locally with AsyncStorage.

## Features

✅ **Home/List Screen**
- Add items with title validation (2–40 characters)
- FlatList with delete and "mark done" checkbox
- Search filter to find items
- Pull-to-refresh to reload from storage
- Theme toggle in header (light/dark)

✅ **Details Screen**
- View and edit item title and multiline note
- Optional photo picker (uses `expo-image-picker`)
- Platform-specific save confirmation:
  - **iOS**: ActionSheetIOS
  - **Android**: Alert

✅ **Theme & Persistence**
- Light/dark theme toggle
- Theme preference stored in AsyncStorage
- All items and settings persist across app restarts

## Project structure (short)

```
src/
  ├── App.js                # Root navigator (NavigationContainer + Stack)
  ├── components/
  │   ├── ThemeContext.js  # Theme provider & useTheme hook
  │   ├── ListItem.js      # Row UI for items
  │   └── ThemedView.js    # Small themed wrapper
  ├── screens/
  │   ├── HomeScreen.js    # Main list UI and add input
  │   ├── DetailsScreen.js # Edit note, pick photo, save
  │   └── SettingsScreen.js# Theme toggle + clear storage
  └── storage/
      ├── items.js         # loadItems() / saveItems() helpers
      └── theme.js         # loadTheme() / saveTheme() helpers
index.js                   # Entry point (registerRootComponent)
package.json
```

Quick start

1. Install dependencies

```bash
cd ReactNative/pocket-lists
npm install
```

2. Start Expo

```bash
npx expo start
```

3. Run on a simulator or device

- Press `i` to run iOS simulator (macOS + Xcode required)
- Press `a` to run Android emulator
- Or open the QR in Expo Go on your device

Notes & troubleshooting

- If you see a warning about `Non-serializable values` in navigation, avoid passing functions in `navigation.navigate` params — use storage or context instead (this project follows that practice).
- If the image picker warns about `MediaTypeOptions` deprecation, it’s from the installed `expo-image-picker` version; both `MediaTypeOptions` and `MediaType` patterns may appear depending on SDK. The app uses the compatible API for the SDK version included.
- If Metro reports an assets folder missing (ENOENT assets/images), create `assets/images` at the project root — this repo includes that folder.

Where to look

- UI: `src/screens/*` (Home, Details, Settings)
- Theming: `src/components/ThemeContext.js`
- Storage: `src/storage/items.js` and `src/storage/theme.js`