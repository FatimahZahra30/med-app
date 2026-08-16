import { Pressable, StyleSheet, Text, View } from "react-native";

import { Audio } from "expo-av";
import { Pause, Play } from "lucide-react-native";
import { useEffect, useRef } from "react";

type Props = {
  remaining: number;
  running: boolean;
  onToggle: () => void;
};

export default function RhythmCountdown({
  remaining,
  running,
  onToggle,
}: Props) {
  // AI helped with a lot of the sound related configurations
  const soundRef = useRef<Audio.Sound | null>(null);
  const hasPlayed = useRef(false);

  const isFinished = remaining === 0;

  // Play the alarm
  const playAlarm = async () => {
    try {
      console.log("Attempting to play alarm...");

      // Configure audio
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      console.log("Audio mode configured");

      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/alarm.mp3"),
        {
          shouldPlay: false,
          volume: 1.0,
        },
      );

      soundRef.current = sound;

      console.log("Sound loaded");

      await sound.playAsync();

      console.log("ALARM PLAYING");

      // Stop after 3 seconds
      setTimeout(async () => {
        try {
          if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;

            console.log("Alarm stopped");
          }
        } catch (error) {
          console.log("❌ Error stopping alarm:", error);
        }
      }, 3000);
    } catch (error) {
      console.log("❌ ERROR PLAYING ALARM:", error);
    }
  };

  // Watch Timer
  useEffect(() => {
    console.log("Timer:", remaining);

    if (remaining === 0 && !hasPlayed.current) {
      console.log("TIMER REACHED ZERO");

      hasPlayed.current = true;

      playAlarm();
    }

    // Allow alarm to play again if timer is restarted
    if (remaining > 0) {
      hasPlayed.current = false;
    }
  }, [remaining]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  const minutes = Math.floor(remaining / 60);

  const seconds = remaining % 60;

  const progress = ((120 - remaining) / 120) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RHYTHM CHECK TIMER</Text>

        <Pressable onPress={onToggle} style={styles.button}>
          {running ? (
            <Pause size={18} color="#111827" />
          ) : (
            <Play size={18} color="#111827" />
          )}
        </Pressable>
      </View>
      <Text style={[styles.time, isFinished && styles.timeFinished]}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Text>
      // UI change based on the end of the timer
      {isFinished && (
        <Text style={styles.labelFinished}>TIME FOR RHYTHM CHECK</Text>
      )}
      <View style={[styles.track, isFinished && styles.trackFinished]}>
        <View
          style={[
            styles.progress,
            isFinished && styles.progressBarFinished,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#64748B",
  },

  time: {
    marginTop: 5,
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },

  track: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 14,
  },

  labelFinished: {
    color: "#DC2626",
    fontWeight: 600,
    marginTop: 4,
  },

  progress: {
    height: "100%",
    backgroundColor: "#da4a4a",
  },

  timeFinished: {
    color: "#DC2626",
  },

  trackFinished: {
    backgroundColor: "#FECACA",
  },

  progressBarFinished: {
    backgroundColor: "#DC2626",
  },
});
