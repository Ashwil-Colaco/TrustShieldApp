import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ResultCardProps {
  title: string;
  data: object;
  score?: number | string;
  riskLevel?: string;
  threatTypes?: string[];
  summary?: string;
  initialShowRaw?: boolean;
}

export default function ResultCard({ 
  title, 
  data, 
  score = 0, 
  riskLevel = 'Low Risk', 
  threatTypes = [],
  summary,
  initialShowRaw = false 
}: ResultCardProps) {
  const [showRaw, setShowRaw] = useState(initialShowRaw);

  const getRiskColor = () => {
    const level = riskLevel.toLowerCase();
    if (level.includes('high') || level.includes('critical')) return '#FF3B30';
    if (level.includes('medium') || level.includes('moderate')) return '#FFCC00';
    if (level.includes('low') || level.includes('safe')) return '#34C759';
    return '#8A8D9F';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Ionicons name="information-circle-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Risk Gauge Section */}
      <View style={styles.gaugeSection}>
        <View style={[styles.gaugeOuter, { borderColor: getRiskColor() + '20' }]}>
          <View style={[styles.gaugeInner, { borderColor: getRiskColor() }]}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.scoreSubtext}>OF 100</Text>
          </View>
        </View>
        
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor() + '15', borderColor: getRiskColor() + '30' }]}>
          <Text style={[styles.riskBadgeText, { color: getRiskColor() }]}>{riskLevel.toUpperCase()}</Text>
        </View>

        {/* Threat Badges */}
        {threatTypes.length > 0 && (
          <View style={styles.threatBadgeRow}>
            {threatTypes.map((threat, index) => (
              <View key={index} style={styles.threatBadge}>
                <Text style={styles.threatBadgeText}>{threat}</Text>
              </View>
            ))}
          </View>
        )}
        
        <Text style={styles.footerNote}>Scan completed by TrustShield v2.4.0-STABLE</Text>
      </View>

      {/* Executive Summary Section */}
      {summary && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryTitleRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2D5BFF" style={styles.summaryIcon} />
            <Text style={styles.summaryTitle}>Executive Summary</Text>
          </View>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}

      {/* Raw JSON Section */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowRaw(prev => !prev)}
      >
        <View style={styles.toggleLeft}>
          <MaterialCommunityIcons name="code-json" size={18} color="#6A7185" />
          <Text style={styles.toggleText}>{showRaw ? 'Hide Technical Data' : 'View Source Data'}</Text>
        </View>
        <Ionicons
          name={showRaw ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#6A7185"
        />
      </TouchableOpacity>

      {showRaw && (
        <View style={styles.rawWrapper}>
          <ScrollView style={styles.rawVerticalScroll} nestedScrollEnabled={true}>
            <ScrollView horizontal showsHorizontalScrollIndicator style={styles.rawHorizontalScroll} nestedScrollEnabled={true}>
              <Text style={styles.rawText}>{JSON.stringify(data, null, 2)}</Text>
            </ScrollView>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  gaugeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gaugeOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  gaugeInner: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  scoreText: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '900',
  },
  scoreSubtext: {
    color: '#8A8D9F',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -5,
  },
  riskBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 16,
  },
  riskBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  threatBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  threatBadge: {
    backgroundColor: '#1C1D2A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    borderWidth: 1,
    borderColor: '#2D5BFF30',
  },
  threatBadgeText: {
    color: '#8A8D9F',
    fontSize: 12,
    fontWeight: '600',
  },
  footerNote: {
    color: '#5A5E75',
    fontSize: 13,
    fontStyle: 'italic',
  },
  summaryCard: {
    backgroundColor: '#0A0A0F',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryIcon: {
    marginRight: 10,
  },
  summaryTitle: {
    color: '#2D5BFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  summaryText: {
    color: '#D0D3E8',
    fontSize: 14,
    lineHeight: 22,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    color: '#6A7185',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },
  rawWrapper: {
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#05050A',
    borderWidth: 1,
    borderColor: '#1C1D2A',
    overflow: 'hidden',
    marginBottom: 30,
  },
  rawVerticalScroll: {
    maxHeight: 300,
  },
  rawHorizontalScroll: {
    padding: 12,
  },
  rawText: {
    color: '#8AB4F8',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  },
});
