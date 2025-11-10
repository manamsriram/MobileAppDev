# Pocket Lists (React Native / Expo)

A React Native app built with Expo for managing simple lists. Users can add items, edit details and notes, attach photos, and toggle between light and dark themes—all stored locally.

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

## Project Structure

```
src/
  ├── app.js                    # Root navigator (NavigationContainer + Stack)
  ├── components/
  │   └── ThemeContext.js       # Theme provider & useTheme hook
  ├── screens/
  │   ├── HomeScreen.js         # List, add, delete, toggle done
  │   ├── DetailsScreen.js      # Edit note, photo picker, save
  │   └── SettingsScreen.js     # (optional placeholder)
  └── storage/
      ├── items.js              # loadItems() / saveItems() helpers
      └── theme.js              # loadTheme() / saveTheme() helpers
index.js                         # Entry point (registerRootComponent)
package.json
```

## Setup

1. **Install dependencies**

```bash
cd /Users/sriram/Documents/GitHub/MobileAppDev/ReactNative/pocket-lists
npm install
```

2. **Run on iOS Simulator**

```bash
npx expo start
# Then press 'i' or use Expo DevTools
```

3. **Run on Android Emulator**

```bash
npx expo start
# Then press 'a' or use Expo DevTools
```

4. **Run on Device (Expo Go)**

```bash
npx expo start
# Scan QR code with Expo Go app on device
```

## Clearing Cache (if needed)

```bash
npx expo start -c
```

## Permissions

- **Image Picker**: Requires photo library permission. Accept the permission prompt on device/simulator when you tap "Add Photo" or "Change Photo".

## Homework Deliverables Checklist

- [x] Home/List screen: add, delete, mark done, search, pull-to-refresh
- [x] Details screen: edit title/note, optional photo picker, save
- [x] Platform-specific confirmations (iOS ActionSheetIOS, Android Alert)
- [x] Theme toggle (light/dark, persisted)
- [x] AsyncStorage persistence for items and theme
- [x] Project structure with `/src/components`, `/src/screens`, `/src/storage`
- [ ] Screenshots (place in repo root):
  - `ios-home.png` — Home screen on iOS
  - `ios-details.png` — Details screen on iOS
  - `ios-theme.png` — Theme toggle visible
  - `android-home.png` — Home screen on Android
  - `android-details.png` — Details screen on Android
  - `android-theme.png` — Theme toggle visible

## Notes

- **Entry Point**: `index.js` at the project root registers the app with Expo. `package.json` main points to `index.js`.
- **Navigation**: Stack Navigator handles Home → Details navigation.
- **Storage**: Items and theme are stored in AsyncStorage with keys `PL_ITEMS_V1` and `PL_THEME`.

## Troubleshooting

**"main has not been registered" error**
- Ensure `package.json` main is set to `index.js`
- Stop Metro, clear cache: `npx expo start -c`

**Import errors or "Cannot find module"**
- Check file paths in imports (e.g., `./src/app` not `./src/App`)
- Restart: `npx expo start -c`

**Image picker not working**
- Ensure `expo-image-picker` is in `package.json` dependencies
- Accept permission prompt on device

## Optional Enhancements

- Add PropTypes for prop validation
- Create `/src/storage/` helpers and move AsyncStorage calls there (mostly done)
- Add unit tests
- Implement Swipe-to-delete gesture
- Add item categories or tags

---

Ready to test! Run `npx expo start` and press `i` or `a`.
