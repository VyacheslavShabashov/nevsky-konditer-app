
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [name, setName] = useState('Иван');
  const [email, setEmail] = useState('ivan@example.com');
  const [goal, setGoal] = useState('Питаться без сахара');

  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');

  const router = useRouter();

  function handleLogout() {
    Alert.alert('Выход', 'Вы действительно хотите выйти?', [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Выйти',
        onPress: () => {
          setName('');
          setEmail('');
          setGoal('');
          Alert.alert('Вы вышли из профиля');
        },
      },
    ]);
  }

  function toggleTheme() {
    setDarkMode(prev => !prev);
    Alert.alert('Тема изменена', `Вы включили ${!darkMode ? 'тёмную' : 'светлую'} тему`);
  }

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.title, darkMode && styles.titleDark]}>Профиль</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' }}
          style={styles.avatar}
        />
      </View>

      <TextInput
        style={[styles.input, darkMode && styles.inputDark]}
        value={name}
        onChangeText={setName}
        placeholder="Имя"
        placeholderTextColor={darkMode ? '#999' : undefined}
      />
      <TextInput
        style={[styles.input, darkMode && styles.inputDark]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={darkMode ? '#999' : undefined}
      />
      <TextInput
        style={[styles.input, darkMode && styles.inputDark]}
        value={goal}
        onChangeText={setGoal}
        placeholder="Цель (например: без сахара)"
        placeholderTextColor={darkMode ? '#999' : undefined}
      />

      <View style={styles.themeRow}>
        <Text style={{ fontSize: 16, color: darkMode ? '#fff' : '#000' }}>
          Тёмная тема
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/profile-orders')}
      >
        <Text style={styles.buttonText}>История заказов</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: '#333' }]}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  containerDark: { backgroundColor: '#222' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  titleDark: { color: '#fff' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  input: {
    borderColor: '#eee',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e46e7c',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
