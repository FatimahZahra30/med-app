import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Syringe } from "lucide-react-native";

type Props = {
  remaining: number;
};

export default function AdrenalineTimer({
  remaining,
}: Props) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = Math.max(
  0,
  Math.min(1, (180 - remaining) / 180)
);

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Syringe
          size={20}
          color="#D97706"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          NEXT ADRENALINE DOSE
        </Text>

        <Text style={styles.time}>
          {formatTime(remaining)}
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
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

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fadfb1",
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#92400E",
  },

  time: {
    marginTop: 3,
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
  },

  progressTrack: {
    height: 6,
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FDE68A",
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#F59E0B",
  },
});