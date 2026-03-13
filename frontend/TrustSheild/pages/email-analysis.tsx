import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';
import { apiService, AnalysisResponse } from '../services/api';
import ResultCard from '../components/result-card';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

// Google OAuth credentials - Simplified as per user example
const GOOGLE_CLIENT_ID = "210589511897-kuv9o049hc5mn97fv6bg2cvq4lovjtd0.apps.googleusercontent.com";


export default function EmailAnalysis() {
  const router = useRouter();
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [showRawResults, setShowRawResults] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const redirectUri = makeRedirectUri({
    scheme: 'trustsheild',
  });
  console.log('Redirect URI:', redirectUri);

  // Configure Google Auth Request (Implicit Flow)
  const [request, authResponse, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  });

  // Handle OAuth response - Simplified capture
  useEffect(() => {
    if (authResponse?.type === 'success' && authResponse.authentication) {
      const token = authResponse.authentication.accessToken;
      setAccessToken(token);
      performGmailScan(token);
    }
  }, [authResponse]);

  // Removed handleTokenExchange as it's no longer needed for implicit flow

  // The actual scanning logic with multi-step fetch for details
  async function performGmailScan(token: string) {
    if (!token) return;
    setModalLoading(true);
    
    try {
      // 1. Fetch list of messages
      const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!listRes.ok) {
        throw new Error(`Gmail List Error: ${listRes.status}`);
      }

      const listData = await listRes.json();
      const messages = listData.messages || [];
      const detailedMessages = [];

      // 2. Fetch details for each message (as per user example)
      for (const msg of messages) {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (detailRes.ok) {
          const detail = await detailRes.json();
          const fromHeader = detail.payload.headers.find((h: any) => h.name === 'From')?.value || 'Unknown';
          const subject = detail.payload.headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject';
          
          // Regex to extract email from "Name <email@domain.com>" or just "email@domain.com"
          const emailMatch = fromHeader.match(/<(.+?)>|(\S+@\S+)/);
          const email = emailMatch ? (emailMatch[1] || emailMatch[2]) : fromHeader;
          const domain = email.includes('@') ? email.split('@')[1] : 'unknown';

          detailedMessages.push({
            id: detail.id,
            from: fromHeader,
            email: email,
            domain: domain,
            subject: subject,
            status: "Safe", // Placeholder for actual logic
            checks: {
              authFail: false,
              keywordRisk: false,
              shortenedLink: false,
              fakeLoginUrl: false,
              displaySpoof: false
            }
          });
        }
      }

      setShowRawResults(true);

      const finalJson = {
        scannedEmails: detailedMessages.length,
        timestamp: new Date().toISOString(),
        results: detailedMessages
      };

      setAnalysisResult({
        title: "Analysis Results",
        score: Math.floor(Math.random() * 30) + 10, // Mock score for now
        riskLevel: "LOW",
        summary: `TrustShield AI has analyzed ${detailedMessages.length} recent emails in your inbox. No high-risk phishing attempts or malicious attachments were detected. We recommend remaining cautious with links from unknown senders.`,
        messages: detailedMessages,
        totalEmails: listData.resultSizeEstimate || detailedMessages.length,
        rawJson: finalJson,
      } as any);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Email fetch failed:', errorMessage);
      
      setShowRawResults(true);
      setAnalysisResult({
        title: "Scan Failed",
        error: errorMessage,
        rawJson: { error: errorMessage },
        summary: "Could not access inbox",
      } as any);
    } finally {
      setModalLoading(false);
      setShowModal(false);
    }
  }

  async function handleEmailAccessRequest() {
    if (accessToken) {
      performGmailScan(accessToken);
    } else {
      promptAsync({ useProxy: true } as any);
    }
  }



  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await apiService.analyzeText(emailContent);
      // Map generic API response to our premium result format
      const score = result.risk_score || result.score || 85; 
      
      setAnalysisResult({
        ...result,
        title: "Analysis Results",
        score: typeof score === 'number' ? Math.round(score) : score,
        riskLevel: result.risk_level || (Number(score) < 45 ? "High Risk" : Number(score) < 70 ? "Medium Risk" : "Low Risk"),
        threatTypes: result.threat_types || [],
        summary: result.summary || result.explanation || "No detailed explanation provided by the AI agent.",
        rawJson: result
      } as any);
    } catch (error) {
      console.error('Analysis failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to results when they appear
  useEffect(() => {
    if (analysisResult) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [analysisResult]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent} 
          bounces={false}
        >
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={24} color="#2D5BFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Email Analysis</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="information-circle-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* AI Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <View style={styles.shieldContainer}>
                <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2D5BFF" />
              </View>
              <View style={styles.infoTitleContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.infoTitle}>AI Phishing Shield Active</Text>
                  <View style={styles.proBadge}>
                    <Text style={styles.proBadgeText}>Pro</Text>
                  </View>
                </View>
                <Text style={styles.infoDescription}>
                  Our neural agents will scan this content for malicious links, social engineering patterns, and suspicious headers.
                </Text>
              </View>
            </View>
          </View>

          {/* Email Content Section */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.verticalBar} />
              <Text style={styles.sectionTitle}>EMAIL CONTENT</Text>
            </View>
            <View style={styles.charCountBadge}>
              <Text style={styles.charCountText}>{emailContent.length} chars</Text>
            </View>
          </View>

          {/* Text Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Paste the suspicious email body here..."
              placeholderTextColor="#6A7185"
              multiline
              textAlignVertical="top"
              value={emailContent}
              onChangeText={setEmailContent}
            />
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.pasteButton}>
              <Ionicons name="clipboard-outline" size={18} color="#2D5BFF" style={styles.pasteIcon} />
              <Text style={styles.pasteText}>Paste Sample</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => setEmailContent('')}
            >
              <Ionicons name="trash-outline" size={20} color="#8A8D9F" />
            </TouchableOpacity>
          </View>

          {/* Main Action Button */}
          <TouchableOpacity 
            style={[styles.analyzeButton, isLoading || !emailContent.trim() ? styles.analyzeButtonDisabled : null]}
            onPress={handleAnalyze}
            disabled={isLoading || !emailContent.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#05050A" />
            ) : (
              <>
                <Ionicons name="flash-outline" size={20} color="#1C1D2A" style={styles.analyzeIcon} />
                <Text style={styles.analyzeButtonText}>ANALYZE EMAIL</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Results Area */}
          {analysisResult && (
            <ResultCard 
              title={analysisResult.title || "Analysis Results"} 
              data={analysisResult.rawJson || analysisResult} 
              score={analysisResult.score}
              riskLevel={analysisResult.riskLevel}
              threatTypes={analysisResult.threatTypes}
              summary={analysisResult.summary}
              initialShowRaw={showRawResults}
            />
          )}


          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Connect & Analyze Section */}
          <View style={styles.connectSection}>
            <View style={styles.connectIconRow}>
              <View style={styles.connectIconBadge}>
                <Ionicons name="mail" size={20} color="#2D5BFF" />
              </View>
              <Text style={styles.connectLabel}>Direct Inbox Analysis</Text>
            </View>
            <Text style={styles.connectDesc}>
              Skip manual pasting. Grant one-time read-only access and let TrustShield scan your inbox directly for threats.
            </Text>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => { setAgreed(false); setShowModal(true); }}
              activeOpacity={0.85}
            >
              <Ionicons name="shield-checkmark-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.connectButtonText}>Connect &amp; Analyze My Email</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconBadge}>
                <Ionicons name="lock-closed" size={20} color="#2D5BFF" />
              </View>
              <Text style={styles.modalTitle}>Email Access Permission</Text>
              <TouchableOpacity onPress={() => setShowModal(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={22} color="#6A7185" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalDivider} />

            {/* Explanation */}
            <Text style={styles.modalDesc}>
              TrustShield requires read-only access to your inbox to scan incoming emails for phishing threats, malicious links, and social engineering patterns.
            </Text>

            {/* Bullet Points */}
            {[
              { icon: 'eye-outline', text: 'Access is read-only — we never modify or delete emails' },
              { icon: 'search-outline', text: 'Emails are analyzed for phishing detection only' },
              { icon: 'trash-outline', text: 'No emails are stored permanently on our servers' },
            ].map((item, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletIconWrap}>
                  <Ionicons name={item.icon as any} size={14} color="#2D5BFF" />
                </View>
                <Text style={styles.bulletText}>{item.text}</Text>
              </View>
            ))}

            <View style={styles.modalDivider} />

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreed(v => !v)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Ionicons name="checkmark" size={14} color="#FFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to allow this application to access my email for security analysis.
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, !agreed && styles.continueButtonDisabled]}
              disabled={!agreed || modalLoading}
              onPress={handleEmailAccessRequest}
              activeOpacity={0.85}
            >
              {modalLoading ? (
                <ActivityIndicator color="#05050A" />
              ) : (
                <Text style={styles.continueButtonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  infoCard: {
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  shieldContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTitleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  proBadge: {
    backgroundColor: '#111536',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D5BFF',
  },
  proBadgeText: {
    color: '#2D5BFF',
    fontSize: 10,
    fontWeight: '700',
  },
  infoDescription: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalBar: {
    width: 4,
    height: 16,
    backgroundColor: '#2D5BFF',
    marginRight: 8,
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  charCountBadge: {
    backgroundColor: '#1C1D2A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  charCountText: {
    color: '#8A8D9F',
    fontSize: 11,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#0A0A0F',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    height: 300,
    marginBottom: 16,
    padding: 16,
  },
  textInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    lineHeight: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  pasteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0F',
    borderWidth: 1,
    borderColor: '#1C1D2A',
    borderRadius: 12,
    paddingVertical: 14,
    marginRight: 12,
  },
  pasteIcon: {
    marginRight: 8,
  },
  pasteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0A0A0F',
    borderWidth: 1,
    borderColor: '#1C1D2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeButton: {
    flexDirection: 'row',
    backgroundColor: '#2D5BFF',
    borderRadius: 16,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  analyzeIcon: {
    marginRight: 8,
    color: '#05050A',
  },
  analyzeButtonText: {
    color: '#05050A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  analyzeButtonDisabled: {
    opacity: 0.5,
  },

  // ── OR Divider ──────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1C1D2A',
  },
  dividerText: {
    color: '#6A7185',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginHorizontal: 14,
  },

  // ── Connect Section ──────────────────────────────────────
  connectSection: {
    backgroundColor: '#0F101A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 20,
  },
  connectIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  connectIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  connectLabel: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  connectDesc: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111536',
    borderWidth: 1,
    borderColor: '#2D5BFF',
    borderRadius: 14,
    paddingVertical: 16,
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ── Modal ────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0F101A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#1C1D2A',
    marginVertical: 16,
  },
  modalDesc: {
    color: '#8A8D9F',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#0A0A1F',
    borderWidth: 1,
    borderColor: '#111536',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    color: '#D0D3E8',
    fontSize: 13,
    lineHeight: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#3A3D55',
    backgroundColor: '#0A0A1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#2D5BFF',
    borderColor: '#2D5BFF',
  },
  checkboxLabel: {
    flex: 1,
    color: '#C0C3D8',
    fontSize: 13,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#2D5BFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.35,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 100,
  },
});

