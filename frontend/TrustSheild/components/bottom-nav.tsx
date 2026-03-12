import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface BottomNavProps {
  activeRoute: 'home' | 'analytics' | 'account' | 'none';
}

export default function BottomNav({ activeRoute }: BottomNavProps) {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => activeRoute !== 'home' && router.push('/')}
      >
        <Ionicons 
          name={activeRoute === 'home' ? 'home' : 'home-outline'} 
          size={24} 
          color={activeRoute === 'home' ? '#2D5BFF' : '#6A7185'} 
        />
        <Text style={[styles.navText, activeRoute === 'home' && styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => activeRoute !== 'analytics' && router.push('/analytics')}
      >
        <Ionicons 
          name={activeRoute === 'analytics' ? 'stats-chart' : 'stats-chart-outline'} 
          size={24} 
          color={activeRoute === 'analytics' ? '#2D5BFF' : '#6A7185'} 
        />
        <Text style={[styles.navText, activeRoute === 'analytics' && styles.activeNavText]}>Analytics</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => activeRoute !== 'account' && router.push('/account')}
      >
        <Ionicons 
          name={activeRoute === 'account' ? 'person' : 'person-outline'} 
          size={24} 
          color={activeRoute === 'account' ? '#2D5BFF' : '#6A7185'} 
        />
        <Text style={[styles.navText, activeRoute === 'account' && styles.activeNavText]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#05050A',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A24',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#6A7185',
  },
  activeNavText: {
    color: '#2D5BFF',
  },
});
