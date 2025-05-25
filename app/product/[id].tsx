import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { products } from '../../constants/products';
import { useCart } from '../../contexts/CartContext';
import { useFavorite } from '../../contexts/FavoriteContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === id);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();
  const favorite = product ? isFavorite(product.id) : false;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <TouchableOpacity
        style={styles.favButton}
        onPress={() => toggleFavorite(product.id)}
      >
        <Ionicons
          name={favorite ? 'heart' : 'heart-outline'}
          size={28}
          color="#e46e7c"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price} ₽</Text>
      <Text style={styles.desc}>{product.desc}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addToCart(product);
          alert('Товар добавлен в корзину!');
        }}
      >
        <Text style={styles.buttonText}>В корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  favButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 50,
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#44c759', marginBottom: 6 },
  desc: { fontSize: 16, color: '#666', marginBottom: 16 },
  button: {
    backgroundColor: '#e46e7c',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
