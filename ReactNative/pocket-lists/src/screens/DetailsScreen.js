import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActionSheetIOS,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../components/ThemeContext';

export default function DetailsScreen({ route, navigation }) {
  const { item, updateItem, items } = route.params;
  const { theme } = useTheme();

  const [title, setTitle] = useState(item.title);
  const [note, setNote] = useState(item.note || '');
  const [photoUri, setPhotoUri] = useState(item.photoUri || null);

  const saveChanges = () => {
    if (title.trim().length < 2 || title.trim().length > 40) {
      Alert.alert('Invalid Title', 'Title must be between 2-40 characters');
      return;
    }

    const updatedItem = {
      ...item,
      title: title.trim(),
      note,
      photoUri,
    };

    const updatedItems = items.map((i) =>
      i.id === item.id ? updatedItem : i
    );

    updateItem(updatedItems);

    // Platform-specific confirmation
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['OK'],
          title: 'Success',
          message: 'Changes saved successfully!',
        },
        () => navigation.goBack()
      );
    } else {
      Alert.alert('Success', 'Changes saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // `MediaTypeOptions` is deprecated; use `MediaType` (or an array of MediaType)
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={title}
          onChangeText={setTitle}
          maxLength={40}
          placeholder="Enter title"
          placeholderTextColor={theme.colors.secondary}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Note</Text>
        <TextInput
          style={[
            styles.noteInput,
            {
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={6}
          placeholder="Add a note..."
          placeholderTextColor={theme.colors.secondary}
          textAlignVertical="top"
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Photo (Optional)
        </Text>

        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        )}

        <TouchableOpacity
          style={[styles.photoButton, { backgroundColor: theme.colors.primary }]}
          onPress={pickImage}
        >
          <Text style={styles.photoButtonText}>
            {photoUri ? 'Change Photo' : 'Add Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
          onPress={saveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  noteInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 120,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  photoButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  photoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
