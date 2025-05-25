
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
import { products } from '../../constants/products';
import { useCart } from '../../contexts/CartContext';
import { Picker } from '@react-native-picker/picker';

export default function CatalogScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [caloriesMin, setCaloriesMin] = useState('');
  const [caloriesMax, setCaloriesMax] = useState('');
  const [flavors, setFlavors] = useState({
    шоколад: false,
    ягоды: false,
    орех: false,
  });

  const filtered = products
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? item.desc.includes(category) : true;
      const price = item.price;
      const kcal = item.kcal ?? 0;

      const inPriceRange =
        (!priceMin || price >= parseInt(priceMin)) &&
        (!priceMax || price <= parseInt(priceMax));

      const inCalorieRange =
        (!caloriesMin || kcal >= parseInt(caloriesMin)) &&
        (!caloriesMax || kcal <= parseInt(caloriesMax));

      const flavorMatch = Object.entries(flavors)
        .filter(([_, v]) => v)
        .some(([key]) => item.name.toLowerCase().includes(key));

      const allowFlavor = Object.values(flavors).some(v => v) ? flavorMatch : true;

      return matchesSearch && matchesCategory && inPriceRange && inCalorieRange && allowFlavor;
    })
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по названию..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={setCategory}
        >
          <Picker.Item label="Все" value="" />
          <Picker.Item label="Печенье" value="Печенье" />
          <Picker.Item label="Вафли" value="Вафли" />
          <Picker.Item label="Батончики" value="Батончик" />
        </Picker>

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

      <View style={styles.filterBlock}>
        <Text style={styles.filterLabel}>Цена (₽):</Text>
        <View style={styles.rangeRow}>
          <TextInput
            placeholder="от"
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
        </View>

        <Text style={styles.filterLabel}>Калории:</Text>
        <View style={styles.rangeRow}>
          <TextInput
            placeholder="от"
            value={caloriesMin}
            onChangeText={setCaloriesMin}
            keyboardType="numeric"
            style={styles.rangeInput}
          />
          <TextInput
            placeholder="до"
            value={caloriesMax}
            onChangeText={setCaloriesMax}
            keyboardType="numeric"
            style={styles.rangeInput}
          />
        </View>

        <Text style={styles.filterLabel}>Вкусы:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Object.keys(flavors).map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.flavorItem, flavors[key] && styles.flavorItemActive]}
              onPress={() => setFlavors(prev => ({ ...prev, [key]: !prev[key] }))}
            >
              <Text style={styles.flavorText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.price}>{item.price} ₽</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    addToCart(item);
                    alert('Добавлено в корзину!');
                  }}
                >
                  <Text style={styles.buttonText}>В корзину</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  filterBlock: { marginBottom: 16 },
  filterLabel: { fontWeight: 'bold', marginTop: 8, marginBottom: 4 },
  rangeRow: { flexDirection: 'row', gap: 10 },
  rangeInput: {
    backgroundColor: '#eee',
    flex: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 15,
  },
  flavorItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    marginRight: 8,
    marginTop: 6,
  },
  flavorItemActive: {
    backgroundColor: '#e46e7c',
  },
  flavorText: {
    color: '#333',
    fontWeight: 'bold',
  },
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
  desc: { fontSize: 14, color: '#666' },
  price: { fontSize: 14, color: '#44c759', fontWeight: 'bold', marginTop: 6 },
  button: {
    marginTop: 8,
    backgroundColor: '#e46e7c',
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    width: 140,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
