import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ResultCardProps {
  title: string;
  data: object;
}

export default function ResultCard({ title, data }: ResultCardProps) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="checkmark-circle" size={16} color="#2D5BFF" style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowRaw(prev => !prev)}
        >
          <Text style={styles.toggleText}>{showRaw ? 'Hide JSON' : 'Raw JSON'}</Text>
          <Ionicons
            name={showRaw ? 'chevron-up' : 'chevron-down'}
            size={12}
            color="#6A7185"
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      </View>

      {showRaw && (
        <ScrollView horizontal showsHorizontalScrollIndicator style={styles.rawContainer}>
          <Text style={styles.rawText}>{JSON.stringify(data, null, 2)}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0A0A0F',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1D2A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  toggleText: {
    color: '#6A7185',
    fontSize: 11,
    fontWeight: '600',
  },
  toggleIcon: {
    marginLeft: 4,
  },
  rawContainer: {
    marginTop: 16,
    maxHeight: 200,
  },
  rawText: {
    color: '#8AB4F8',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  },
});
