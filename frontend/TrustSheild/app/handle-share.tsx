import { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';

// expo-sharing only lets you SHARE *from* your app to others.
// To RECEIVE content shared into your app, use expo-linking to
// read the launch URL or intent URI passed by the OS.

type SharedPayload = {
    contentUri: string | null;
    text: string | null;
    contentType: 'text' | 'image' | 'video' | 'unknown';
};

function parseSharedContent(url: string | null): SharedPayload | null {
    if (!url) return null;

    // Expo Router / deep-link URL looks like:
    //   trustsheild://handle-share?uri=content%3A%2F%2F...&type=image
    // or the raw content URI when opened via an Android Share intent
    try {
        const parsed = Linking.parse(url);
        const uri = parsed.queryParams?.uri as string | undefined;
        const text = parsed.queryParams?.text as string | undefined;
        const mime = (parsed.queryParams?.type as string | undefined) ?? '';

        let contentType: SharedPayload['contentType'] = 'unknown';
        if (mime.startsWith('image/')) contentType = 'image';
        else if (mime.startsWith('video/')) contentType = 'video';
        else if (mime.startsWith('text/') || text) contentType = 'text';

        return {
            contentUri: uri ?? url,
            text: text ?? null,
            contentType,
        };
    } catch {
        return null;
    }
}

export default function HandleShare() {
    const [payload, setPayload] = useState<SharedPayload | null>(null);
    const [isResolving, setIsResolving] = useState(true);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        // Get the URL that launched (or refocused) the app
        Linking.getInitialURL().then((url) => {
            setPayload(parseSharedContent(url));
            setIsResolving(false);
        });

        // Also listen for URLs that come in while the app is already open
        const subscription = Linking.addEventListener('url', ({ url }) => {
            setPayload(parseSharedContent(url));
        });

        return () => subscription.remove();
    }, []);

    if (isResolving) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.text}>Loading shared content…</Text>
            </View>
        );
    }

    if (!payload) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>Nothing was shared</Text>
            </View>
        );
    }

    const type = payload.contentType;

    async function sendToServer(selectedType: 'text' | 'image' | 'video') {
        setSending(true);
        setStatus(null);

        try {
            let endpoint = '';
            let body: any = {};

            if (selectedType === 'text') {
                endpoint = 'https://your-api.com/text';
                body = { text: (payload as any).text ?? (payload as any).value ?? '' };
            } else if (selectedType === 'image') {
                endpoint = 'https://your-api.com/image';
                body = { uri: payload!.contentUri };
            } else if (selectedType === 'video') {
                endpoint = 'https://your-api.com/video';
                body = { uri: payload!.contentUri };
            }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error('Request failed');

            setStatus('Sent successfully');
        } catch (e: any) {
            setStatus('Failed to send: ' + e.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Received from share sheet</Text>
            <Text style={styles.text}>Detected type: {type}</Text>

            {type === 'text' && (
                <Text style={[styles.text, { marginVertical: 12 }]}>
                    {(payload as any).text ?? (payload as any).value}
                </Text>
            )}

            {type === 'image' && (
                <Image
                    source={{ uri: payload.contentUri ?? undefined }}
                    style={{ width: 250, height: 250, borderRadius: 8, marginVertical: 12 }}
                />
            )}

            {type === 'video' && (
                <Text style={styles.text}>Video received (preview not implemented yet)</Text>
                // later you can add expo-av Video player here
            )}

            <Text style={[styles.text, { marginTop: 16 }]}>
                Choose how you want to send this:
            </Text>

            <View style={{ marginVertical: 8 }}>
                <Button
                    title="Send as TEXT"
                    onPress={() => sendToServer('text')}
                    disabled={sending}
                />
            </View>
            <View style={{ marginVertical: 8 }}>
                <Button
                    title="Send as IMAGE"
                    onPress={() => sendToServer('image')}
                    disabled={sending}
                />
            </View>
            <View style={{ marginVertical: 8 }}>
                <Button
                    title="Send as VIDEO"
                    onPress={() => sendToServer('video')}
                    disabled={sending}
                />
            </View>

            {sending && <ActivityIndicator style={{ marginTop: 12 }} />}

            {status && <Text style={[styles.text, { marginTop: 8 }]}>{status}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
    },
});
