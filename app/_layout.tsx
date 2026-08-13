import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="dosageCalc" options={{ headerShown: false }} />

        <Stack.Screen name="arrest" options={{ headerShown: false }} />

        <Stack.Screen name="airwaySize" options={{ headerShown: false }} />

        <Stack.Screen name="difficult" options={{ headerShown: false }} />

        <Stack.Screen name="emergencies" options={{ headerShown: false }} />

        <Stack.Screen name="anticoag" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
