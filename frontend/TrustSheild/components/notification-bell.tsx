import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDailyTip } from '@/hooks/use-daily-tip';

export default function NotificationBell() {
  const { tip, hasUnread, markRead } = useDailyTip();
  const [open, setOpen] = useState(false);

  // Slide-down animation value
  const slideAnim = useRef(new Animated.Value(0)).current;

  function handleBellPress() {
    if (!open) {
      // Open panel
      setOpen(true);
      markRead();
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      closePanel();
    }
  }

  function closePanel() {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setOpen(false));
  }

  const panelTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });
  const panelOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.wrapper}>
      {/* Bell Button */}
      <TouchableOpacity
        onPress={handleBellPress}
        style={styles.bellButton}
        activeOpacity={0.7}
        accessibilityLabel="Notifications"
        accessibilityRole="button"
      >
        <Ionicons
          name={open ? 'notifications' : 'notifications-outline'}
          size={24}
          color="#FFF"
        />
        {/* Unread Badge */}
        {hasUnread && !open && <View style={styles.badge} />}
      </TouchableOpacity>

      {/* Drop-down Panel */}
      {open && (
        <>
          {/* Invisible backdrop to close on tap-outside */}
          <TouchableWithoutFeedback onPress={closePanel}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.panel,
              {
                opacity: panelOpacity,
                transform: [{ translateY: panelTranslateY }],
              },
            ]}
          >
            {/* Panel Header */}
            <View style={styles.panelHeader}>
              <View style={styles.panelTitleRow}>
                <Ionicons name="shield-checkmark" size={16} color="#2D5BFF" style={{ marginRight: 6 }} />
                <Text style={styles.panelTitle}>Daily Cyber Tip</Text>
              </View>
              <TouchableOpacity onPress={closePanel} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#6A7185" />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.panelDivider} />

            {/* Tip Text */}
            <Text style={styles.tipText}>{tip}</Text>

            {/* Footer */}
            <View style={styles.panelFooter}>
              <Ionicons name="time-outline" size={12} color="#6A7185" style={{ marginRight: 4 }} />
              <Text style={styles.footerText}>Next tip in 24 hours</Text>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 100,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0F101A',
    borderWidth: 1,
    borderColor: '#1C1D2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#05050A',
  },
  // Backdrop covers the whole screen behind the panel
  backdrop: {
    position: 'absolute',
    top: 48,
    // Extend far enough to catch taps on all sides of the panel
    left: -400,
    right: -400,
    bottom: -2000,
    zIndex: 99,
  },
  panel: {
    position: 'absolute',
    top: 48,
    right: 0,
    width: 280,
    backgroundColor: '#0F101A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1C1D2A',
    padding: 16,
    zIndex: 100,
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  panelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  panelTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  panelDivider: {
    height: 1,
    backgroundColor: '#1C1D2A',
    marginBottom: 12,
  },
  tipText: {
    color: '#D0D3E8',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  panelFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#6A7185',
    fontSize: 11,
  },
});
