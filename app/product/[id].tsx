import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { products } from '@/constants/products';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <View style={styles.container}><Text>Товар не найден</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.desc}>{product.desc}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.nutrition}>
        <Text>Калории: {product.kcal}</Text>
        <Text>Белки: {product.protein}</Text>
        <Text>Жиры: {product.fat}</Text>
        <Text>Углеводы: {product.carbs}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>В корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  image: { width: '100%', height: 200, borderRadius: 18, marginBottom: 18, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 16, color: '#666', marginBottom: 8 },
  description: { fontSize: 15, marginBottom: 12, color: '#222' },
  nutrition: { marginBottom: 16 },
  button: { backgroundColor: '#e46e7c', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
