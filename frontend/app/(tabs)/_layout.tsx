import { BottomBar } from '@/components/BottomBar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "home-variant" : "home-variant-outline"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "chart-timeline-variant" : "chart-timeline"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account" : "account-outline"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="url-security"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="deepfake"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="verify-news"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="email-analysis"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide explore tab as per design request for specific pages
        }}
      />
    </Tabs>
  );
}
