import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { products } from '../../constants/products';
import { useCart } from '../../contexts/CartContext';

export default function CatalogScreen() {
  const router = useRouter();
  const { addToCart, cart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог продукции</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={styles.card}>
              <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.thumbnail} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text>Калории: {item.kcal} | Б: {item.protein} | Ж: {item.fat} | У: {item.carbs}</Text>
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
            </View>
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
  desc: { fontSize: 14, color: '#666', marginBottom: 8 },
  button: { marginTop: 8, backgroundColor: '#e46e7c', borderRadius: 8, padding: 8, alignItems: 'center', width: 180, alignSelf: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
