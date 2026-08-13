import { Tabs } from "expo-router";
import { BookOpen, Home, ScrollText, Settings } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 4,
          fontWeight: "600",
        },

        tabBarStyle: {
          height: 78,
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

          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : styles.inactiveIcon}>
              <Home size={20} color={color} />
            </View>
          ),
        }}
      />

      {/* LOGS */}

      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",

          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : styles.inactiveIcon}>
              <ScrollText size={20} color={color} />
            </View>
          ),
        }}
      />

      {/* REFERENCE */}

      <Tabs.Screen
        name="references"
        options={{
          title: "Reference",

          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : styles.inactiveIcon}>
              <BookOpen size={20} color={color} />
            </View>
          ),
        }}
      />

      {/* SETTINGS */}

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",

          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : styles.inactiveIcon}>
              <Settings size={20} color={color} />
            </View>
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

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: "#edebf8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  inactiveIcon: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
