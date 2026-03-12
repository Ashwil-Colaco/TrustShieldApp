import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import securityInsights from '../data/sec-insights.json';

const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoBox}>
                            <MaterialCommunityIcons name="shield-outline" size={24} color="white" />
                        </View>
                        <Text style={styles.headerTitle}>TrustShield</Text>
                    </View>
                </View>

                {/* System Status */}
                <View style={styles.statusBanner}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>SYSTEM STATUS: OPTIMAL PROTECTION</Text>
                </View>

                {/* Feature Grid */}
                <View style={styles.grid}>
                    <View style={styles.gridRow}>
                        <FeatureCard
                            icon="email-outline"
                            title="Phishing Email"
                            subtitle="Email Analysis"
                            aiReady
                            onPress={() => router.push('/email-analysis' as any)}
                        />
                        <FeatureCard
                            icon="link-variant"
                            title="URL Scanner"
                            subtitle="Web Security"
                            aiReady
                            onPress={() => router.push('/(tabs)/url-security')}
                        />
                    </View>
                    <View style={styles.gridRow}>
                        <FeatureCard
                            icon="video-outline"
                            title="Deepfake AI"
                            subtitle="Media Verify"
                            aiReady
                            onPress={() => router.push('/deepfake' as any)}
                        />
                        <FeatureCard
                            icon="newspaper-variant-outline"
                            title="Fake News"
                            subtitle="Fact Checker"
                            aiReady
                            onPress={() => router.push('/verify-news' as any)}
                        />
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All <Ionicons name="chevron-forward" size={14} color="#3B82F6" /></Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.activityList}>
                    <ActivityItem
                        icon="alert-octagon-outline"
                        iconColor="#EF4444"
                        title="URL Scan"
                        description="https://secure-bank.logii"
                        status="FLAGGED"
                        statusColor="#EF4444"
                        time="2m ago"
                    />
                    <ActivityItem
                        icon="shield-check-outline"
                        iconColor="#10B981"
                        title="Deepfake Analysis"
                        description="video_payload_01.mp"
                        status="VERIFIED"
                        statusColor="#FFFFFF"
                        time="15m ago"
                    />
                    <ActivityItem
                        icon="shield-check-outline"
                        iconColor="#10B981"
                        title="Email Check"
                        description="Support Ticket #928"
                        status="VERIFIED"
                        statusColor="#FFFFFF"
                        time="1h ago"
                    />
                </View>

                {/* Security Insights */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Security Insights</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightsScroll}>
                    {securityInsights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            imageSource={insight.img}
                            tag={insight.id % 2 === 0 ? "Blog" : "Alert"}
                            tagBg={insight.id % 2 === 0 ? "#3B82F6" : "#EF4444"}
                            title={insight.title}
                            description={insight.description}
                            onPress={() => {
                                if (insight.link) {
                                    import('react-native').then(({ Linking }) => {
                                        Linking.openURL(insight.link);
                                    });
                                }
                            }}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const FeatureCard = ({ icon, title, subtitle, aiReady, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
                <MaterialCommunityIcons name={icon} size={28} color="#3B82F6" />
            </View>
            {aiReady && (
                <View style={styles.aiBadge}>
                    <View style={styles.aiDot} />
                    <Text style={styles.aiText}>AI READY</Text>
                </View>
            )}
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);

const ActivityItem = ({ icon, iconColor, title, description, status, statusColor, time }: any) => (
    <View style={styles.activityItem}>
        <View style={styles.activityIconContainer}>
            <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activityDescription} numberOfLines={1}>{description}</Text>
        </View>
        <View style={styles.activityStatusContainer}>
            <Text style={[styles.activityStatus, { color: statusColor }]}>{status}</Text>
            <Text style={styles.activityTime}>{time}</Text>
        </View>
    </View>
);

const InsightCard = ({ imageSource, tag, tagBg, title, description, onPress }: any) => (
    <TouchableOpacity style={styles.insightCard} onPress={onPress}>
        <View style={styles.insightImageContainer}>
            <Image source={{ uri: imageSource }} style={styles.insightImage} />
            <View style={[styles.insightTag, { backgroundColor: tagBg }]}>
                <Text style={styles.insightTagText}>{tag}</Text>
            </View>
        </View>
        <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>{title}</Text>
            <Text style={styles.insightDescription}>{description}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statusBanner: {
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderRadius: 12,
        marginHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#3B82F6',
        marginRight: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },
    grid: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#0A0A0F',
        borderWidth: 1,
        borderColor: '#1A1A24',
        borderRadius: 20,
        width: '48%',
        padding: 20,
        height: 160,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardIconContainer: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: 12,
        padding: 8,
    },
    aiBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
    },
    aiDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3B82F6',
        marginRight: 4,
    },
    aiText: {
        color: '#3B82F6',
        fontSize: 9,
        fontWeight: '800',
    },
    cardContent: {
        marginTop: 10,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#9BA1A6',
        fontSize: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
    },
    viewAllText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
    },
    activityList: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    activityItem: {
        backgroundColor: '#0A0A0F',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    activityIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    activityDescription: {
        color: '#9BA1A6',
        fontSize: 12,
    },
    activityStatusContainer: {
        alignItems: 'flex-end',
    },
    activityStatus: {
        fontSize: 10,
        fontWeight: '800',
        marginBottom: 4,
    },
    activityTime: {
        color: '#687076',
        fontSize: 10,
    },
    insightsScroll: {
        paddingLeft: 20,
        marginBottom: 20,
    },
    insightCard: {
        backgroundColor: '#0A0A0F',
        borderRadius: 20,
        width: 260,
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    insightImageContainer: {
        height: 140,
        width: '100%',
        position: 'relative',
    },
    insightImage: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
    },
    insightTag: {
        position: 'absolute',
        top: 12,
        left: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    insightTagText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },
    insightContent: {
        padding: 15,
    },
    insightTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    insightDescription: {
        color: '#9BA1A6',
        fontSize: 12,
        lineHeight: 18,
    },
});

export default Home;
