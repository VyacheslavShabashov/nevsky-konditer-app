
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function CalorieCalculatorScreen() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('female'); // or 'male'
  const [activity, setActivity] = useState(1.2); // sedentary by default
  const [result, setResult] = useState(null);

  function calculate() {
    if (!age || !weight || !height) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    let bmr = 0;
    if (gender === 'female') {
      bmr = 655 + 9.6 * w + 1.8 * h - 4.7 * a;
    } else {
      bmr = 66 + 13.7 * w + 5 * h - 6.8 * a;
    }

    const total = Math.round(bmr * activity);
    const protein = Math.round((total * 0.3) / 4);
    const fat = Math.round((total * 0.3) / 9);
    const carbs = Math.round((total * 0.4) / 4);

    setResult({ total, protein, fat, carbs });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Калькулятор калорий</Text>

      <TextInput
        style={styles.input}
        placeholder="Возраст (лет)"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Вес (кг)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Рост (см)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Женщина</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Мужчина</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Уровень активности:</Text>
      <View>
        <TouchableOpacity onPress={() => setActivity(1.2)}>
          <Text style={styles.option}>🔵 Минимальная (офис, нет спорта)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivity(1.375)}>
          <Text style={styles.option}>🔵 Лёгкая (1-3 тренировки в неделю)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivity(1.55)}>
          <Text style={styles.option}>🔵 Средняя (3-5 трен. в неделю)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivity(1.725)}>
          <Text style={styles.option}>🔵 Высокая (6-7 трен. в неделю)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Рассчитать</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Ваш результат:</Text>
          <Text style={styles.resultText}>Калорий в день: {result.total}</Text>
          <Text style={styles.resultText}>Белки: {result.protein} г</Text>
          <Text style={styles.resultText}>Жиры: {result.fat} г</Text>
          <Text style={styles.resultText}>Углеводы: {result.carbs} г</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#e46e7c',
  },
  genderText: {
    color: '#000',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 8,
  },
  option: {
    marginVertical: 4,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#44c759',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  result: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
  },
  resultText: { fontSize: 16, marginBottom: 4 },
});
