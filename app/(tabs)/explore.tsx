import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { news } from '../../constants/news';

export default function ExploreScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости и советы</Text>
      <FlatList
        data={news}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/news/${item.id}`)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f2f2f2', padding: 14, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '500' }
});
