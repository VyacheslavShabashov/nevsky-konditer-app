
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { products } from '../../constants/products';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderIndex = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const banners = [
    {
      id: 1,
      image: 'https://cdn-icons-png.flaticon.com/512/2909/2909765.png',
      title: 'Читайте советы и статьи',
      subtitle: 'Здоровое питание каждый день',
      route: '/explore',
    },
    {
      id: 2,
      image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
      title: '🔥 АКЦИЯ: -20% на батончики!',
      subtitle: 'До конца недели',
      route: '/catalog',
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (sliderIndex.current + 1) % banners.length;
      sliderIndex.current = nextIndex;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.welcomeText}>🎯 Добро пожаловать в Невский Кондитер</Text>

      <View style={styles.sliderBox}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: event => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / width);
                setCurrentIndex(index);
                sliderIndex.current = index;
              },
            }
          )}
          scrollEventThrottle={16}
        >
          {banners.map((banner, index) => (
            <TouchableOpacity
              key={index}
              style={styles.bannerSlide}
              onPress={() => router.push(banner.route)}
            >
              <Image source={{ uri: banner.image }} style={styles.bannerImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>{banner.title}</Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.dots}>
          {banners.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.linkCard} onPress={() => router.push('/catalog')}>
          <Text style={styles.linkText}>Каталог</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkCard} onPress={() => router.push('/favorites')}>
          <Text style={styles.linkText}>Избранное</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkCard} onPress={() => router.push('/smart-cart')}>
          <Text style={styles.linkText}>Корзина</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Новинки</Text>
      <FlatList
        horizontal
        data={newProducts}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff8f5',
  },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logoImage: { width: 200, height: 200, resizeMode: 'contain' },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  sliderBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingBottom: 8,
    marginBottom: 16,
  },
  slider: {},
  bannerSlide: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    width: width - 32,
    padding: 12,
    marginRight: 16,
    alignItems: 'center',
  },
  bannerImage: { width: 60, height: 60, marginRight: 12 },
  bannerTitle: { fontSize: 16, fontWeight: 'bold' },
  bannerSubtitle: { fontSize: 14, color: '#555' },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotActive: { backgroundColor: '#e46e7c' },
  dotInactive: { backgroundColor: '#ccc' },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  linkCard: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  linkText: { fontWeight: 'bold', fontSize: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 8,
  },
  productCard: {
    width: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 6,
  },
  productName: { fontSize: 14, textAlign: 'center' },
});
