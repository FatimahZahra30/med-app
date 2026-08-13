import { Tabs } from "expo-router";
import { BookOpen, Home, ScrollText, Settings } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarStyle: {
          height: 68,
          paddingTop: 6,
          paddingBottom: 8,
        },
      }}
    >
      {/* HOME */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* LOGS */}

      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",

          tabBarIcon: ({ color, size }) => (
            <ScrollText size={size} color={color} />
          ),
        }}
      />

      {/* REFERENCE */}

      <Tabs.Screen
        name="references"
        options={{
          title: "Reference",

          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />

      {/* SETTINGS */}

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",

          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />

      {/* OTHER SCREENS — NOT BOTTOM TABS */}

      <Tabs.Screen
        name="arrest"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="dosageCalc"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="airwaySize"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="difficult"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="emergencies"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="anticoag"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
