import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/bottom-nav';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { apiService, AnalysisResponse } from '../services/api';
import ResultCard from '../components/result-card';


export default function DeepfakeDetector() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'video' | 'image' | 'audio'>('video');
  const [selectedFile, setSelectedFile] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleBrowse = async () => {
    setResult(null);
    setSelectedFile(null);
    if (activeTab === 'image') {
      const picked = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
      if (!picked.canceled && picked.assets[0]) {
        const asset = picked.assets[0];
        setSelectedFile({ uri: asset.uri, name: asset.fileName ?? 'image.jpg', type: asset.mimeType ?? 'image/jpeg' });
      }
    } else if (activeTab === 'video') {
      const picked = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
      if (!picked.canceled && picked.assets[0]) {
        const asset = picked.assets[0];
        setSelectedFile({ uri: asset.uri, name: asset.fileName ?? 'video.mp4', type: asset.mimeType ?? 'video/mp4' });
      }
    } else {
      const picked = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      if (!picked.canceled && picked.assets[0]) {
        const asset = picked.assets[0];
        setSelectedFile({ uri: asset.uri, name: asset.name, type: asset.mimeType ?? 'audio/m4a' });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResult(null);
    try {
      let res: AnalysisResponse;
      if (activeTab === 'image') {
        res = await apiService.analyzeImage(selectedFile.uri, selectedFile.name, selectedFile.type);
      } else if (activeTab === 'video') {
        res = await apiService.analyzeVideo(selectedFile.uri, selectedFile.name, selectedFile.type);
      } else {
        res = await apiService.analyzeAudio(selectedFile.uri, selectedFile.name, selectedFile.type);
      }
      setResult(res);
    } catch (e) {
      console.error('Deepfake analysis failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="#2D5BFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Deepfake Detector</Text>
          <View style={styles.iconButton} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <MaterialCommunityIcons name="shield-outline" size={20} color="#2D5BFF" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>AI Video Verifier</Text>
            <Text style={styles.infoDesc}>
              Our neural networks analyze facial coherence, lighting consistency, and biometric patterns to detect synthetic media.
            </Text>
          </View>
        </View>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'video' && styles.activeTab]}
            onPress={() => setActiveTab('video')}
          >
            <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>video</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'image' && styles.activeTab]}
            onPress={() => setActiveTab('image')}
          >
            <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>image</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'audio' && styles.activeTab]}
            onPress={() => setActiveTab('audio')}
          >
            <Text style={[styles.tabText, activeTab === 'audio' && styles.activeTabText]}>audio</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Area */}
        <View style={styles.uploadArea}>
          <View style={styles.uploadIconContainer}>
            <Ionicons name="cloud-upload-outline" size={32} color="#2D5BFF" />
          </View>
          <Text style={styles.uploadTitle}>Upload Media</Text>
          <Text style={styles.uploadDesc}>
            Drag and drop video to scan for{'\n'}synthetic manipulation
          </Text>
          <View style={styles.formatBadge}>
            <Ionicons name="videocam-outline" size={14} color="#FFF" style={styles.formatIcon} />
            <Text style={styles.formatText}>MP4, MOV</Text>
          </View>
          <TouchableOpacity style={styles.browseButton} onPress={handleBrowse}>
            <Text style={styles.browseButtonText}>
              {selectedFile ? '✓ ' + selectedFile.name.slice(0, 20) : 'Browse Files'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scan Vectors Section */}
        <Text style={styles.sectionTitle}>WHAT WE SCAN FOR</Text>

        <View style={styles.vectorsList}>
          {/* Vector 1 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="scan-outline" size={18} color="#2D5BFF" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorTitle}>Facial Artifact Analysis</Text>
              <Text style={styles.vectorDesc}>Detection of micro-glitches in facial features.</Text>
            </View>
          </View>

          {/* Vector 2 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="contrast-outline" size={18} color="#2D5BFF" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorTitle}>Lighting & Shadow Mapping</Text>
              <Text style={styles.vectorDesc}>Checking for unnatural environment lighting.</Text>
            </View>
          </View>

          {/* Vector 3 */}
          <View style={styles.vectorCard}>
            <View style={styles.vectorIconContainer}>
              <Ionicons name="film-outline" size={18} color="#2D5BFF" />
            </View>
            <View style={styles.vectorContent}>
              <Text style={styles.vectorTitle}>Frame-by-Frame Consistency</Text>
              <Text style={styles.vectorDesc}>Verifying temporal coherence in video streams.</Text>
            </View>
          </View>
        </View>

        {/* Start Analysis Button */}
        <TouchableOpacity
          style={[styles.analyzeButton, (!selectedFile || isLoading) && styles.analyzeButtonDisabled]}
          onPress={handleAnalyze}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#05050A" />
          ) : (
            <>
              <Ionicons name="scan-outline" size={20} color="#05050A" style={styles.analyzeIcon} />
              <Text style={styles.analyzeButtonText}>Start AI Analysis</Text>
            </>
          )}
        </TouchableOpacity>

        {result && <ResultCard title="Analysis Complete" data={result} />}

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
    flexDirection: 'row',
    backgroundColor: '#0F101A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  infoIconContainer: {
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
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoDesc: {
    color: '#8A8D9F',
    fontSize: 12,
    lineHeight: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1D2A',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#3A5BFF',
  },
  tabText: {
    color: '#8A8D9F',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
  },
  uploadArea: {
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    borderStyle: 'dashed',
    padding: 32,
    marginBottom: 32,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0F101A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
  },
  uploadTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  uploadDesc: {
    color: '#8A8D9F',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  formatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1D2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  formatIcon: {
    marginRight: 6,
  },
  formatText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#05050A',
    borderWidth: 1,
    borderColor: '#2D5BFF',
  },
  browseButtonText: {
    color: '#2D5BFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#8A8D9F',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  vectorsList: {
    marginBottom: 32,
  },
  vectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151622',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  vectorIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vectorContent: {
    flex: 1,
  },
  vectorTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  vectorDesc: {
    color: '#8A8D9F',
    fontSize: 12,
  },
  analyzeButton: {
    flexDirection: 'row',
    backgroundColor: '#3A5BFF',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzeIcon: {
    marginRight: 8,
  },
  analyzeButtonText: {
    color: '#05050A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  analyzeButtonDisabled: {
    opacity: 0.5,
  },
  bottomPadding: {
    height: 80,
  },
});
