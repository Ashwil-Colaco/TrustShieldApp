import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UrlSecurity = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>URL Security</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>Link <Text style={styles.heroTitleAccent}>Analyzer</Text></Text>
                    <Text style={styles.heroDescription}>
                        Identify malicious redirects, phishing domains, and hidden exploits in seconds.
                    </Text>
                </View>

                {/* Scanner Input Card */}
                <View style={styles.inputCard}>
                    <View style={styles.inputCardBorder} />
                    <View style={styles.inputCardHeader}>
                        <Text style={styles.inputLabel}>SCANNER INPUT</Text>
                        <View style={styles.aiBadge}>
                            <Text style={styles.aiBadgeText}>AI AGENT READY</Text>
                        </View>
                    </View>

                    <Text style={styles.instructionText}>
                        Paste the suspicious link below for deep neural analysis.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Feather name="globe" size={20} color="#3B82F6" style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="https://example-phish.com"
                            placeholderTextColor="#687076"
                            editable={false} // UI Mockup
                        />
                    </View>

                    <TouchableOpacity style={styles.scanButton}>
                        <Ionicons name="search" size={20} color="#FFFFFF" style={styles.scanIcon} />
                        <Text style={styles.scanButtonText}>SCAN URL</Text>
                    </TouchableOpacity>
                </View>

                {/* Analysis Vectors */}
                <View style={styles.vectorSectionHeader}>
                    <MaterialCommunityIcons name="shield-check-outline" size={22} color="#3B82F6" />
                    <Text style={styles.vectorSectionTitle}>AI Analysis Vectors</Text>
                </View>

                <View style={styles.vectorList}>
                    <VectorCard
                        icon="lock-outline"
                        iconColor="#3B82F6"
                        title="SSL & Certificate Integrity"
                        description="Validates domain ownership and encryption standards to ensure safe connections."
                    />
                    <VectorCard
                        icon="clock-outline"
                        iconColor="#F59E0B"
                        title="Domain Age & Reputation"
                        description="Checks domain history. Freshly registered domains often host phishing sites."
                    />
                    <VectorCard
                        icon="flash-outline"
                        iconColor="#A855F7"
                        title="Redirect Chain Analysis"
                        description="Traces the URL through every hop to find hidden malicious payloads."
                    />
                    <VectorCard
                        icon="alert-octagon-outline"
                        iconColor="#EF4444"
                        title="Social Engineering Detection"
                        description="Analyzes URL patterns for deceptive strings like 'login-bank-secure'."
                        customIcon
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const VectorCard = ({ icon, iconColor, title, description, customIcon = false }: any) => (
    <View style={styles.vectorCard}>
        <View style={styles.vectorIconContainer}>
            {customIcon ? (
                <View style={[styles.customShape, { backgroundColor: iconColor }]} />
            ) : (
                <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
            )}
        </View>
        <View style={styles.vectorContent}>
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
        fontWeight: '700',
    },
    infoButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    heroSection: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 25,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: '800',
        marginBottom: 10,
    },
    heroTitleAccent: {
        color: '#3B82F6',
    },
    heroDescription: {
        color: '#9BA1A6',
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '500',
    },
    inputCard: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#1A1A24',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 30,
    },
    inputCardBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#3B82F6',
        opacity: 0.5,
    },
    inputCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    inputLabel: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    aiBadge: {
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.4)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    aiBadgeText: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '700',
    },
    instructionText: {
        color: '#9BA1A6',
        fontSize: 13,
        marginBottom: 20,
        lineHeight: 18,
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 56,
        borderWidth: 1,
        borderColor: '#1A1A24',
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    scanButton: {
        backgroundColor: '#3B82F6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    scanIcon: {
        marginRight: 10,
    },
    scanButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    vectorSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    vectorSectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },
    vectorList: {
        paddingHorizontal: 20,
    },
    vectorCard: {
        backgroundColor: '#0A0A0F',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    vectorIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
    },
    customShape: {
        width: 24,
        height: 24,
        borderRadius: 6,
    },
    vectorContent: {
        flex: 1,
    },
    vectorTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    vectorDescription: {
        color: '#9BA1A6',
        fontSize: 12,
        lineHeight: 18,
    },
});

export default UrlSecurity;
