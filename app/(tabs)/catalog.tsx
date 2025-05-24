import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const products = [
  { id: '1', name: 'Злаковый батончик', desc: 'Без сахара', kcal: 102, protein: 2.7, fat: 3.5, carbs: 15.6 },
  { id: '2', name: 'Вафли', desc: 'С пониженным содержанием углеводов', kcal: 120, protein: 8.5, fat: 9.2, carbs: 4.5 },
  { id: '3', name: 'Печенье овсяное', desc: 'На фруктозе', kcal: 97, protein: 1.4, fat: 4.1, carbs: 13.2 },
];

export default function CatalogScreen() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог продукции</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={styles.card}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
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
  button: { marginTop: 8, backgroundColor: '#e46e7c', borderRadius: 8, padding: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
