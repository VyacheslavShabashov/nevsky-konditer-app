import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

const orders = [
  { id: '1', date: '12.05.2024', total: 250, items: ['Ореховое печенье', 'Ягодное печенье'] },
  { id: '2', date: '20.05.2024', total: 180, items: ['Банановый батончик'] }
];

export default function ProfileScreen() {
  const [name, setName] = useState('Иван');
  const [email, setEmail] = useState('ivan@example.com');
  const [goals, setGoals] = useState('Есть меньше сахара');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <Text style={styles.section}>Настройки</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.section}>Мои цели</Text>
      <TextInput style={styles.input} value={goals} onChangeText={setGoals} multiline />
      <Text style={styles.section}>История заказов</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text>{item.date} — {item.total} ₽</Text>
            <Text style={styles.orderItems}>{item.items.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  section: { marginTop: 16, marginBottom: 6, fontWeight: 'bold' },
  input: { backgroundColor: '#f2f2f2', borderRadius: 8, padding: 10, marginBottom: 8 },
  order: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginBottom: 8 },
  orderItems: { fontSize: 12, color: '#555' }
});
