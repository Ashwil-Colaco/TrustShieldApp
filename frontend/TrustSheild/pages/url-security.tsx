import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';


export default function UrlSecurity() {
  const router = useRouter();
  const [url, setUrl] = useState('https://example-phish.com');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="#2D5BFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>URL Security</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Link <Text style={styles.heroTitleHighlight}>Analyzer</Text></Text>
          <Text style={styles.heroDescription}>
            Identify malicious redirects, phishing domains, and hidden exploits in seconds.
          </Text>
        </View>

        {/* Scanner Input Card */}
        <View style={styles.scannerCard}>
          <View style={styles.scannerHeader}>
            <Text style={styles.scannerTitle}>SCANNER INPUT</Text>
            <View style={styles.agentBadge}>
              <Text style={styles.agentBadgeText}>AI AGENT READY</Text>
            </View>
          </View>
          
          <Text style={styles.scannerDescription}>
            Paste the suspicious link below for deep neural analysis.
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons name="globe-outline" size={20} color="#2D5BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="https://example.com"
              placeholderTextColor="#6A7185"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="search-outline" size={20} color="#05050A" style={styles.scanIcon} />
            <Text style={styles.scanButtonText}>SCAN URL</Text>
          </TouchableOpacity>
        </View>

        {/* AI Analysis Vectors Section */}
        <View style={styles.vectorsHeader}>
          <MaterialCommunityIcons name="shield-check-outline" size={20} color="#2D5BFF" style={styles.vectorsIcon} />
          <Text style={styles.vectorsTitle}>AI Analysis Vectors</Text>
        </View>

        <View style={styles.vectorsList}>
          {/* Vector 1 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#2D5BFF" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorItemTitle}>SSL & Certificate Integrity</Text>
              <Text style={styles.vectorItemDesc}>
                Validates domain ownership and encryption standards to ensure safe connections.
              </Text>
            </View>
          </View>

          {/* Vector 2 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="time-outline" size={20} color="#F2994A" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorItemTitle}>Domain Age & Reputation</Text>
              <Text style={styles.vectorItemDesc}>
                Checks domain history. Freshly registered domains often host phishing sites.
              </Text>
            </View>
          </View>

          {/* Vector 3 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="flash-outline" size={20} color="#B14DFF" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorItemTitle}>Redirect Chain Analysis</Text>
              <Text style={styles.vectorItemDesc}>
                Traces the URL through every hop to find hidden malicious payloads.
              </Text>
            </View>
          </View>

          {/* Vector 4 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <View style={styles.redShield} />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorItemTitle}>Social Engineering Detection</Text>
              <Text style={styles.vectorItemDesc}>
                Analyzes URL patterns for deceptive strings like 'login-bank-secure'.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomNav activeRoute="none" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05050A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroSection: {
    marginBottom: 32,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  heroTitleHighlight: {
    color: '#2D5BFF',
  },
  heroDescription: {
    color: '#8A8D9F',
    fontSize: 15,
    lineHeight: 22,
  },
  scannerCard: {
    backgroundColor: '#0F101A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    borderTopWidth: 2,
    borderTopColor: '#2D5BFF',
    shadowColor: '#2D5BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scannerTitle: {
    color: '#2D5BFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  agentBadge: {
    backgroundColor: '#0A0A1F',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#111536',
  },
  agentBadgeText: {
    color: '#2D5BFF',
    fontSize: 10,
    fontWeight: '700',
  },
  scannerDescription: {
    color: '#8A8D9F',
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#05050A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#2D5BFF',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    color: '#05050A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  vectorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  vectorsIcon: {
    marginRight: 8,
  },
  vectorsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  vectorsList: {
    marginBottom: 20,
  },
  vectorCard: {
    flexDirection: 'row',
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  vectorIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  redShield: {
    width: 24,
    height: 24,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  vectorContent: {
    flex: 1,
  },
  vectorItemTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  vectorItemDesc: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
});
