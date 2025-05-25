
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ProgressBarAndroid,
  Platform,
} from 'react-native';
import { useIntake } from '../contexts/IntakeContext';

export default function DayIntakeScreen() {
  const { intake, clearIntake, totals } = useIntake();

  const goal = { kcal: 2000, protein: 90, fat: 70, carbs: 250 };

  function ratio(value, max) {
    return Math.min(value / max, 1);
  }

  function clearHandler() {
    Alert.alert('Очистить рацион?', '', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Очистить', onPress: () => clearIntake() },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Рацион за день</Text>

      <FlatList
        data={intake}
        keyExtractor={item => item.id + Math.random()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>
              {item.kcal ?? '-'} ккал | Б: {item.protein ?? '-'} | Ж: {item.fat ?? '-'} | У: {item.carbs ?? '-'}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>Рацион пуст</Text>}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Итого за день:</Text>

        <ProgressItem label="Калории" value={totals.kcal} goal={goal.kcal} color="#f39c12" />
        <ProgressItem label="Белки" value={totals.protein} goal={goal.protein} color="#2980b9" />
        <ProgressItem label="Жиры" value={totals.fat} goal={goal.fat} color="#e74c3c" />
        <ProgressItem label="Углеводы" value={totals.carbs} goal={goal.carbs} color="#27ae60" />
      </View>

      <TouchableOpacity style={styles.button} onPress={clearHandler}>
        <Text style={styles.buttonText}>Очистить рацион</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProgressItem({ label, value, goal, color }) {
  const percent = Math.round((value / goal) * 100);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text>{label}: {value} / {goal} ({percent}%)</Text>
      {Platform.OS === 'android' ? (
        <ProgressBarAndroid styleAttr="Horizontal" color={color} progress={Math.min(value / goal, 1)} />
      ) : (
        <View style={{ height: 8, backgroundColor: '#eee', borderRadius: 4 }}>
          <View style={{
            height: 8,
            width: `${percent}%`,
            backgroundColor: color,
            borderRadius: 4,
          }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 14, color: '#666' },
  totalBox: {
    backgroundColor: '#fff2f2',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  totalText: { fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
  button: {
    backgroundColor: '#e46e7c',
    marginTop: 20,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
