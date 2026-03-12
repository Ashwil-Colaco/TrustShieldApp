import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DeepfakeDetector = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('video');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Deepfake Detector</Text>
                <View style={{ width: 32 }} /> {/* Spacer */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        <MaterialCommunityIcons name="shield-lock-outline" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>AI Video Verifier</Text>
                        <Text style={styles.infoDescription}>
                            Our neural networks analyze facial coherence, lighting consistency, and biometric patterns to detect synthetic media.
                        </Text>
                    </View>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'video' && styles.activeTab]}
                        onPress={() => setActiveTab('video')}
                    >
                        <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'image' && styles.activeTab]}
                        onPress={() => setActiveTab('image')}
                    >
                        <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'audio' && styles.activeTab]}
                        onPress={() => setActiveTab('audio')}
                    >
                        <Text style={[styles.tabText, activeTab === 'audio' && styles.activeTabText]}>audio</Text>
                    </TouchableOpacity>
                </View>

                {/* Upload Area */}
                <View style={styles.uploadArea}>
                    <View style={styles.dashedBorder}>
                        <TouchableOpacity style={styles.uploadCircle}>
                            <Feather name="upload" size={32} color="#3B82F6" />
                        </TouchableOpacity>
                        <Text style={styles.uploadTitle}>Upload Media</Text>
                        <Text style={styles.uploadSubtitle}>
                            Drag and drop video to scan for synthetic manipulation
                        </Text>

                        <View style={styles.formatBadge}>
                            <MaterialCommunityIcons name="video-outline" size={16} color="#3B82F6" />
                            <Text style={styles.formatText}>MP4, MOV</Text>
                        </View>

                        <TouchableOpacity style={styles.browseButton}>
                            <Text style={styles.browseButtonText}>Browse Files</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Scan Vectors Section */}
                <Text style={styles.sectionTitle}>WHAT WE SCAN FOR</Text>

                <View style={styles.vectorList}>
                    <VectorItem
                        icon="face-recognition"
                        title="Facial Artifact Analysis"
                        description="Detection of micro-glitches in facial features."
                    />
                    <VectorItem
                        icon="lightbulb-outline"
                        title="Lighting & Shadow Mapping"
                        description="Checking for unnatural environment lighting."
                    />
                    <VectorItem
                        icon="check-circle-outline"
                        title="Frame-by-Frame Consistency"
                        description="Verifying temporal coherence in video streams."
                    />
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.analyzeButton}>
                    <MaterialCommunityIcons name="magnify-scan" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                    <Text style={styles.analyzeButtonText}>Start AI Analysis</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const VectorItem = ({ icon, title, description }: any) => (
    <View style={styles.vectorCard}>
        <View style={styles.vectorIconBox}>
            <MaterialCommunityIcons name={icon} size={22} color="#3B82F6" />
        </View>
        <View style={styles.vectorInfo}>
            <Text style={styles.vectorTitle}>{title}</Text>
            <Text style={styles.vectorDescription}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    infoCard: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    infoIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    infoDescription: {
        color: '#9BA1A6',
        fontSize: 12,
        lineHeight: 18,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 6,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#3B82F6',
    },
    tabText: {
        color: '#9BA1A6',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'lowercase',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    uploadArea: {
        marginHorizontal: 20,
        marginBottom: 30,
    },
    dashedBorder: {
        borderWidth: 2,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderStyle: 'dashed',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        backgroundColor: 'rgba(59, 130, 246, 0.02)',
    },
    uploadCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    uploadSubtitle: {
        color: '#9BA1A6',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 18,
        paddingHorizontal: 20,
    },
    formatBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A0A0F',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1A1A24',
        marginBottom: 20,
    },
    formatText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 6,
    },
    browseButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    browseButtonText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '700',
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    vectorList: {
        marginHorizontal: 20,
        marginBottom: 30,
    },
    vectorCard: {
        backgroundColor: '#151718',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    vectorIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(59, 130, 246, 0.05)', // Subtle background
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    vectorInfo: {
        flex: 1,
    },
    vectorTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
    },
    vectorDescription: {
        color: '#9BA1A6',
        fontSize: 11,
    },
    analyzeButton: {
        backgroundColor: '#3B82F6',
        marginHorizontal: 20,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 10,
    },
    analyzeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});

export default DeepfakeDetector;
