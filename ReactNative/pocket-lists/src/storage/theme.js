import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'PL_THEME';

export const loadTheme = async () => (await AsyncStorage.getItem(THEME_KEY)) || 'light';

export const saveTheme = (t) => AsyncStorage.setItem(THEME_KEY, t);