export async function redirectSystemPath({
    path,
}: {
    path: string;
    initial: boolean;
}) {
    try {
        // If it's a raw content URI or file URI from a share, redirect to handle-share
        if (path.startsWith('content://') || path.startsWith('file://')) {
            return `/handle-share?uri=${encodeURIComponent(path)}`;
        }

        const url = new URL(path);

        // Handle the expo-sharing hostname if still used, or our own scheme
        if (url.hostname === 'expo-sharing' || url.hostname === 'handle-share') {
            return '/handle-share';
        }

        return path;
    } catch {
        // If it's not a valid URL but could be a partial path, check for sharing
        if (path.includes('handle-share')) {
            return '/handle-share';
        }
        return '/';
    }
}
