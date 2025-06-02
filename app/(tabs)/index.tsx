import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { banners } from '../../constants/banners';


export default function HomeScreen({ navigation }) {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>Невский Кондитер.ЗОЖ</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {banners.map((b, i) => (
          <Image key={i} source={b} style={styles.bannerImg} />
        ))}
      </ScrollView>

      {/* News & Tips */}
      <Text style={styles.sectionTitle}>Новости и советы</Text>
      <View style={styles.newsCard}>
        <Text style={styles.newsTitle}>ТОП-5 полезных сладостей для фигуры</Text>
      </View>
      <View style={styles.newsCard}>
        <Text style={styles.newsTitle}>Как включить сладкое в правильный рацион</Text>
      </View>

      {/* Healthy Line */}
      <Text style={styles.sectionTitle}>Рекомендуем здоровую линейку</Text>
      <View style={styles.productCard}>
        <Image style={styles.productImage} source={{ uri: 'https://via.placeholder.com/100' }} />
        <View>
          <Text style={styles.productName}>Злаковый батончик</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/catalog')}>
            <Text style={styles.buttonText}>Перейти в каталог</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  logo: { fontSize: 22, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  bannerImg: { width: 300, height: 120, borderRadius: 12, marginRight: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  newsCard: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 10, marginBottom: 8 },
  newsTitle: { fontSize: 16 },
  productCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginTop: 8 },
  productImage: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  productName: { fontSize: 16, fontWeight: '600' },
  button: { backgroundColor: '#e46e7c', borderRadius: 8, marginTop: 8, padding: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
