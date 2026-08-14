import { Audio } from "expo-av";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Syringe } from "lucide-react-native";

type Props = {
  remaining: number;
};

export default function AdrenalineTimer({ remaining }: Props) {
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

  // Formatting of time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Progress bar for the timer
  const progress = Math.max(0, Math.min(1, (30 - remaining) / 30));

  return (
    <View style={[styles.container, isFinished && styles.containerFinished]}>
      <View style={[styles.iconBox, isFinished && styles.iconBoxFinished]}>
        <Syringe size={22} color={isFinished ? "#DC2626" : "#92400E"} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.label, isFinished && styles.labelFinished]}>
          {isFinished ? "TIME FOR NEXT DOSE" : "NEXT ADRENALINE DOSE"}
        </Text>

        <Text style={[styles.time, isFinished && styles.timeFinished]}>
          {formatTime(remaining)}
        </Text>

        <View
          style={[
            styles.progressTrack,
            isFinished && styles.progressTrackFinished,
          ]}
        >
          <View
            style={[
              styles.progressBar,
              isFinished && styles.progressBarFinished,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FCD34D",
    gap: 14,
  },

  containerFinished: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FADFB1",
  },

  iconBoxFinished: {
    backgroundColor: "#FEE2E2",
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#92400E",
  },

  labelFinished: {
    color: "#DC2626",
  },

  time: {
    marginTop: 3,
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
  },

  timeFinished: {
    color: "#DC2626",
  },

  progressTrack: {
    height: 6,
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FDE68A",
  },

  progressTrackFinished: {
    backgroundColor: "#FECACA",
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#F59E0B",
  },

  progressBarFinished: {
    backgroundColor: "#DC2626",
  },
});
