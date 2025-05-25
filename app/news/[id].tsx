import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { news } from '../../constants/news';  // Подключаем новости

export default function NewsScreen() {
  const { id } = useLocalSearchParams();
  const item = news.find((n) => n.id === id);  // Находим нужную новость по id

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Новость не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, color: '#666' },
});
