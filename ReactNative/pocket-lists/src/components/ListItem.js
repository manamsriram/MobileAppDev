import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListItem({ item, onPress, onToggle, onDelete, theme }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <TouchableOpacity onPress={onToggle} style={[styles.checkbox, item.done && styles.checkboxDone, { borderColor: theme.colors.border }]}>
          {item.done && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.colors.text }, item.done && styles.done]} numberOfLines={1}>
          {item.title}
        </Text>

        <TouchableOpacity onPress={onDelete} style={styles.delete}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  row: {
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
  title: {
    flex: 1,
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  delete: {
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
  },
});
