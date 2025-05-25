
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Новости',
          tabBarIcon: ({ color }) => <Ionicons name="newspaper" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="smart-cart"
        options={{
          title: 'Корзина',
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="day-intake"
        options={{
          title: 'Рацион',
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calorie-calculator"
        options={{
          title: 'Калькулятор',
          tabBarIcon: ({ color }) => <Ionicons name="calculator" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
