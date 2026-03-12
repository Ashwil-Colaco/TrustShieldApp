import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmailAnalysis = () => {
    const router = useRouter();
    const [emailContent, setEmailContent] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Email Analysis</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>
                        <MaterialCommunityIcons name="shield-lock-outline" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.infoTitle}>AI Phishing Shield Active</Text>
                            <View style={styles.proBadge}>
                                <Text style={styles.proText}>Pro</Text>
                            </View>
                        </View>
                        <Text style={styles.infoDescription}>
                            Our neural agents will scan this content for malicious links, social engineering patterns, and suspicious headers.
                        </Text>
                    </View>
                </View>

                {/* Email Content Section */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIndicator} />
                    <Text style={styles.sectionLabel}>EMAIL CONTENT</Text>
                    <View style={styles.charCountBadge}>
                        <Text style={styles.charCountText}>{emailContent.length} chars</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Paste the suspicious email body here..."
                        placeholderTextColor="#687076"
                        multiline
                        value={emailContent}
                        onChangeText={setEmailContent}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.pasteButton}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#3B82F6" />
                        <Text style={styles.pasteButtonText}>Paste Sample</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clearButton} onPress={() => setEmailContent('')}>
                        <Feather name="trash-2" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Analyze Button */}
                <TouchableOpacity style={styles.analyzeButton}>
                    <MaterialCommunityIcons name="flash-outline" size={24} color="#3B82F6" style={styles.buttonIcon} />
                    <Text style={styles.analyzeButtonText}>ANALYZE EMAIL</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    infoButton: {
        padding: 4,
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
        marginBottom: 30,
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
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    infoTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        marginRight: 8,
    },
    proBadge: {
        backgroundColor: 'rgba(107, 70, 193, 0.2)', // Purple tint
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(107, 70, 193, 0.3)',
    },
    proText: {
        color: '#9F7AEA',
        fontSize: 10,
        fontWeight: '800',
    },
    infoDescription: {
        color: '#9BA1A6',
        fontSize: 12,
        lineHeight: 18,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionIndicator: {
        width: 3,
        height: 14,
        backgroundColor: '#3B82F6',
        borderRadius: 2,
        marginRight: 10,
    },
    sectionLabel: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 0.5,
        flex: 1,
    },
    charCountBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    charCountText: {
        color: '#687076',
        fontSize: 11,
        fontWeight: '700',
    },
    inputContainer: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#1A1A24',
        height: 280,
        marginBottom: 15,
    },
    textInput: {
        color: '#FFFFFF',
        fontSize: 15,
        flex: 1,
    },
    actionRow: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30,
        gap: 12,
    },
    pasteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0F',
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    pasteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
    },
    clearButton: {
        width: 52,
        height: 52,
        backgroundColor: '#0A0A0F',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A1A24',
        justifyContent: 'center',
        alignItems: 'center',
    },
    analyzeButton: {
        backgroundColor: '#1E1B4B', // Dark indigo/navy
        marginHorizontal: 20,
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 10,
    },
    analyzeButtonText: {
        color: '#6366F1', // Indigo blue accent
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default EmailAnalysis;
