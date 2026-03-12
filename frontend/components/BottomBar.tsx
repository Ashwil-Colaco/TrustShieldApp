import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export const BottomBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const pathname = usePathname();

    // The order and routes we MUST show
    const orderedTabs = [
        { name: 'index', label: 'Home', icon: 'home-variant', outlineIcon: 'home-variant-outline', path: '/' },
        { name: 'analytics', label: 'Analytics', icon: 'chart-bar', outlineIcon: 'chart-bar', path: '/analytics' },
        { name: 'account', label: 'Account', icon: 'account', outlineIcon: 'account-outline', path: '/account' },
    ];

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
            <View style={styles.content}>
                {orderedTabs.map((tab) => {
                    // Find the matching route in the navigation state
                    const route = state.routes.find(r => r.name === tab.name || r.name.includes(tab.name));

                    // Check if we are on a secondary security page (which should highlight Home)
                    const isAnalysisPage = ['url-security', 'deepfake', 'verify-news', 'email-analysis'].some(p => pathname.includes(p));

                    // Focus logic based on path for maximum reliability
                    let isFocused = false;
                    if (tab.name === 'index') {
                        isFocused = pathname === '/' || pathname === '/index' || isAnalysisPage;
                    } else {
                        isFocused = pathname.includes(tab.name);
                    }

                    const onPress = () => {
                        if (route) {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        } else {
                            // Direct router fallback if navigation state hasn't caught up
                            router.push(tab.path as any);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            onPress={onPress}
                            style={styles.tabItem}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={isFocused ? (tab.icon as any) : (tab.outlineIcon as any)}
                                size={isFocused ? 28 : 26}
                                color={isFocused ? '#3B82F6' : '#687076'}
                            />
                            <Text style={[styles.label, { color: isFocused ? '#3B82F6' : '#687076' }]}>
                                {tab.label}
                            </Text>
                            {isFocused && <View style={styles.activeDot} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderTopColor: '#1A1A24',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        width: width, // Force full width
    },
    content: {
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3, // Explicitly set width to 1/3 of screen
        paddingTop: 8,
    },
    label: {
        fontSize: 10,
        fontWeight: '800',
        marginTop: 4,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#3B82F6',
        marginTop: 4,
    }
});
