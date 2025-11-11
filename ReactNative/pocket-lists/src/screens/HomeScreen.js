import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Switch,
} from 'react-native';
import { loadItems, saveItems } from '../storage/items';
import { useTheme } from '../components/ThemeContext';
import ListItem from '../components/ListItem';

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [items, setItems] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadItemsFromStorage();
  }, []);

  // Reload items when screen regains focus (e.g., after clearing in Settings)
  useFocusEffect(
    React.useCallback(() => {
      loadItemsFromStorage();
    }, [])
  );

  // Add Settings button and theme toggle to the navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 12 }}>
            <Text style={{ color: theme.colors.text }}>{isDark ? '🌙' : '☀️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={{ color: theme.colors.text }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, theme, isDark, toggleTheme]);

  const loadItemsFromStorage = async () => {
    try {
      const loadedItems = await loadItems();
      setItems(loadedItems);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const saveItemsToStorage = async (newItems) => {
    try {
      await saveItems(newItems);
      setItems(newItems);
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const addItem = () => {
    const title = newItemTitle.trim();

    if (title.length < 2 || title.length > 40) {
      Alert.alert('Invalid Title', 'Title must be between 2-40 characters');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title,
      done: false,
      note: '',
      photoUri: null,
    };

    const updatedItems = [...items, newItem];
    saveItemsToStorage(updatedItems);
    setNewItemTitle('');
  };

  const toggleDone = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    saveItemsToStorage(updatedItems);
  };

  const deleteItem = (id) => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedItems = items.filter((item) => item.id !== id);
          saveItemsToStorage(updatedItems);
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItemsFromStorage();
    setRefreshing(false);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      theme={theme}
      onPress={() =>
        navigation.navigate('Details', {
          item,
          items,
        })
      }
      onToggle={() => toggleDone(item.id)}
      onDelete={() => deleteItem(item.id)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 

      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        placeholder="Search items..."
        placeholderTextColor={theme.colors.secondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Add Item Input */}
      <View style={styles.addSection}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholder="Add new item (2-40 chars)"
          placeholderTextColor={theme.colors.secondary}
          value={newItemTitle}
          onChangeText={setNewItemTitle}
          maxLength={40}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={addItem}
          disabled={newItemTitle.trim().length < 2}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.secondary }]}>
            No items yet. Add one above!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeLabel: {
    fontSize: 20,
  },
  searchInput: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  addSection: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  itemCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
  },
  itemTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
