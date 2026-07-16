import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

type HeaderCardProps = {
  title: string;
  subtitle: string;
};

export default function HeaderCard({
  title,
  subtitle,
}: HeaderCardProps) {
    const now = new Date();

    const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    })
    .format(now)
    .replace(",", "");

    const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    }).format(now);

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.dateContainer}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
  },

  subtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.mutedForeground,
  },

  date: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.mutedForeground,
  },

  time: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  },

  dateContainer: {
    alignItems: 'flex-end'
  }
});