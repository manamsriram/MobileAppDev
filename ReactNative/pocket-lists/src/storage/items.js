import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'PL_ITEMS_V1';

 

export async function loadItems() {

  try { const json = await AsyncStorage.getItem(KEY); return json ? JSON.parse(json) : []; }

  catch { return []; }

}

export async function saveItems(items) {

  await AsyncStorage.setItem(KEY, JSON.stringify(items));

}