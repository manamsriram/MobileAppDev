import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { loadItems, saveItems } from '../storage/items';

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme, isDark } = useTheme();

  const clearAll = async () => {
    Alert.alert('Clear all items', 'Are you sure you want to delete all items?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await saveItems([]);
          Alert.alert('Cleared', 'All items removed');
          // go back so Home screen can refresh
          if (navigation && navigation.goBack) navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Theme</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.colors.text }}>{isDark ? 'Dark' : 'Light'}</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={[styles.clearButton, { backgroundColor: theme.colors.primary }]} onPress={clearAll}>
          <Text style={styles.clearText}>Clear All Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
