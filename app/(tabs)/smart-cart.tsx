
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/CartContext';
import { Picker } from '@react-native-picker/picker';

export default function SmartCartScreen() {
  const router = useRouter();
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const filtered = cart
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const price = item.price;
      const inPriceRange =
        (!priceMin || price >= parseInt(priceMin)) &&
        (!priceMax || price <= parseInt(priceMax));
      return matchesSearch && inPriceRange;
    })
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  const totalSum = filtered.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Корзина с фильтром</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по названию..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        <TextInput
          placeholder="Цена от"
          value={priceMin}
          onChangeText={setPriceMin}
          keyboardType="numeric"
          style={styles.rangeInput}
        />
        <TextInput
          placeholder="до"
          value={priceMax}
          onChangeText={setPriceMax}
          keyboardType="numeric"
          style={styles.rangeInput}
        />
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={setSortBy}
        >
          <Picker.Item label="Без сортировки" value="" />
          <Picker.Item label="Цена ↑" value="low" />
          <Picker.Item label="Цена ↓" value="high" />
        </Picker>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Корзина пуста</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price} ₽</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => updateQty(item.id, Math.max(1, item.qty - 1))}>
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)}>
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.remove}>Удалить</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {filtered.length > 0 && (
        <>
          <Text style={styles.total}>Сумма: {totalSum} ₽</Text>
          <TouchableOpacity style={styles.button} onPress={clearCart}>
            <Text style={styles.buttonText}>Очистить корзину</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#44c759' }]}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.buttonText}>Оформить заказ</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  filters: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rangeInput: {
    backgroundColor: '#eee',
    flex: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  picker: { flex: 1 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#44c759', marginTop: 4 },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
    color: '#e46e7c',
  },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  remove: { color: '#e46e7c', marginTop: 6 },
  total: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  button: {
    backgroundColor: '#e46e7c',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
