import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { products } from '@/constants/products';

export default function CatalogScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог продукции</Text>
      <FlatList
        data={products}  // Передаем все 30 товаров
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={styles.card}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.tagline}>{item.tagline}</Text>
              <Text>{item.desc}</Text>
              <Text>Калории: {item.kcal} | Б: {item.protein} | Ж: {item.fat} | У: {item.carbs}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>В корзину</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 10 },
  productName: { fontWeight: 'bold', fontSize: 16 },
  tagline: { fontStyle: 'italic', color: '#e46e7c', marginBottom: 4 },
  button: { marginTop: 8, backgroundColor: '#e46e7c', borderRadius: 8, padding: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
