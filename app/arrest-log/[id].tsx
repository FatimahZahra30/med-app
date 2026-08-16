import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Clock,
  FileDown,
  HeartPulse,
  Syringe,
  Zap,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { theme } from "@/constants/theme";
import { ArrestLog, getArrestLogs } from "@/database/arrestLogs";
import { ArrestEvent } from "@/types/cardiacArrest";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArrestLogDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [log, setLog] = useState<ArrestLog | null>(null);

  useEffect(() => {
    if (!id) return;

    const logs = getArrestLogs();
    const savedLog = logs.find((item) => item.id === id);

    setLog(savedLog ?? null);
  }, [id]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatClockTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!log) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Log not found</Text>

        <Text style={styles.notFoundText}>
          This session could not be found on this device.
        </Text>
      </View>
    );
  }

  const events = log.events as ArrestEvent[];

  const shockCount = events.filter((event) => event.type === "shock").length;

  const adrenalineCount = events.filter(
    (event) => event.type === "adrenaline",
  ).length;

  const rhythmCount = events.filter((event) => event.type === "rhythm").length;

  const roscAchieved = events.some((event) => event.type === "rosc");

  const handleDownloadPDF = async () => {
    if (!log) return;

    const events = log.events as ArrestEvent[];

    const formatDuration = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds,
      ).padStart(2, "0")}`;
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-MY", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const formatClockTime = (dateString: string) => {
      return new Date(dateString).toLocaleTimeString("en-MY", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const shockCount = events.filter((event) => event.type === "shock").length;

    const adrenalineCount = events.filter(
      (event) => event.type === "adrenaline",
    ).length;

    const rhythmCount = events.filter(
      (event) => event.type === "rhythm",
    ).length;

    const roscAchieved = events.some((event) => event.type === "rosc");

    const clockIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="#64748B" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <polyline points="12 7 12 12 15 14"/>
      </svg>
    `;

    const shockIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="#DC2626" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
      </svg>
    `;

    const syringeIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="#D97706" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 2l4 4"/>
        <path d="M17 7l-2-2"/>
        <path d="M3 21l9-9"/>
        <path d="M7 17l-4 4"/>
        <path d="M13 6l5 5"/>
        <path d="M8 13l3 3"/>
        <path d="M14 4l6 6"/>
      </svg>
    `;

    const heartIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="#7C3AED" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.8 8.5c0 5-8.8 11-8.8 11S3.2 13.5 3.2 8.5
        A4.5 4.5 0 0 1 12 6.2a4.5 4.5 0 0 1 8.8 2.3z"/>
      </svg>
    `;

    const heartPulseIcon = `
      <svg width="26" height="26" viewBox="0 0 24 24"
        fill="none" stroke="#DC2626" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.8 8.5c0 5-8.8 11-8.8 11S3.2 13.5 3.2 8.5
        A4.5 4.5 0 0 1 12 6.2a4.5 4.5 0 0 1 8.8 2.3z"/>
        <path d="M3 12h4l2-4 3 8 2-4h4"/>
      </svg>
    `;

    const eventRows = events
      .map(
        (event, index) => `
          <div class="timeline-item">

            <!-- ELAPSED TIME -->
            <div class="timeline-left">
              <div class="elapsed">
                ${formatDuration(event.elapsedTime)}
              </div>
            </div>

            <!-- DOT + LINE -->
            <div class="timeline-track">

              <div class="timeline-dot"></div>

              ${
                index < events.length - 1
                  ? `<div class="timeline-line"></div>`
                  : ""
              }

            </div>

            <!-- EVENT CONTENT -->
            <div class="event-content">

              <div class="event-description">
                ${event.description}
              </div>

              <div class="event-time">
                ${formatClockTime(event.timestamp)}
              </div>

            </div>

          </div>
        `,
      )
      .join("");

    const html = `
      <!DOCTYPE html>

      <html>

        <head>

          <meta
            name="viewport"
            content="width=device-width,
            initial-scale=1.0"
          />

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 36px;

              font-family: Arial, Helvetica, sans-serif;

              color: #0F172A;

              background: #F8FAFC;

              font-size: 14px;

              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .header {
              display: flex;
              align-items: center;

              margin-bottom: 26px;
            }

            .header-icon {
              width: 58px;
              height: 58px;

              border-radius: 17px;

              background: #FEF2F2;

              border: 1px solid #FECACA;

              display: flex;
              align-items: center;
              justify-content: center;

              margin-right: 15px;
            }

            .title {
              font-size: 29px;
              font-weight: 800;

              margin: 0;

              color: #0F172A;
            }

            .subtitle {
              margin-top: 6px;

              font-size: 15px;

              color: #64748B;
            }

            .outcome {
              display: flex;
              align-items: center;

              padding: 18px;

              background: #f0fbf6;

              border: 1px solid #A7F3D0;

              border-radius: 16px;

              margin-bottom: 30px;
            }

            .outcome-dot {
              width: 11px;
              height: 11px;

              border-radius: 50%;

              background: #16A34A;

              margin-right: 13px;
            }

            .outcome-label {
              font-size: 11px;

              font-weight: 800;

              letter-spacing: 1px;

              color: #15803D;
            }

            .outcome-text {
              margin-top: 4px;

              font-size: 18px;

              font-weight: 700;

              color: #166534;
            }

            .section-title {
              font-size: 13px;

              font-weight: 800;

              letter-spacing: 1px;

              color: #475569;

              margin-bottom: 15px;
            }

            .stats {
              display: grid;

              grid-template-columns: 1fr 1fr;

              gap: 12px;

              margin-bottom: 14px;
            }

            .stat {
              padding: 17px;

              border-radius: 16px;

              background: #fbfcfd;

              border: 1px solid #CBD5E1;
            }

            .stat-icon {
              width: 38px;
              height: 38px;

              border-radius: 11px;

              background: #FFFFFF;

              border: 1px solid #E2E8F0;

              display: flex;
              align-items: center;
              justify-content: center;

              margin-bottom: 10px;
            }

            .stat-value {
              font-size: 25px;

              font-weight: 800;

              color: #0F172A;
            }

            .stat-label {
              margin-top: 3px;

              font-size: 13px;

              font-weight: 600;

              color: #475569;
            }

            .times {
              background: #fbfcfd;

              border: 1px solid #CBD5E1;

              border-radius: 16px;

              padding: 7px 17px;
            }

            .time-row {
              padding: 12px 0;
            }

            .time-label {
              font-size: 11px;

              font-weight: 800;

              letter-spacing: .8px;

              color: #64748B;
            }

            .time-value {
              margin-top: 4px;

              font-size: 15px;

              font-weight: 700;

              color: #1E293B;
            }

            .divider {
              height: 1px;

              background: #CBD5E1;
            }

            .timeline-section {
              margin-top: 32px;
            }

            .timeline {
              margin-top: 5px;

              background: #fbfcfd;

              border: 1px solid #CBD5E1;

              border-radius: 16px;

              padding: 30px 16px 5px;
            }

            .timeline-item {
              display: flex;

              min-height: 68px;
            }

            /* ELAPSED TIME */

            .timeline-left {
              width: 58px;

              display: flex;

              align-items: flex-start;

              justify-content: flex-end;

              padding-top: 1px;

              flex-shrink: 0;
            }

            .elapsed {
              font-size: 13px;

              font-weight: 800;

              color: #DC2626;

              white-space: nowrap;
            }

            /* DOT + CONNECTING LINE */

            .timeline-track {
              width: 10px;

              margin-left: 11px;

              position: relative;

              flex-shrink: 0;

              align-self: stretch;
            }

            .timeline-dot {
              width: 10px;
              height: 10px;

              border-radius: 50%;

              background: #DC2626;

              position: absolute;

              top: 3px;
              left: 0;

              z-index: 2;
            }

            .timeline-line {
              position: absolute;

              top: 13px;
              bottom: 0;

              left: 4px;

              width: 1px;

              background: #CBD5E1;
            }

            /* EVENT CONTENT */

            .event-content {
              flex: 1;

              margin-left: 13px;

              padding-bottom: 20px;

              min-width: 0;
            }

            .event-description {
              font-size: 15px;

              font-weight: 700;

              line-height: 21px;

              color: #1E293B;
            }

            .event-time {
              margin-top: 4px;

              font-size: 12px;

              color: #64748B;
            }

            .footer {
              margin-top: 32px;

              padding-top: 16px;

              border-top: 1px solid #CBD5E1;

              font-size: 10px;

              color: #64748B;

              text-align: center;
            }
          </style>

        </head>

        <body>

          <div class="header">

            <div class="header-icon">
              ${heartPulseIcon}
            </div>

            <div>
              <div class="title">
                Cardiac Arrest
              </div>

              <div class="subtitle">
                Completed ${formatDate(log.completedAt)}
                · ${formatClockTime(log.completedAt)}
              </div>
            </div>

          </div>

          <div class="outcome">

            <div class="outcome-dot"></div>

            <div>

              <div class="outcome-label">
                OUTCOME
              </div>

              <div class="outcome-text">
                ${roscAchieved ? "ROSC achieved" : "Algorithm completed"}
              </div>

            </div>

          </div>

          <div class="section-title">
            SESSION SUMMARY
          </div>

          <div class="stats">

            <div class="stat">

              <div class="stat-icon">
                ${clockIcon}
              </div>

              <div class="stat-value">
                ${formatDuration(log.duration)}
              </div>

              <div class="stat-label">
                Duration
              </div>

            </div>

            <div class="stat">

              <div class="stat-icon">
                ${shockIcon}
              </div>

              <div class="stat-value">
                ${shockCount}
              </div>

              <div class="stat-label">
                Shocks
              </div>

            </div>

            <div class="stat">

              <div class="stat-icon">
                ${syringeIcon}
              </div>

              <div class="stat-value">
                ${adrenalineCount}
              </div>

              <div class="stat-label">
                Adrenaline
              </div>

            </div>

            <div class="stat">

              <div class="stat-icon">
                ${heartIcon}
              </div>

              <div class="stat-value">
                ${rhythmCount}
              </div>

              <div class="stat-label">
                Rhythm Checks
              </div>

            </div>

          </div>

          <div class="times">

            <div class="time-row">

              <div class="time-label">
                STARTED
              </div>

              <div class="time-value">
                ${formatDate(log.startedAt)}
                · ${formatClockTime(log.startedAt)}
              </div>

            </div>

            <div class="divider"></div>

            <div class="time-row">

              <div class="time-label">
                COMPLETED
              </div>

              <div class="time-value">
                ${formatDate(log.completedAt)}
                · ${formatClockTime(log.completedAt)}
              </div>

            </div>

          </div>

          <div class="timeline-section">

            <div class="section-title">
              EVENT TIMELINE
            </div>

            <div class="timeline">
              ${eventRows}
            </div>

          </div>

          <div class="footer">
            Anaesthesia Toolkit · Cardiac Arrest Session Record
          </div>

        </body>

      </html>
    `;

    if (Platform.OS === "web") {
      const { default: html2pdf } = await import("html2pdf.js");

      const container = document.createElement("div");

      container.innerHTML = html;

      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "794px";

      document.body.appendChild(container);

      const options = {
        margin: 0,
        filename: `cardiac-arrest-${log.id}.pdf`,
        image: {
          type: "jpeg" as const,
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "px" as const,
          format: "a4" as const,
          orientation: "portrait" as const,
        },
      };

      try {
        await html2pdf().set(options).from(container).save();
      } finally {
        document.body.removeChild(container);
      }

      return;
    }

    const { uri } = await Print.printToFileAsync({
      html,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Save Cardiac Arrest Log",
        UTI: "com.adobe.pdf",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.topHeader}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <ArrowLeft
            size={21}
            strokeWidth={2.5}
            color={theme.colors.foreground}
          />
        </Pressable>

        <Text style={styles.topHeaderTitle}>Session Log</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <HeartPulse size={25} color="#DC2626" />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Cardiac Arrest</Text>

            <Text style={styles.subtitle}>
              Completed {formatDate(log.completedAt)} ·{" "}
              {formatClockTime(log.completedAt)}
            </Text>
          </View>
        </View>

        {/* OUTCOME */}

        <View style={styles.outcomeCard}>
          <View style={styles.outcomeDot} />

          <View>
            <Text style={styles.outcomeLabel}>OUTCOME</Text>

            <Text style={styles.outcomeText}>
              {roscAchieved ? "ROSC achieved" : "Algorithm completed"}
            </Text>
          </View>
        </View>

        {/* SESSION SUMMARY */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SESSION SUMMARY</Text>

          <View style={styles.statsGrid}>
            {/* DURATION */}

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Clock size={19} color="#64748B" />
              </View>

              <Text style={styles.statValue}>
                {formatDuration(log.duration)}
              </Text>

              <Text style={styles.statLabel}>Total arrest time</Text>
            </View>

            {/* SHOCKS */}

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Zap size={19} color="#DC2626" />
              </View>

              <Text style={styles.statValue}>{shockCount}</Text>

              <Text style={styles.statLabel}>Shocks</Text>
            </View>

            {/* ADRENALINE */}

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Syringe size={19} color="#D97706" />
              </View>

              <Text style={styles.statValue}>{adrenalineCount}</Text>

              <Text style={styles.statLabel}>Adrenaline</Text>
            </View>

            {/* RHYTHM CHECKS */}

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <HeartPulse size={19} color="#7C3AED" />
              </View>

              <Text style={styles.statValue}>{rhythmCount}</Text>

              <Text style={styles.statLabel}>Rhythm Checks</Text>
            </View>
          </View>

          {/* SESSION TIMES */}

          <View style={styles.timeCard}>
            <View style={styles.timeRow}>
              <View>
                <Text style={styles.timeLabel}>Started</Text>

                <Text style={styles.timeValue}>
                  {formatDate(log.startedAt)} · {formatClockTime(log.startedAt)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.timeRow}>
              <View>
                <Text style={styles.timeLabel}>Completed</Text>

                <Text style={styles.timeValue}>
                  {formatDate(log.completedAt)} ·{" "}
                  {formatClockTime(log.completedAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* EVENT TIMELINE */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>EVENT TIMELINE</Text>

          <View style={styles.timeline}>
            {events.map((event, index) => {
              const isLast = index === events.length - 1;

              return (
                <View key={event.id} style={styles.timelineItem}>
                  {/* LEFT SIDE */}

                  <View style={styles.timelineLeft}>
                    <Text style={styles.elapsed}>
                      {formatDuration(event.elapsedTime)}
                    </Text>
                  </View>

                  {/* DOT + CONNECTING LINE */}

                  <View style={styles.timelineTrack}>
                    <View style={styles.eventDot} />

                    {!isLast && <View style={styles.timelineLine} />}
                  </View>

                  {/* EVENT CONTENT */}

                  <View style={styles.eventContent}>
                    <Text style={styles.eventDescription}>
                      {event.description}
                    </Text>

                    <Text style={styles.eventTime}>
                      {formatClockTime(event.timestamp)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* DOWNLOAD */}

        <Pressable style={styles.downloadButton} onPress={handleDownloadPDF}>
          <FileDown size={19} color="#FFFFFF" />

          <Text style={styles.downloadButtonText}>Download as PDF</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 18,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FECACA",

    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.foreground,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: theme.colors.mutedForeground,
  },

  /* OUTCOME */

  outcomeCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F0FDF4",

    borderWidth: 1,
    borderColor: "#BBF7D0",

    borderRadius: 16,

    padding: 15,
  },

  outcomeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,

    backgroundColor: "#16A34A",

    marginRight: 12,
  },

  outcomeLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,

    color: "#15803D",
  },

  outcomeText: {
    marginTop: 2,

    fontSize: 16,
    fontWeight: "700",

    color: "#166534",
  },

  /* SECTIONS */

  section: {
    gap: 12,
  },

  sectionCard: {
    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,

    borderRadius: 20,

    padding: 18,

    ...theme.shadow.card,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,

    color: theme.colors.mutedForeground,

    marginBottom: 4,
  },

  /* STATS */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statCard: {
    width: "48%",
    minHeight: 105,

    borderRadius: 16,

    backgroundColor: "#ffffff",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    padding: 14,
  },

  statIcon: {
    width: 34,
    height: 34,

    borderRadius: 10,

    backgroundColor: "#f6f5fc",

    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    marginTop: 8,

    fontSize: 22,
    fontWeight: "800",

    color: "#0F172A",
  },

  statLabel: {
    marginTop: 1,

    fontSize: 12,
    fontWeight: "600",

    color: "#64748B",
  },

  /* START / COMPLETION TIMES */

  timeCard: {
    marginTop: 2,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 15,
    paddingVertical: 4,
  },

  timeRow: {
    paddingVertical: 11,
  },

  timeLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,

    color: "#94A3B8",

    textTransform: "uppercase",
  },

  timeValue: {
    marginTop: 3,

    fontSize: 14,
    fontWeight: "700",

    color: "#334155",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  /* TIMELINE */

  timeline: {
    marginTop: 8,
  },

  timelineItem: {
    flexDirection: "row",
    alignItems: "stretch",

    minHeight: 58,
  },

  timelineLeft: {
    width: 50,

    alignItems: "flex-end",

    paddingTop: 1,
  },

  elapsed: {
    fontSize: 12,
    fontWeight: "800",

    color: "#DC2626",

    fontVariant: ["tabular-nums"],
  },

  /*
   * This is the important part.
   *
   * The dot and line now live inside their own vertical track.
   * The track stretches with the event content, so a long/wrapped
   * description won't break the connecting line.
   */

  timelineTrack: {
    width: 9,

    marginLeft: 10,

    alignItems: "center",

    position: "relative",
  },

  eventDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: "#DC2626",

    marginTop: 3,

    zIndex: 2,
  },

  timelineLine: {
    position: "absolute",

    top: 12,
    bottom: 0,

    width: 1,

    backgroundColor: "#E2E8F0",
  },

  eventContent: {
    flex: 1,

    marginLeft: 12,

    paddingBottom: 16,

    minWidth: 0,
  },

  eventDescription: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,

    color: "#334155",
  },

  eventTime: {
    marginTop: 3,

    fontSize: 11,

    color: "#94A3B8",
  },

  /* NOT FOUND */

  notFoundContainer: {
    flex: 1,

    backgroundColor: theme.colors.background,

    alignItems: "center",
    justifyContent: "center",

    padding: 30,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: "800",

    color: theme.colors.foreground,
  },

  notFoundText: {
    marginTop: 6,

    fontSize: 14,

    color: theme.colors.mutedForeground,

    textAlign: "center",
  },

  /* DOWNLOAD */

  downloadButton: {
    minHeight: 52,
    borderRadius: 15,

    backgroundColor: "#44378e",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 8,

    marginTop: 2,

    ...theme.shadow.card,
  },

  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  topHeader: {
    height: 64,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.colors.background,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,

    position: "relative",
  },

  topHeaderTitle: {
    position: "absolute",
    left: 0,
    right: 0,

    textAlign: "center",

    fontSize: 18,
    fontWeight: "800",

    color: theme.colors.foreground,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,

    zIndex: 2,
  },
});
