import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';
import { apiService, AnalysisResponse } from '../services/api';
import ResultCard from '../components/result-card';


export default function EmailAnalysis() {
  const router = useRouter();
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await apiService.analyzeText(emailContent);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed', error);
      // In a real app we'd show a toast or error UI here
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
            <ResultCard title="Analysis Complete" data={analysisResult} />
          )}

          <View style={styles.bottomPadding} />
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
  bottomPadding: {
    height: 100,
  },
});
