import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VerifyNews = () => {
    const router = useRouter();
    const [headline, setHeadline] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verify News</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Truth Engine Card */}
                <View style={styles.truthCard}>
                    <View style={styles.truthIconContainer}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.truthTextContainer}>
                        <Text style={styles.truthTitle}>Truth Engine Active</Text>
                        <Text style={styles.truthDescription}>
                            Our neural networks cross-reference content across 50,000+ verified sources to detect bias and misinformation.
                        </Text>
                    </View>
                </View>

                {/* Headline Section */}
                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons name="newspaper-variant-outline" size={22} color="#3B82F6" />
                    <Text style={styles.sectionLabel}>ARTICLE HEADLINE</Text>
                </View>

                <View style={styles.headlineInputContainer}>
                    <TextInput
                        style={styles.headlineInput}
                        placeholder="Paste the suspicious headline here..."
                        placeholderTextColor="#687076"
                        multiline
                        maxLength={300}
                        value={headline}
                        onChangeText={setHeadline}
                    />
                    <View style={styles.headlineFooter}>
                        <View style={styles.analysisBadge}>
                            <Text style={styles.analysisBadgeText}>Analysis Ready</Text>
                        </View>
                        <Text style={styles.charCount}>{headline.length}/300</Text>
                    </View>
                </View>

                {/* OR Separator */}
                <View style={styles.orSeparator}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.separatorLine} />
                </View>

                {/* Link Section */}
                <View style={styles.sectionHeader}>
                    <Feather name="link" size={20} color="#F59E0B" />
                    <Text style={styles.sectionLabel}>DIRECT ARTICLE LINK</Text>
                </View>

                <View style={styles.linkInputContainer}>
                    <Feather name="search" size={20} color="#687076" style={styles.linkIcon} />
                    <TextInput
                        style={styles.linkInput}
                        placeholder="https://news-site.com/article..."
                        placeholderTextColor="#687076"
                        editable={false} // UI Placeholder
                    />
                </View>

                <View style={styles.socialHint}>
                    <Ionicons name="information-circle-outline" size={14} color="#3B82F6" />
                    <Text style={styles.socialHintText}>Social media links (Twitter, FB) are also supported.</Text>
                </View>

                {/* Verify Button */}
                <TouchableOpacity style={styles.verifyButton}>
                    <MaterialCommunityIcons name="flash-outline" size={24} color="#687076" style={styles.buttonIcon} />
                    <Text style={styles.verifyButtonText}>Verify Content</Text>
                </TouchableOpacity>

                <View style={styles.timeHint}>
                    <Ionicons name="time-outline" size={14} color="#687076" />
                    <Text style={styles.timeHintText}>Analysis typically takes 3-5 seconds</Text>
                </View>

                {/* Pro Tips Section */}
                <Text style={styles.proTipsTitle}>PRO TIPS</Text>
                <View style={styles.proTipsContainer}>
                    <View style={styles.proTipCard}>
                        <Text style={styles.proTipName}>Paste Full Text</Text>
                        <Text style={styles.proTipDesc}>The more context, the higher the accuracy.</Text>
                    </View>
                    <View style={styles.proTipCard}>
                        <Text style={styles.proTipName}>Deep Scan</Text>
                        <Text style={styles.proTipDesc}>Links allow us to analyze metadata.</Text>
                    </View>
                </View>
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
    truthCard: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    truthIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    truthTextContainer: {
        flex: 1,
    },
    truthTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    truthDescription: {
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
    sectionLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
        marginLeft: 10,
        letterSpacing: 0.5,
    },
    headlineInputContainer: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#1A1A24',
        height: 160,
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    headlineInput: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlignVertical: 'top',
        flex: 1,
    },
    headlineFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    analysisBadge: {
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    analysisBadgeText: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '700',
        opacity: 0.6,
    },
    charCount: {
        color: '#687076',
        fontSize: 10,
        fontWeight: '700',
    },
    orSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 25,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#1A1A24',
    },
    orText: {
        color: '#687076',
        marginHorizontal: 15,
        fontSize: 10,
        fontWeight: '800',
    },
    linkInputContainer: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 20,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 56,
        borderWidth: 1,
        borderColor: '#1A1A24',
        marginBottom: 10,
    },
    linkIcon: {
        marginRight: 10,
    },
    linkInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
    },
    socialHint: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    socialHintText: {
        color: '#9BA1A6',
        fontSize: 11,
        marginLeft: 6,
    },
    verifyButton: {
        backgroundColor: '#151718', // Per design
        marginHorizontal: 20,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    buttonIcon: {
        marginRight: 10,
    },
    verifyButtonText: {
        color: '#687076', // Disabled-style color as per design
        fontSize: 16,
        fontWeight: '800',
    },
    timeHint: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    timeHintText: {
        color: '#687076',
        fontSize: 11,
        marginLeft: 6,
    },
    proTipsTitle: {
        color: '#9BA1A6',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    proTipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    proTipCard: {
        backgroundColor: '#0A0A0F',
        borderRadius: 16,
        padding: 15,
        width: '48%',
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    proTipName: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 6,
    },
    proTipDesc: {
        color: '#687076',
        fontSize: 11,
        lineHeight: 16,
    },
});

export default VerifyNews;
