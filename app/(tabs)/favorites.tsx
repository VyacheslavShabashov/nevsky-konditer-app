import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorite } from '../../contexts/FavoriteContext';
import { products } from '../../constants/products';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorite();
  const router = useRouter();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Избранное</Text>

      {favoriteProducts.length === 0 ? (
        <Text style={styles.empty}>У вас пока нет избранных товаров.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} ₽</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Ionicons name="heart" size={24} color="#e46e7c" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { fontSize: 16, color: '#888', marginTop: 40, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#44c759', fontWeight: 'bold', marginTop: 4 },
});
