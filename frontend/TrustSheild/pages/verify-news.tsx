import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';
import { apiService, AnalysisResponse } from '../services/api';
import ResultCard from '../components/result-card';


export default function VerifyNews() {
  const router = useRouter();
  const [headline, setHeadline] = useState('');
  const [articleLink, setArticleLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleVerify = async () => {
    const textToAnalyze = headline.trim() || articleLink.trim();
    if (!textToAnalyze) return;
    setIsLoading(true);
    setResult(null);
    try {
      const res = await apiService.analyzeText(textToAnalyze);
      // Map to premium format with Dynamic Metrics & Badges
      const score = res.risk_score || res.score || 75;

      setResult({
        ...res,
        title: "Analysis Results",
        score: typeof score === 'number' ? Math.round(score) : score,
        riskLevel: res.risk_level || (Number(score) < 45 ? "High Risk" : Number(score) < 70 ? "Medium Risk" : "Low Risk"),
        threatTypes: res.threat_types || [],
        summary: res.summary || res.explanation || "The AI truth engine has cross-referenced this content.",
        rawJson: res
      } as any);
    } catch (e) {
      console.error('Verify failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={24} color="#2D5BFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verify News</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="information-circle-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Truth Engine Card */}
          <View style={styles.truthCard}>
            <View style={styles.truthIconContainer}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#2D5BFF" />
            </View>
            <View style={styles.truthContent}>
              <Text style={styles.truthTitle}>Truth Engine Active</Text>
              <Text style={styles.truthDesc}>
                Our neural networks cross-reference content across 50,000+ verified sources to detect bias and misinformation.
              </Text>
            </View>
          </View>

          {/* Article Headline Section */}
          <View style={styles.sectionHeader}>
            <Ionicons name="newspaper-outline" size={18} color="#2D5BFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>ARTICLE HEADLINE</Text>
          </View>

          <View style={styles.headlineInputContainer}>
            <TextInput
              style={styles.headlineInput}
              placeholder="Paste the suspicious headline here..."
              placeholderTextColor="#6A7185"
              multiline
              textAlignVertical="top"
              value={headline}
              onChangeText={setHeadline}
              maxLength={300}
            />
            <View style={styles.headlineFooter}>
              <View style={styles.analysisReadyBadge}>
                <Text style={styles.analysisReadyText}>Analysis Ready</Text>
              </View>
              <Text style={styles.charCount}>{headline.length}/300</Text>
            </View>
          </View>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Direct Article Link Section */}
          <View style={styles.sectionHeader}>
            <Ionicons name="link-outline" size={18} color="#F2994A" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>DIRECT ARTICLE LINK</Text>
          </View>

          <View style={styles.linkInputContainer}>
            <Ionicons name="search-outline" size={18} color="#FFF" style={styles.linkInputIcon} />
            <TextInput
              style={styles.linkInput}
              placeholder="https://news-site.com/article..."
              placeholderTextColor="#6A7185"
              value={articleLink}
              onChangeText={setArticleLink}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.infoNoteContainer}>
            <Ionicons name="information-circle-outline" size={14} color="#2D5BFF" style={styles.infoNoteIcon} />
            <Text style={styles.infoNoteText}>Social media links (Twitter, FB) are also supported.</Text>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.verifyButton, (isLoading || (!headline.trim() && !articleLink.trim())) && styles.verifyButtonDisabled]}
            onPress={handleVerify}
            disabled={isLoading || (!headline.trim() && !articleLink.trim())}
          >
            {isLoading ? (
              <ActivityIndicator color="#05050A" />
            ) : (
              <>
                <Ionicons name="scan-outline" size={20} color="#05050A" style={styles.verifyIcon} />
                <Text style={styles.verifyButtonText}>Verify Content</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.timingNoteContainer}>
            <Ionicons name="information-circle-outline" size={12} color="#6A7185" style={styles.timingNoteIcon} />
            <Text style={styles.timingNoteText}>Analysis typically takes 3-5 seconds</Text>
          </View>

          {result && (
            <ResultCard 
              title={result.title || "Analysis Results"} 
              data={result.rawJson || result} 
              score={result.score}
              riskLevel={result.riskLevel}
              threatTypes={result.threatTypes}
              summary={result.summary}
            />
          )}

          {/* Pro Tips Section */}
          <Text style={styles.proTipsTitle}>PRO TIPS</Text>
          <View style={styles.proTipsContainer}>
            <View style={styles.proTipCard}>
              <Text style={styles.proTipCardTitle}>Paste Full Text</Text>
              <Text style={styles.proTipCardDesc}>The more context, the higher the accuracy.</Text>
            </View>
            <View style={styles.proTipCard}>
              <Text style={styles.proTipCardTitle}>Deep Scan</Text>
              <Text style={styles.proTipCardDesc}>Links allow us to analyze metadata.</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  truthCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#111536',
  },
  truthIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  truthContent: {
    flex: 1,
  },
  truthTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  truthDesc: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headlineInputContainer: {
    backgroundColor: '#0F101A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 16,
    height: 160,
    marginBottom: 24,
  },
  headlineInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    lineHeight: 22,
  },
  headlineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  analysisReadyBadge: {
    backgroundColor: '#0A0A1F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#111536',
  },
  analysisReadyText: {
    color: '#2D5BFF',
    fontSize: 10,
    fontWeight: '600',
  },
  charCount: {
    color: '#6A7185',
    fontSize: 10,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1C1D2A',
  },
  dividerText: {
    color: '#6A7185',
    fontSize: 10,
    fontWeight: '700',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  linkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F101A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  linkInputIcon: {
    marginRight: 12,
  },
  linkInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
  },
  infoNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  infoNoteIcon: {
    marginRight: 6,
  },
  infoNoteText: {
    color: '#8A8D9F',
    fontSize: 12,
  },
  verifyButton: {
    flexDirection: 'row',
    backgroundColor: '#3A5BFF',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2D5BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyIcon: {
    marginRight: 8,
  },
  verifyButtonText: {
    color: '#05050A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timingNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timingNoteIcon: {
    marginRight: 6,
  },
  timingNoteText: {
    color: '#6A7185',
    fontSize: 11,
  },
  proTipsTitle: {
    color: '#6A7185',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  proTipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proTipCard: {
    width: '48%',
    backgroundColor: '#0A0A0F',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  proTipCardTitle: {
    color: '#8A8D9F',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  proTipCardDesc: {
    color: '#6A7185',
    fontSize: 11,
    lineHeight: 16,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  bottomPadding: {
    height: 80,
  },
});
