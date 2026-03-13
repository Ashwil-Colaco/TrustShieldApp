import { useState, useEffect, useRef } from "react";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

/**
 * useScreenshotMonitor - Refactored to "Clipboard Shield"
 * Monitors the system clipboard for changes to automate security analysis.
 * Renamed internally for clarity but maintains hook name for UI compatibility.
 */
export function useScreenshotMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);
  const lastClipboardRef = useRef<string>("");
  const router = useRouter();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isMonitoring) {
      console.log("🛡 Shield Activated: Clipboard monitoring started");
      
      // Initialize the ref with current value to avoid immediate trigger upon activation
      Clipboard.getStringAsync().then(text => {
        lastClipboardRef.current = text;
      });

      interval = setInterval(() => {
        checkClipboard();
      }, 1000); // Polling every 1 second as requested
    }

    return () => {
      if (interval) clearInterval(interval);
      console.log("🛑 Shield Deactivated: Clipboard monitoring stopped");
    };
  }, [isMonitoring]);

  const checkClipboard = async () => {
    try {
      const currentText = await Clipboard.getStringAsync();

      // Trigger if text changed and isn't empty
      if (currentText !== lastClipboardRef.current && currentText.trim().length > 0) {
        console.log("📋 NEW CLIPBOARD CONTENT DETECTED");

        // Update the reference point
        lastClipboardRef.current = currentText;

        // Immediate physical feedback
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );

        // Show alert for background detection clarity
        Alert.alert(
          "🛡️ Shield Triggered",
          "New clipboard content detected. Opening secure analysis...",
          [{ text: "OK" }]
        );

        // Visual feedback state
        setHasDetected(true);

        // Delay slightly for visual feedback before navigation
        setTimeout(() => {
          setHasDetected(false);
          router.push("/email-analysis" as any);
        }, 1500);
      }
    } catch (error) {
      console.error("Clipboard Monitoring failed:", error);
    }
  };

  return {
    isMonitoring,
    setIsMonitoring,
    hasDetected,
  };
}