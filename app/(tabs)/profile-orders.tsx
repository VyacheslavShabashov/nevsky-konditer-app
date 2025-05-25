
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await AsyncStorage.getItem('order-history');
    if (data) {
      setOrders(JSON.parse(data));
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>История заказов</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>У вас пока нет заказов.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>Дата: {item.date}</Text>
              <Text style={styles.method}>Способ: {item.method}</Text>
              <Text style={styles.total}>Сумма: {item.total} ₽</Text>
              <Text style={styles.items}>Товары: {item.items.join(', ')}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  date: { fontWeight: 'bold', marginBottom: 4 },
  method: { color: '#333' },
  total: { color: '#44c759', fontWeight: 'bold', marginVertical: 4 },
  items: { fontSize: 13, color: '#555' },
});
