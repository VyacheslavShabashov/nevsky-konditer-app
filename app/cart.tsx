import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../contexts/CartContext'; // путь укажи под свою структуру!
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const router = useRouter();

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalSum = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Корзина</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Ваша корзина пуста</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
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
            )}
          />
          <Text style={styles.total}>Всего товаров: {totalQty}</Text>
          <Text style={styles.total}>Сумма заказа: {totalSum} ₽</Text>
          <TouchableOpacity style={styles.button} onPress={clearCart}>
            <Text style={styles.buttonText}>Очистить корзину</Text>
          </TouchableOpacity>
          {/* Вот здесь переход к оформлению заказа */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#44c759', marginTop: 10 }]}
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
  container: { flex: 1, padding: 18, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 30 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12 },
  name: { flex: 2, fontSize: 16 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  qtyBtn: { fontSize: 22, color: '#e46e7c', width: 34, textAlign: 'center' },
  qtyText: { fontSize: 18, minWidth: 30, textAlign: 'center' },
  remove: { color: '#e46e7c', marginLeft: 18 },
  total: { marginTop: 18, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  button: { backgroundColor: '#e46e7c', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

