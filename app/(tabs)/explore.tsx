
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { news } from '../../constants/news'; // подключаем новости

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости и Советы</Text>

      <FlatList
        data={news}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/news/${item.id}`)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
              <Text style={styles.link}>Читать далее</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  cardText: { fontSize: 14, color: '#666' },
  link: { color: '#e46e7c', marginTop: 8, fontWeight: 'bold' },
});
