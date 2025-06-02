import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { products } from '../../constants/products';
import { useCart } from '../../contexts/CartContext';

export default function CatalogScreen() {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'lowCal' | 'highProtein' | 'lowCarb'>('all');
  const [sort, setSort] = useState<'name' | 'kcal'>('name');

  const data = useMemo(() => {
    let list = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'lowCal') list = list.filter(p => p.kcal <= 100);
    if (filter === 'highProtein') list = list.filter(p => p.protein >= 6);
    if (filter === 'lowCarb') list = list.filter(p => p.carbs <= 12);
    if (sort === 'kcal') list = list.slice().sort((a, b) => a.kcal - b.kcal);
    if (sort === 'name') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, filter, sort]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог продукции</Text>
      <TextInput placeholder="Поиск" value={search} onChangeText={setSearch} style={styles.search} />
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterBtn, filter==='all'&&styles.active]} onPress={() => setFilter('all')}><Text>Все</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter==='lowCal'&&styles.active]} onPress={() => setFilter('lowCal')}><Text>до 100 ккал</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter==='highProtein'&&styles.active]} onPress={() => setFilter('highProtein')}><Text>белковые</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter==='lowCarb'&&styles.active]} onPress={() => setFilter('lowCarb')}><Text>низкоуглеводные</Text></TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterBtn, sort==='name'&&styles.active]} onPress={() => setSort('name')}><Text>по имени</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, sort==='kcal'&&styles.active]} onPress={() => setSort('kcal')}><Text>по ккал</Text></TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} style={styles.card}>
              <Image source={item.image} style={styles.thumbnail} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>{item.price} ₽</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text>Калории: {item.kcal ?? '-'} | Б: {item.protein ?? '-'} | Ж: {item.fat ?? '-'} | У: {item.carbs ?? '-'}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    addToCart(item);
                    alert('Товар добавлен в корзину!');
                  }}
                >
                  <Text style={styles.buttonText}>В корзину</Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cart')}
      >
        <Text style={styles.buttonText}>Перейти в корзину ({cart.length})</Text>
      </TouchableOpacity>
      {cart.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontWeight: 'bold' }}>Содержимое корзины:</Text>
          {cart.map(item => (
            <Text key={item.id}>{item.name} (x{item.qty})</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  thumbnail: { width: 70, height: 70, borderRadius: 10, marginRight: 14, backgroundColor: '#eee' },
  productName: { fontWeight: 'bold', fontSize: 16 },
  price: { fontSize: 15, color: '#44c759', fontWeight: 'bold', marginBottom: 2 },
  desc: { fontSize: 14, color: '#666', marginBottom: 8 },
  button: { marginTop: 8, backgroundColor: '#e46e7c', borderRadius: 8, padding: 8, alignItems: 'center', width: 180, alignSelf: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  search: { backgroundColor: '#f2f2f2', padding: 8, borderRadius: 8, marginBottom: 8 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  filterBtn: { backgroundColor: '#eee', padding: 6, borderRadius: 8, marginRight: 6, marginBottom: 6 },
  active: { backgroundColor: '#cde' },
});
