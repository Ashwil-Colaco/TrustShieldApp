import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import BottomNav from '../components/bottom-nav';


export default function Analytics() {
  const router = useRouter();

  // Helper function to render heatmap cells
  const renderHeatmapRow = (label: string, intensities: number[]) => (
    <View style={styles.heatmapRow} key={label}>
      <Text style={styles.heatmapLabel}>{label}</Text>
      <View style={styles.heatmapCells}>
        {intensities.map((intensity, index) => {
          // Map 1-5 to opacity. Base color: #F2994A (Orange)
          const opacity = intensity * 0.2;
          return (
            <View 
              key={index} 
              style={[
                styles.heatmapCell, 
                { backgroundColor: intensity > 0 ? `rgba(242, 153, 74, ${opacity})` : '#1A1B26' }
              ]} 
            />
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBadge}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#05050A" />
            </View>
            <Text style={styles.headerTitle}>TrustShield</Text>
          </View>
          <TouchableOpacity style={styles.activityButton}>
            <Ionicons name="pulse" size={20} color="#2D5BFF" />
          </TouchableOpacity>
        </View>

        {/* Threat Ecosystem */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Threat Ecosystem</Text>
          <Text style={styles.sectionSubtitle}>Live monitoring of active network vectors</Text>
        </View>

        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View>
              <Text style={styles.graphValue}>98.2%</Text>
              <Text style={styles.graphLabel}>SAFETY INDEX</Text>
            </View>
            <View style={styles.graphStatusContainer}>
              <View style={styles.systemStableBadge}>
                <Text style={styles.systemStableText}>System Stable</Text>
              </View>
              <Text style={styles.systemId}>ID: TZ-902-ALPHA</Text>
            </View>
          </View>
          
          {/* Mock Graph Area */}
          <View style={styles.mockGraphArea}>
            {/* Grid lines */}
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            
            {/* Curvy Lines (Mocked via SVG path illustration in a real app) */}
            <View style={styles.mockLinesContainer}>
              {/* Very rough approximation using absolute positioning for points */}
              {/* Point 1 */}
              <View style={[styles.graphDot, styles.dotOrange, { bottom: 40, left: '0%' }]} />
              <View style={[styles.graphDot, styles.dotBlue, { bottom: 30, left: '0%' }]} />
              
              {/* Point 2 */}
              <View style={[styles.graphDot, styles.dotOrange, { bottom: 60, left: '16.6%' }]} />
              <View style={[styles.graphDot, styles.dotBlue, { bottom: 50, left: '16.6%' }]} />
              
              {/* Peak */}
              <View style={[styles.graphDot, styles.dotOrange, { top: 30, left: '33.3%' }]} />
              <View style={[styles.graphDot, styles.dotBlue, { top: 40, left: '33.3%' }]} />
              
              {/* Descent */}
              <View style={[styles.graphDot, styles.dotOrange, { top: 80, left: '50%' }]} />
              <View style={[styles.graphDot, styles.dotBlue, { top: 80, left: '50%' }]} />
              
              {/* Plateau */}
              <View style={[styles.graphDot, styles.dotBlue, { top: 100, left: '66.6%' }]} />
              
              {/* End */}
              <View style={[styles.graphDot, styles.dotOrange, { bottom: 50, left: '83.3%' }]} />
              <View style={[styles.graphDot, styles.dotBlue, { bottom: 40, left: '83.3%' }]} />
              
              <View style={[styles.graphDot, styles.dotBlue, { bottom: 20, right: '0%' }]} />
            </View>

            {/* X-Axis */}
            <View style={styles.xAxis}>
              <Text style={styles.axisLabel}>Tue</Text>
              <Text style={styles.axisLabel}>Wed</Text>
              <Text style={styles.axisLabel}>Thu</Text>
              <Text style={styles.axisLabel}>Fri</Text>
              <Text style={styles.axisLabel}>Sat</Text>
              <Text style={styles.axisLabel}>Sun</Text>
            </View>
          </View>
          
          <View style={styles.graphLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F2994A' }]} />
              <Text style={styles.legendText}>INCOMING THREATS</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2D5BFF' }]} />
              <Text style={styles.legendText}>NEUTRALIZED</Text>
            </View>
          </View>
        </View>

        {/* Frequency Analysis */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Frequency Analysis</Text>
          <Text style={styles.sectionSubtitle}>Heat signature of attack vectors</Text>
        </View>

        <View style={styles.heatmapCard}>
          <View style={styles.heatmapHeader}>
            <View style={styles.heatmapTitleRow}>
              <Ionicons name="trending-up" size={16} color="#F2994A" style={styles.heatmapIcon} />
              <Text style={styles.heatmapTitle}>Threat Source Intensity</Text>
            </View>
            <View style={styles.weeklyHeatBadge}>
              <Text style={styles.weeklyHeatText}>Weekly Heat</Text>
            </View>
          </View>

          <View style={styles.heatmapGrid}>
            <View style={styles.heatmapDaysRow}>
              <Text style={styles.dayLabel}>M</Text>
              <Text style={styles.dayLabel}>T</Text>
              <Text style={styles.dayLabel}>W</Text>
              <Text style={styles.dayLabel}>T</Text>
              <Text style={styles.dayLabel}>F</Text>
              <Text style={styles.dayLabel}>S</Text>
              <Text style={styles.dayLabel}>S</Text>
            </View>

            {/* Mock Data for Heatmap */}
            {renderHeatmapRow('Email', [3, 4, 3, 2, 1, 3, 4])}
            {renderHeatmapRow('Web', [1, 1, 0, 2, 4, 3, 4])}
            {renderHeatmapRow('SMS', [1, 1, 4, 3, 1, 2, 1])}
            {renderHeatmapRow('Apps', [1, 4, 3, 2, 1, 4, 3])}
          </View>

          <View style={styles.heatmapLegend}>
            <Text style={styles.heatmapLegendText}>Low Risk</Text>
            <View style={styles.intensityScale}>
              <View style={[styles.intensityBox, { backgroundColor: 'rgba(242, 153, 74, 0.2)' }]} />
              <View style={[styles.intensityBox, { backgroundColor: 'rgba(242, 153, 74, 0.4)' }]} />
              <View style={[styles.intensityBox, { backgroundColor: 'rgba(242, 153, 74, 0.6)' }]} />
              <View style={[styles.intensityBox, { backgroundColor: 'rgba(242, 153, 74, 0.8)' }]} />
              <View style={[styles.intensityBox, { backgroundColor: 'rgba(242, 153, 74, 1.0)' }]} />
            </View>
            <Text style={styles.heatmapLegendText}>Critical</Text>
          </View>
        </View>

        {/* Cyber Risk Coach */}
        <View style={styles.coachCard}>
          <View style={styles.coachHeader}>
            <View style={styles.coachAvatarContainer}>
              <View style={styles.coachAvatarBg}>
                <Ionicons name="hardware-chip-outline" size={24} color="#000" />
              </View>
              <View style={styles.coachOnlineBadge}>
                <Ionicons name="flash" size={10} color="#000" />
              </View>
            </View>
            <View>
              <Text style={styles.coachTitle}>Personal Cyber Risk Coach</Text>
              <Text style={styles.coachSubtitle}>Active Analysis: Last 24 Hours</Text>
            </View>
          </View>

          <View style={styles.coachInsightBlock}>
            <View style={styles.insightIconWrapper}>
              <MaterialCommunityIcons name="shield-alert-outline" size={18} color="#F2994A" />
            </View>
            <Text style={styles.insightText}>
              Most threats you received this week{'\n'}were <Text style={styles.orangeText}>phishing links.</Text>
            </Text>
          </View>

          <View style={styles.coachInsightBlockBlue}>
            <View style={styles.insightIconWrapper}>
              <Ionicons name="chatbubble-outline" size={18} color="#2D5BFF" />
            </View>
            <Text style={styles.insightText}>
              <Text style={styles.blueText}>70%</Text> of suspicious messages came from{'\n'}WhatsApp.
            </Text>
          </View>

          <TouchableOpacity style={styles.deepDiveButton}>
            <Text style={styles.deepDiveText}>Deep Dive Analysis</Text>
            <Ionicons name="chevron-forward" size={16} color="#05050A" />
          </TouchableOpacity>
        </View>

        {/* Pro Tip Card */}
        <View style={styles.proTipSection}>
          <View style={styles.dragHandle}>
            <MaterialCommunityIcons name="dots-grid" size={24} color="#6A7185" />
          </View>
          
          <View style={styles.awarenessCard}>
            <View style={styles.awarenessHeaderRow}>
              <View style={styles.proTipTag}>
                <Text style={styles.proTipTagText}>PRO TIP</Text>
              </View>
              <Text style={styles.awarenessHeaderTitle}>CYBER AWARENESS</Text>
            </View>
            
            <View style={styles.awarenessContentRow}>
              <View style={styles.awarenessTextContainer}>
                <Text style={styles.awarenessTitle}>Identity Spoofing Alert</Text>
                <Text style={styles.awarenessDesc}>
                  Scammers now use AI-cloned voices. Never share OTPs or wire money based on voice calls alone. Always verify through a second known channel.
                </Text>
              </View>
              <View style={styles.awarenessIconContainer}>
                <Ionicons name="information" size={24} color="#F2994A" />
              </View>
            </View>

            <View style={styles.awarenessFooter}>
              <Text style={styles.sourceText}>Source: Global Threat Intel</Text>
              <TouchableOpacity>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomNav activeRoute="analytics" />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A0A1F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#111536',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#8A8D9F',
    fontSize: 12,
  },
  graphCard: {
    backgroundColor: '#0A0A0F',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  graphValue: {
    color: '#2D5BFF',
    fontSize: 32,
    fontWeight: '800',
  },
  graphLabel: {
    color: '#8A8D9F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  graphStatusContainer: {
    alignItems: 'flex-end',
  },
  systemStableBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 8,
  },
  systemStableText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  systemId: {
    color: '#6A7185',
    fontSize: 10,
  },
  mockGraphArea: {
    height: 180,
    position: 'relative',
    marginBottom: 24,
  },
  gridLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#1C1D2A',
    borderStyle: 'dashed',
    height: 40,
  },
  mockLinesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
  },
  graphDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
  },
  dotOrange: {
    backgroundColor: '#F2994A',
    zIndex: 2,
    shadowColor: '#F2994A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  dotBlue: {
    backgroundColor: '#2D5BFF',
    zIndex: 1,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10,
  },
  axisLabel: {
    color: '#8A8D9F',
    fontSize: 10,
    fontWeight: '600',
  },
  graphLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    color: '#8A8D9F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heatmapCard: {
    backgroundColor: '#0F101A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  heatmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heatmapTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heatmapIcon: {
    marginRight: 8,
  },
  heatmapTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  weeklyHeatBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2994A',
    backgroundColor: 'rgba(242, 153, 74, 0.1)',
  },
  weeklyHeatText: {
    color: '#F2994A',
    fontSize: 10,
    fontWeight: '600',
  },
  heatmapGrid: {
    marginBottom: 20,
  },
  heatmapDaysRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dayLabel: {
    width: 30,
    textAlign: 'center',
    color: '#8A8D9F',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  heatmapLabel: {
    width: 40,
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  heatmapCells: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heatmapCell: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 4,
  },
  heatmapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heatmapLegendText: {
    color: '#8A8D9F',
    fontSize: 10,
    fontWeight: '600',
  },
  intensityScale: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  coachCard: {
    backgroundColor: '#0C2A44', // Dark blue gradient base
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#153A5A',
  },
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  coachAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  coachAvatarBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachOnlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F2994A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0C2A44',
  },
  coachTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  coachSubtitle: {
    color: '#8AB4F8',
    fontSize: 12,
  },
  coachInsightBlock: {
    flexDirection: 'row',
    backgroundColor: '#091E32',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0C3A5A',
  },
  coachInsightBlockBlue: {
    flexDirection: 'row',
    backgroundColor: '#091E32',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#0C3A5A',
  },
  insightIconWrapper: {
    marginRight: 12,
  },
  insightText: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
  orangeText: {
    color: '#F2994A',
    fontWeight: '700',
  },
  blueText: {
    color: '#2D5BFF',
    fontWeight: '700',
  },
  deepDiveButton: {
    flexDirection: 'row',
    backgroundColor: '#2CB3FF',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deepDiveText: {
    color: '#05050A',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  proTipSection: {
    marginBottom: 32,
  },
  dragHandle: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  awarenessCard: {
    backgroundColor: '#4A2300', // Dark bronze/orange background
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#663300',
  },
  awarenessHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  proTipTag: {
    backgroundColor: '#F2994A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  proTipTagText: {
    color: '#05050A',
    fontSize: 11,
    fontWeight: '800',
  },
  awarenessHeaderTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  awarenessContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  awarenessTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  awarenessTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  awarenessDesc: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 22,
  },
  awarenessIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#804000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  awarenessFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#663300',
    paddingTop: 16,
  },
  sourceText: {
    color: '#B3B3B3',
    fontSize: 12,
    fontStyle: 'italic',
  },
  learnMoreText: {
    color: '#F2994A',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 100,
  },
});
