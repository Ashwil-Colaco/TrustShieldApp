import { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export function useScreenshotMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);

  const lastScanTimeRef = useRef<number>(Date.now());
  const router = useRouter();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isMonitoring) {
      console.log("🛡 Shield Activated: Gallery polling started");

      // run first scan immediately
      checkAndScan();

      interval = setInterval(() => {
        checkAndScan();
      }, 5000); // check every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
      console.log("🛑 Shield Deactivated: Polling stopped");
    };
  }, [isMonitoring]);

  const checkAndScan = async () => {
    try {
      // Request ONLY photo permission (avoids audio permission error)
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();

        if (newStatus !== "granted") {
          console.log("Permission denied");
          setIsMonitoring(false);
          return;
        }
      }

      // Find screenshots album
      const albums = await MediaLibrary.getAlbumsAsync();
      const screenshotAlbum = albums.find((album) =>
        album.title.toLowerCase().includes("screenshot")
      );

      if (!screenshotAlbum) {
        console.log("No screenshot album found");
        return;
      }

      // Get latest images from screenshots album
      const media = await MediaLibrary.getAssetsAsync({
        album: screenshotAlbum.id,
        first: 5,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [["creationTime", false]],
      });

      const newScreenshots = media.assets.filter((asset) => {
        const name = asset.filename?.toLowerCase() || "";

        const isScreenshot =
          name.includes("screenshot") ||
          name.includes("screen_shot") ||
          name.includes("screen-shot") ||
          name.includes("scr_");

        const isNew = asset.creationTime * 1000 > lastScanTimeRef.current;

        return isScreenshot && isNew;
      });

      if (newScreenshots.length > 0) {
        console.log("📸 NEW SCREENSHOT DETECTED");

        lastScanTimeRef.current = Date.now();

        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );

        Alert.alert(
          "🛡️ Shield Triggered",
          "A new screenshot was detected. Opening analysis...",
          [{ text: "OK" }]
        );

        setHasDetected(true);

        setTimeout(() => {
          setHasDetected(false);
          router.push("/email-analysis" as any);
        }, 1500);
      }
    } catch (error) {
      console.error("Gallery Polling failed:", error);
    }
  };

  return {
    isMonitoring,
    setIsMonitoring,
    hasDetected,
  };
}