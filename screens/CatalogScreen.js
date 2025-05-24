import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { products } from '@/constants/products';

/* const products = [
  { id: '1', name: 'Злаковый батончик', desc: 'Без сахара', kcal: 102, protein: 2.7, fat: 3.5, carbs: 15.6, image: 'https://via.placeholder.com/200' },
  { id: '2', name: 'Вафли', desc: 'С пониженным содержанием углеводов', kcal: 120, protein: 8.5, fat: 9.2, carbs: 4.5, image: 'https://via.placeholder.com/200' },
  { id: '3', name: 'Печенье овсяное', desc: 'На фруктозе', kcal: 97, protein: 1.4, fat: 4.1, carbs: 13.2, image: 'https://via.placeholder.com/200' },
  { id: '4', name: 'Медовые батончики', desc: 'С натуральным медом', kcal: 120, protein: 3.0, fat: 4.5, carbs: 14.0, image: 'https://via.placeholder.com/200' },
  { id: '5', name: 'Гречневые вафли', desc: 'С высоким содержанием клетчатки', kcal: 80, protein: 3.5, fat: 2.0, carbs: 10.0, image: 'https://via.placeholder.com/200' },
  { id: '6', name: 'Кокосовое печенье', desc: 'Без глютена', kcal: 150, protein: 2.0, fat: 8.0, carbs: 14.0, image: 'https://via.placeholder.com/200' },
  { id: '7', name: 'Чайные печенья', desc: 'С добавлением ванили', kcal: 110, protein: 1.2, fat: 4.2, carbs: 18.5, image: 'https://via.placeholder.com/200' },
  { id: '8', name: 'Овсяные хлопья', desc: 'Для завтраков', kcal: 90, protein: 5.0, fat: 3.0, carbs: 15.5, image: 'https://via.placeholder.com/200' },
  { id: '9', name: 'Ореховый батончик', desc: 'С медом и орехами', kcal: 140, protein: 4.0, fat: 8.0, carbs: 16.0, image: 'https://via.placeholder.com/200' },
  { id: '10', name: 'Ягодные вафли', desc: 'С добавлением свежих ягод', kcal: 130, protein: 5.0, fat: 6.5, carbs: 20.0, image: 'https://via.placeholder.com/200' },
  { id: '11', name: 'Кешью батончик', desc: 'С орехами кешью и медом', kcal: 180, protein: 6.5, fat: 12.0, carbs: 14.5, image: 'https://via.placeholder.com/200' },
  { id: '12', name: 'Шоколадные вафли', desc: 'С темным шоколадом', kcal: 200, protein: 3.5, fat: 10.0, carbs: 22.0, image: 'https://via.placeholder.com/200' },
  { id: '13', name: 'Миндальные печенья', desc: 'С миндальным кремом', kcal: 160, protein: 2.5, fat: 10.0, carbs: 18.0, image: 'https://via.placeholder.com/200' },
  { id: '14', name: 'Апельсиновые батончики', desc: 'С натуральным апельсиновым соком', kcal: 120, protein: 2.0, fat: 5.5, carbs: 16.5, image: 'https://via.placeholder.com/200' },
  { id: '15', name: 'Клубничные вафли', desc: 'С добавлением клубники', kcal: 140, protein: 4.0, fat: 6.0, carbs: 18.0, image: 'https://via.placeholder.com/200' },
  { id: '16', name: 'Финиковые батончики', desc: 'С финиками и орехами', kcal: 150, protein: 3.0, fat: 6.5, carbs: 21.0, image: 'https://via.placeholder.com/200' },
  { id: '17', name: 'Яблочные вафли', desc: 'С добавлением яблок', kcal: 110, protein: 2.5, fat: 3.0, carbs: 20.0, image: 'https://via.placeholder.com/200' },
  { id: '18', name: 'Гречневые батончики', desc: 'С гречкой и медом', kcal: 130, protein: 4.5, fat: 5.0, carbs: 18.5, image: 'https://via.placeholder.com/200' },
  { id: '19', name: 'Шоколадные печенья', desc: 'С кусочками шоколада', kcal: 180, protein: 2.5, fat: 8.0, carbs: 25.0, image: 'https://via.placeholder.com/200' },
  { id: '20', name: 'Печенье с орехами', desc: 'С орехами кешью и фундуком', kcal: 140, protein: 3.5, fat: 7.5, carbs: 18.0, image: 'https://via.placeholder.com/200' },
  { id: '21', name: 'Ореховые вафли', desc: 'С орехами и медом', kcal: 160, protein: 4.0, fat: 8.5, carbs: 19.0, image: 'https://via.placeholder.com/200' },
  { id: '22', name: 'Фрукты с орехами', desc: 'Ассорти из сухофруктов и орехов', kcal: 110, protein: 2.5, fat: 5.0, carbs: 22.0, image: 'https://via.placeholder.com/200' },
  { id: '23', name: 'Медовые печенья', desc: 'С медом и корицей', kcal: 160, protein: 2.0, fat: 7.0, carbs: 20.0, image: 'https://via.placeholder.com/200' },
  { id: '24', name: 'Батончик с орехами', desc: 'С орехами и шоколадом', kcal: 190, protein: 5.0, fat: 12.0, carbs: 22.0, image: 'https://via.placeholder.com/200' },
  { id: '25', name: 'Шоколад с орехами', desc: 'Темный шоколад с орехами', kcal: 210, protein: 3.0, fat: 15.0, carbs: 22.5, image: 'https://via.placeholder.com/200' },
  { id: '26', name: 'Кокосовые батончики', desc: 'С кокосовой стружкой', kcal: 130, protein: 3.0, fat: 6.0, carbs: 18.0, image: 'https://via.placeholder.com/200' },
  { id: '27', name: 'Персиковые батончики', desc: 'С натуральными персиками', kcal: 140, protein: 4.5, fat: 7.0, carbs: 20.0, image: 'https://via.placeholder.com/200' },
  { id: '28', name: 'Банановые батончики', desc: 'С добавлением бананов', kcal: 130, protein: 3.5, fat: 6.0, carbs: 17.5, image: 'https://via.placeholder.com/200' },
  { id: '29', name: 'Печенье с ягодами', desc: 'С черникой и малиной', kcal: 110, protein: 2.0, fat: 5.5, carbs: 19.0, image: 'https://via.placeholder.com/200' },
  { id: '30', name: 'Печенье с медом', desc: 'С натуральным медом', kcal: 120, protein: 3.0, fat: 6.0, carbs: 18.0, image: 'https://via.placeholder.com/200' }
]; */




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
  button: { marginTop: 8, backgroundColor: '#e46e7c', borderRadius: 8, padding: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
