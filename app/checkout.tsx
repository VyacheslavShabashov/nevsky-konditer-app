
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function saveOrderToHistory(order) {
    const existing = await AsyncStorage.getItem('order-history');
    const history = existing ? JSON.parse(existing) : [];
    history.unshift(order);
    await AsyncStorage.setItem('order-history', JSON.stringify(history));
  }

  async function handleOrder() {
    if (!name || !phone || (deliveryType === 'delivery' && !address)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const method = deliveryType === 'pickup' ? 'Самовывоз' : `Доставка по адресу: ${address}`;
    const paymentText = paymentMethod === 'cash' ? 'Оплата при получении' : 'Онлайн-оплата';

    const order = {
      date: new Date().toLocaleString(),
      name,
      phone,
      method,
      payment: paymentText,
      total: totalSum,
      items: cart.map(item => item.name + ' x' + item.qty),
    };

    await saveOrderToHistory(order);

    if (paymentMethod === 'online') {
      router.push('/PaymentWebView');
      return;
    }

    Alert.alert(
      'Спасибо за заказ!',
      `Способ: ${method}\nСумма: ${totalSum} ₽\nОплата: ${paymentText}`,
      [{ text: 'Ок', onPress: () => {
        clearCart();
        router.push('/');
      } }]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Оформление заказа</Text>

      <TextInput
        placeholder="Ваше имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Телефон"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Способ получения:</Text>
      <Picker
        selectedValue={deliveryType}
        onValueChange={setDeliveryType}
        style={styles.picker}
      >
        <Picker.Item label="Доставка" value="delivery" />
        <Picker.Item label="Самовывоз" value="pickup" />
      </Picker>

      {deliveryType === 'delivery' && (
        <TextInput
          placeholder="Адрес доставки"
          value={address}
          onChangeText={setAddress}
          multiline
          style={[styles.input, { height: 80 }]}
        />
      )}

      <Text style={styles.label}>Способ оплаты:</Text>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={setPaymentMethod}
        style={styles.picker}
      >
        <Picker.Item label="Оплата при получении" value="cash" />
        <Picker.Item label="Онлайн-оплата" value="online" />
      </Picker>

      <Text style={styles.total}>Сумма к оплате: {totalSum} ₽</Text>

      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Подтвердить заказ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#44c759',
  },
  button: {
    backgroundColor: '#e46e7c',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
