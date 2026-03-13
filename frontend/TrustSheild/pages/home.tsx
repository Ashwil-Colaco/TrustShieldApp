import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';
import NotificationBell from '../components/notification-bell';
import * as WebBrowser from 'expo-web-browser';
import { useScreenshotMonitor } from '../hooks/use-screenshot-monitor';
import { Modal } from 'react-native';


export default function Home() {
  const router = useRouter();
  const { 
    isMonitoring, 
    setIsMonitoring,
    hasDetected
  } = useScreenshotMonitor();

  const [showConsentModal, setShowConsentModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleToggleMonitoring = () => {
    if (!isMonitoring && !agreedToTerms) {
      setShowConsentModal(true);
      return;
    }
    setIsMonitoring(!isMonitoring);
  };

  const handleEnableDetection = () => {
    if (agreedToTerms) {
      setIsMonitoring(true);
      setShowConsentModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoGroup}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="shield-outline" size={24} color="#000" />
            </View>
            <Text style={styles.logoText}>TrustShield</Text>
          </View>
          <NotificationBell />
        </View>

        {/* System Status Banner */}
        <View style={styles.statusBanner}>
          <MaterialCommunityIcons name="circle-slice-8" size={14} color="#0A1E3F" style={styles.statusIcon} />
          <Text style={styles.statusText}>SYSTEM STATUS: OPTIMAL PROTECTION</Text>
        </View>

        {/* Screenshot Monitor Toggle */}
        <TouchableOpacity 
          style={[
            styles.monitorBanner, 
            isMonitoring && styles.monitorBannerActive,
            hasDetected && styles.monitorBannerDetected
          ]}
          onPress={handleToggleMonitoring}
        >
          <View style={[styles.monitorIconContainer, hasDetected && styles.iconContainerDetected]}>
            <Ionicons 
              name={hasDetected ? "shield-checkmark" : (isMonitoring ? "eye" : "eye-off")} 
              size={18} 
              color={hasDetected ? "#34C759" : (isMonitoring ? "#FFF" : "#6A7185")} 
            />
          </View>
          <View style={styles.monitorContent}>
            <Text style={[
              styles.monitorTitle, 
              isMonitoring && styles.monitorTitleActive,
              hasDetected && styles.monitorTitleDetected
            ]}>
              {hasDetected ? "SHIELD TRIGGERED" : (isMonitoring ? "Screenshot Shield Active" : "Enable Screenshot Shield")}
            </Text>
            <Text style={styles.monitorDesc}>
              {hasDetected ? "Security analysis starting..." : (isMonitoring ? "Detecting screenshots in background..." : "Tap to setup automated phishing detection.")}
            </Text>
          </View>
          <View style={[
            styles.statusDot, 
            isMonitoring && styles.statusDotActive,
            hasDetected && styles.statusDotDetected
          ]} />
        </TouchableOpacity>

        {/* Grid Container */}
        <View style={styles.gridContainer}>
          {/* Card 1 */}
          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/email-analysis' as any)}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={20} color="#2D5BFF" />
              </View>
              <View style={styles.aiReadyBadge}>
                <View style={styles.blueDot} />
                <Text style={styles.aiReadyText}>AI READY</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Phishing Email</Text>
            <Text style={styles.cardSubtitle}>Email Analysis</Text>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/url-security' as any)}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="link-outline" size={20} color="#2D5BFF" />
              </View>
              <View style={styles.aiReadyBadge}>
                <View style={styles.blueDot} />
                <Text style={styles.aiReadyText}>AI READY</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>URL Scanner</Text>
            <Text style={styles.cardSubtitle}>Web Security</Text>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/deepfake-detector' as any)}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="videocam-outline" size={20} color="#2D5BFF" />
              </View>
              <View style={styles.aiReadyBadge}>
                <View style={styles.blueDot} />
                <Text style={styles.aiReadyText}>AI READY</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Deepfake AI</Text>
            <Text style={styles.cardSubtitle}>Media Verify</Text>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/verify-news' as any)}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="newspaper-outline" size={20} color="#2D5BFF" />
              </View>
              <View style={styles.aiReadyBadge}>
                <View style={styles.blueDot} />
                <Text style={styles.aiReadyText}>AI READY</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Fake News</Text>
            <Text style={styles.cardSubtitle}>Fact Checker</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All {'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {/* Activity 1 */}
          <View style={styles.activityCard}>
            <View style={[styles.activityIconContainer, { borderColor: '#4A1D1D' }]}>
              <Ionicons name="warning-outline" size={20} color="#FF3B30" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>URL Scan</Text>
              <Text style={styles.activitySubtitle} numberOfLines={1}>https://secure-bank.logi...</Text>
            </View>
            <View style={styles.activityStatus}>
              <Text style={[styles.statusBadgeText, { color: '#FF3B30' }]}>FLAGGED</Text>
              <Text style={styles.timeText}>2m ago</Text>
            </View>
          </View>

          {/* Activity 2 */}
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#FFF" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Deepfake Analysis</Text>
              <Text style={styles.activitySubtitle} numberOfLines={1}>video_payload_01.mp...</Text>
            </View>
            <View style={styles.activityStatus}>
              <Text style={styles.statusBadgeText}>VERIFIED</Text>
              <Text style={styles.timeText}>15m ago</Text>
            </View>
          </View>

          {/* Activity 3 */}
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#FFF" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Email Check</Text>
              <Text style={styles.activitySubtitle} numberOfLines={1}>Support Ticket #928...</Text>
            </View>
            <View style={styles.activityStatus}>
              <Text style={styles.statusBadgeText}>VERIFIED</Text>
              <Text style={styles.timeText}>1h ago</Text>
            </View>
          </View>
        </View>

        {/* Breach Protection Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Breach Protection</Text>
        </View>
        <TouchableOpacity 
          style={styles.breachCard}
          onPress={() => WebBrowser.openBrowserAsync('https://haveibeenpwned.com/')}
        >
          <View style={styles.breachIconContainer}>
            <MaterialCommunityIcons name="database-search-outline" size={24} color="#FF3B30" />
          </View>
          <View style={styles.breachContent}>
            <Text style={styles.breachTitle}>Has your data been leaked?</Text>
            <Text style={styles.breachDesc}>
              Check if your email or phone is in a data breach using 'Have I Been Pwned'.
            </Text>
            <View style={styles.checkNowLink}>
              <Text style={styles.checkNowText}>Check Now</Text>
              <Ionicons name="arrow-forward" size={14} color="#2D5BFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Security Insights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Security Insights</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightsScroll}>
          {/* Insight 1 */}
          <View style={styles.insightCard}>
            <View style={[styles.insightImagePlaceholder, { backgroundColor: '#879EB8' }]}>
              <View style={[styles.insightBadge, { backgroundColor: '#FF8A8A' }]}>
                <Text style={styles.insightBadgeText}>Alert</Text>
              </View>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>New Phishing Wave</Text>
              <Text style={styles.insightDesc} numberOfLines={2}>Latest security measures shared by our AI research labs...</Text>
            </View>
          </View>

          {/* Insight 2 */}
          <View style={styles.insightCard}>
            <View style={[styles.insightImagePlaceholder, { backgroundColor: '#5A6C57' }]}>
              <View style={[styles.insightBadge, { backgroundColor: '#2D5BFF' }]}>
                <Text style={styles.insightBadgeText}>Blog</Text>
              </View>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>AI Ethics in 2024</Text>
              <Text style={styles.insightDesc} numberOfLines={2}>Latest security measures shared by our AI research labs...</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomNav activeRoute="home" />

      {/* Screenshot Shield Consent Modal */}
      <Modal
        visible={showConsentModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.consentCard}>
            <View style={styles.consentHeader}>
              <View style={styles.shieldDecoration}>
                <Ionicons name="shield-checkmark" size={32} color="#2D5BFF" />
              </View>
              <Text style={styles.consentTitle}>Activate Shield</Text>
            </View>
            
            <Text style={styles.consentDesc}>
              TrustShield can detect when you take screenshots so it can help you analyze suspicious messages or links instantly.
            </Text>

            <View style={styles.tcContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <Ionicons 
                  name={agreedToTerms ? "checkbox" : "square-outline"} 
                  size={20} 
                  color={agreedToTerms ? "#2D5BFF" : "#6A7185"} 
                />
              </TouchableOpacity>
              <Text style={styles.tcText}>
                I agree to the <Text style={styles.tcLink}>Terms & Conditions</Text> for automated monitoring.
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.enableBtn, !agreedToTerms && styles.enableBtnDisabled]}
              onPress={handleEnableDetection}
              disabled={!agreedToTerms}
            >
              <Text style={styles.enableBtnText}>Enable Screenshot Detection</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={() => setShowConsentModal(false)}
            >
              <Text style={styles.cancelBtnText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05050A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0A0A1F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiReadyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2D5BFF',
    marginRight: 4,
  },
  aiReadyText: {
    color: '#6A7185',
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#8A8D9F',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    color: '#2D5BFF',
    fontSize: 14,
    fontWeight: '500',
  },
  activityList: {
    marginBottom: 32,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2C3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  activitySubtitle: {
    color: '#8A8D9F',
    fontSize: 12,
  },
  activityStatus: {
    alignItems: 'flex-end',
  },
  statusBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  timeText: {
    color: '#6A7185',
    fontSize: 11,
  },
  insightsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  insightCard: {
    width: 280,
    backgroundColor: '#0F101A',
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    overflow: 'hidden',
  },
  insightImagePlaceholder: {
    height: 140,
    width: '100%',
    padding: 12,
  },
  insightBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  insightContent: {
    padding: 16,
  },
  insightTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  insightDesc: {
    color: '#8A8D9F',
    fontSize: 12,
    lineHeight: 18,
  },
  breachCard: {
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    flexDirection: 'row',
    alignItems: 'center',
  },
  breachIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1E1010',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#4A1D1D30',
  },
  breachContent: {
    flex: 1,
  },
  breachTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  breachDesc: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  checkNowLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkNowText: {
    color: '#2D5BFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  monitorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  monitorBannerActive: {
    borderColor: '#2D5BFF',
    backgroundColor: '#0F1530',
  },
  monitorBannerDetected: {
    borderColor: '#34C759',
    backgroundColor: '#0A1A10',
  },
  monitorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#151622',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerDetected: {
    backgroundColor: '#102A18',
  },
  monitorContent: {
    flex: 1,
  },
  monitorTitle: {
    color: '#6A7185',
    fontSize: 14,
    fontWeight: '700',
  },
  monitorTitleActive: {
    color: '#FFF',
  },
  monitorTitleDetected: {
    color: '#34C759',
  },
  monitorDesc: {
    color: '#8A8D9F',
    fontSize: 11,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6A7185',
    marginLeft: 10,
  },
  statusDotActive: {
    backgroundColor: '#34C759',
    shadowColor: '#34C759',
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  statusDotDetected: {
    backgroundColor: '#34C759',
    transform: [{ scale: 1.5 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  consentCard: {
    width: '100%',
    backgroundColor: '#0F101A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  consentHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  shieldDecoration: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0A0A1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2D5BFF30',
  },
  consentTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  consentDesc: {
    color: '#8A8D9F',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  tcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#0A0A0F',
    padding: 12,
    borderRadius: 12,
  },
  checkbox: {
    marginRight: 10,
  },
  tcText: {
    color: '#FFF',
    fontSize: 12,
    flex: 1,
  },
  tcLink: {
    color: '#2D5BFF',
    fontWeight: '700',
  },
  enableBtn: {
    backgroundColor: '#2D5BFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  enableBtnDisabled: {
    backgroundColor: '#1C1D2A',
    opacity: 0.5,
  },
  enableBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#6A7185',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
