import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from '../contexts/CartContext'; // путь к CartContext
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  function handleOrder() {
    if (!name || !phone || !address) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля!');
      return;
    }
    // Тут может быть отправка на сервер или email
    clearCart();
    Alert.alert('Спасибо!', 'Ваш заказ принят. Мы свяжемся с вами для уточнения деталей.');
    router.push('/'); // Вернуться на главную
  }

  if (!cart.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Корзина пуста. Добавьте товары!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оформление заказа</Text>
      <Text style={styles.label}>Ваше имя</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Имя" />
      <Text style={styles.label}>Телефон</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+7..." keyboardType="phone-pad" />
      <Text style={styles.label}>Адрес</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Адрес доставки" />
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Подтвердить заказ</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontWeight: 'bold' }}>Ваш заказ:</Text>
        {cart.map(item => (
          <Text key={item.id}>{item.name} x{item.qty}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { marginTop: 16, marginBottom: 4, fontSize: 15 },
  input: { backgroundColor: '#f2f2f2', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#44c759', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  empty: { fontSize: 18, color: '#999', textAlign: 'center', marginTop: 40 },
});
