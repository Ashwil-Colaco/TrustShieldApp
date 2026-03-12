import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// --- Mock Data ---

const chartData = {
    labels: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    incoming: [0.1, 0.4, 0.8, 0.5, 0.4, 0.2, 0.1], // Normalized values for SVG path
    neutralized: [0.05, 0.35, 0.75, 0.45, 0.38, 0.18, 0.08],
};

const heatmapData = [
    { source: 'Email', values: [3, 2, 4, 1, 1, 2, 3] },
    { source: 'Web', values: [2, 1, 1, 3, 2, 3, 2] },
    { source: 'SMS', values: [1, 1, 3, 4, 2, 1, 1] },
    { source: 'Apps', values: [2, 3, 2, 1, 1, 2, 3] },
];

const HeatmapCell = ({ value }: { value: number }) => {
    // Colors from dark brown to bright orange
    const colors = ['#1A120A', '#3C2A1A', '#6B4423', '#A66E38', '#E69138'];
    return (
        <View style={[styles.heatmapCell, { backgroundColor: colors[value] || colors[0] }]} />
    );
};

const Analytics = () => {
    const chartWidth = width - 80;
    const chartHeight = 150;

    const generatePath = (data: number[]) => {
        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * chartWidth;
            const y = chartHeight - val * chartHeight;
            return { x, y };
        });

        // Simple quadratic bezier curve for smoothness
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cpX = (p0.x + p1.x) / 2;
            d += ` Q ${cpX} ${p1.y} ${p1.x} ${p1.y}`;
        }
        return d;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Nav Header */}
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.logoText}>TrustShield</Text>
                </View>
                <TouchableOpacity style={styles.pulseButton}>
                    <MaterialCommunityIcons name="pulse" size={20} color="#3B82F6" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Threat Ecosystem Section */}
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Threat Ecosystem</Text>
                    <Text style={styles.sectionSubtitle}>Live monitoring of active network vectors</Text>
                </View>

                {/* Main Stats Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statsHeader}>
                        <View>
                            <Text style={styles.safetyIndexValue}>98.2%</Text>
                            <Text style={styles.safetyIndexLabel}>SAFETY INDEX</Text>
                        </View>
                        <View style={styles.statusCol}>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>System Stable</Text>
                            </View>
                            <Text style={styles.systemId}>ID: TZ-992-ALPHA</Text>
                        </View>
                    </View>

                    {/* Line Chart */}
                    <View style={styles.chartContainer}>
                        <Svg width={chartWidth} height={chartHeight}>
                            <Defs>
                                <LinearGradient id="gradientIncoming" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#E69138" stopOpacity="0.8" />
                                    <Stop offset="1" stopColor="#E69138" stopOpacity="0" />
                                </LinearGradient>
                                <LinearGradient id="gradientNeutralized" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#3B82F6" stopOpacity="0.8" />
                                    <Stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>

                            {/* Grid Lines */}
                            {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
                                <Line
                                    key={i}
                                    x1="0"
                                    y1={chartHeight * v}
                                    x2={chartWidth}
                                    y2={chartHeight * v}
                                    stroke="#1A1A24"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Paths */}
                            <Path d={generatePath(chartData.incoming)} fill="none" stroke="#E69138" strokeWidth="2" />
                            <Path d={generatePath(chartData.neutralized)} fill="none" stroke="#3B82F6" strokeWidth="2" />

                            {/* Circles at nodes */}
                            {chartData.incoming.map((val, i) => {
                                const x = (i / (chartData.incoming.length - 1)) * chartWidth;
                                const y = chartHeight - val * chartHeight;
                                return <Circle key={`in-${i}`} cx={x} cy={y} r="3" fill="#E69138" />;
                            })}
                            {chartData.neutralized.map((val, i) => {
                                const x = (i / (chartData.neutralized.length - 1)) * chartWidth;
                                const y = chartHeight - val * chartHeight;
                                return <Circle key={`neu-${i}`} cx={x} cy={y} r="3" fill="#3B82F6" />;
                            })}
                        </Svg>

                        <View style={styles.chartLabels}>
                            {chartData.labels.map((label, i) => (
                                <Text key={i} style={styles.chartLabelText}>{label}</Text>
                            ))}
                        </View>

                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#E69138' }]} />
                                <Text style={styles.legendText}>INCOMING THREATS</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                                <Text style={styles.legendText}>NEUTRALIZED</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Frequency Analysis Section */}
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Frequency Analysis</Text>
                    <Text style={styles.sectionSubtitle}>Heat signature of attack vectors</Text>
                </View>

                <View style={styles.heatmapCard}>
                    <View style={styles.heatmapHeader}>
                        <View style={styles.heatmapTitleRow}>
                            <MaterialCommunityIcons name="trending-up" size={18} color="#E69138" />
                            <Text style={styles.heatmapTitle}>Threat Source Intensity</Text>
                        </View>
                        <View style={styles.weeklyHeatBadge}>
                            <Text style={styles.weeklyHeatText}>Weekly Heat</Text>
                        </View>
                    </View>

                    <View style={styles.heatmapGridContainer}>
                        <View style={styles.heatmapDaysHeader}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <Text key={i} style={styles.dayLabel}>{d}</Text>
                            ))}
                        </View>
                        {heatmapData.map((row, i) => (
                            <View key={i} style={styles.heatmapRow}>
                                <Text style={styles.sourceLabel}>{row.source}</Text>
                                <View style={styles.rowCells}>
                                    {row.values.map((v, j) => (
                                        <HeatmapCell key={j} value={v} />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.heatmapFooter}>
                        <Text style={styles.riskLabel}>Low Risk</Text>
                        <View style={styles.riskScale}>
                            {[0, 1, 2, 3, 4].map(v => <HeatmapCell key={v} value={v} />)}
                        </View>
                        <Text style={styles.riskLabel}>Critical</Text>
                    </View>
                </View>

                {/* Risk Coach Card */}
                <View style={styles.coachCard}>
                    <View style={styles.coachHeader}>
                        <View style={styles.avatarContainer}>
                            <FontAwesome5 name="robot" size={24} color="#FFFFFF" />
                            <View style={styles.coachPulse} />
                        </View>
                        <View>
                            <Text style={styles.coachTitle}>Personal Cyber Risk Coach</Text>
                            <Text style={styles.coachSubtitle}>Active Analysis: Last 24 Hours</Text>
                        </View>
                    </View>

                    <View style={styles.coachInsightBox}>
                        <Ionicons name="warning-outline" size={18} color="#FEA321" />
                        <Text style={styles.insightText}>
                            Most threats you received this week were <Text style={styles.highlightText}>phishing links</Text>.
                        </Text>
                    </View>

                    <View style={styles.coachInsightBox}>
                        <Ionicons name="chatbubble-outline" size={18} color="#3B82F6" />
                        <Text style={styles.insightText}>
                            <Text style={styles.highlightText}>70%</Text> of suspicious messages came from WhatsApp.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.deepDiveButton}>
                        <Text style={styles.deepDiveText}>Deep Dive Analysis</Text>
                        <Ionicons name="chevron-forward" size={16} color="#000000" />
                    </TouchableOpacity>
                </View>

                {/* Pro Tip Card */}
                <View style={styles.proTipCard}>
                    <View style={styles.proTipHeader}>
                        <View style={styles.proTipBadge}>
                            <Text style={styles.proTipBadgeText}>PRO TIP</Text>
                        </View>
                        <Text style={styles.proTipTitle}>CYBER AWARENESS</Text>
                    </View>

                    <Text style={styles.spoofingTitle}>Identity Spoofing Alert</Text>
                    <View style={styles.proTipRow}>
                        <Text style={styles.proTipDescription}>
                            Scammers now use AI-cloned voices. Never share OTPs or wire money based on voice calls alone. Always verify through a second known channel.
                        </Text>
                        <TouchableOpacity style={styles.infoCircle}>
                            <Ionicons name="information-circle-outline" size={24} color="#E69138" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.proTipFooter}>
                        <Text style={styles.sourceText}>Source: Global Threat Intel</Text>
                        <TouchableOpacity>
                            <Text style={styles.learnMoreText}>Learn More</Text>
                        </TouchableOpacity>
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
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#1A1A24',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    pulseButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0A0A0F',
        borderWidth: 1,
        borderColor: '#1A1A24',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 120, // Account for BottomBar
    },
    sectionTitleContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
    },
    sectionSubtitle: {
        color: '#9BA1A6',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 4,
    },
    statsCard: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 15,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    safetyIndexValue: {
        color: '#3B82F6',
        fontSize: 32,
        fontWeight: '900',
    },
    safetyIndexLabel: {
        color: '#687076',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
        marginTop: 2,
    },
    statusCol: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1A1A24',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    systemId: {
        color: '#687076',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 6,
    },
    chartContainer: {
        alignItems: 'center',
    },
    chartLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 80,
        marginTop: 10,
    },
    chartLabelText: {
        color: '#687076',
        fontSize: 11,
        fontWeight: '700',
    },
    legendContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 25,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        color: '#687076',
        fontSize: 10,
        fontWeight: '800',
    },
    heatmapCard: {
        backgroundColor: '#0A0A0F',
        marginHorizontal: 15,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1A1A24',
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
        gap: 8,
    },
    heatmapTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    weeklyHeatBadge: {
        backgroundColor: 'rgba(230, 145, 56, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    weeklyHeatText: {
        color: '#E69138',
        fontSize: 10,
        fontWeight: '800',
    },
    heatmapGridContainer: {
        marginTop: 10,
    },
    heatmapDaysHeader: {
        flexDirection: 'row',
        marginLeft: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    dayLabel: {
        color: '#687076',
        fontSize: 11,
        fontWeight: '700',
        width: 28,
        textAlign: 'center',
    },
    heatmapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sourceLabel: {
        color: '#687076',
        fontSize: 11,
        fontWeight: '600',
        width: 60,
    },
    rowCells: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heatmapCell: {
        width: 28,
        height: 28,
        borderRadius: 4,
    },
    heatmapFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    riskLabel: {
        color: '#687076',
        fontSize: 10,
        fontWeight: '700',
    },
    riskScale: {
        flexDirection: 'row',
        marginHorizontal: 15,
        gap: 4,
    },
    coachCard: {
        backgroundColor: '#083344', // Dark teal/blue
        marginHorizontal: 15,
        borderRadius: 24,
        padding: 20,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#0e7490',
    },
    coachHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1E1B4B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    coachPulse: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E69138',
        borderWidth: 2,
        borderColor: '#083344',
    },
    coachTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    coachSubtitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 11,
        fontWeight: '500',
        marginTop: 2,
    },
    coachInsightBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 16,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    insightText: {
        color: '#FFFFFF',
        fontSize: 13,
        flex: 1,
        lineHeight: 18,
    },
    highlightText: {
        color: '#FEA321', // Light orange
        fontWeight: '700',
    },
    deepDiveButton: {
        backgroundColor: '#1FB4FF',
        height: 54,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        gap: 8,
    },
    deepDiveText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '800',
    },
    proTipCard: {
        backgroundColor: '#432000', // Deep brown/orange
        marginHorizontal: 15,
        borderRadius: 24,
        padding: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#78350f',
    },
    proTipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    proTipBadge: {
        backgroundColor: '#FF944D',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    proTipBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
    },
    proTipTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
    },
    spoofingTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 12,
    },
    proTipRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
    },
    proTipDescription: {
        color: '#FDE68A',
        fontSize: 13,
        lineHeight: 20,
        flex: 1,
        fontWeight: '500',
    },
    infoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 15,
    },
    proTipFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sourceText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 11,
        fontStyle: 'italic',
    },
    learnMoreText: {
        color: '#FF944D',
        fontSize: 12,
        fontWeight: '700',
    },
});

export default Analytics;
