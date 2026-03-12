import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Account Settings</Text>
                <Text style={styles.subtitle}>Manage your profile and security preferences.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '900',
    },
    subtitle: {
        color: '#9BA1A6',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Account;
