import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, Platform, Pressable, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import {
  Calendar,
  DirectInbox,
  Home,
  Notification,
  Profile,
  Star,
  SearchNormal,
} from "iconsax-react-nativejs";
import { Text } from "~/components/ui";
import { TopBarIconProps } from "~/types";
import { cn } from "~/lib/utils";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function TabsLayout() {
  const hasMounted = React.useRef(false);
  const router = useRouter();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: isDarkColorScheme ? "#a855f7" : "#7e22ce",
          tabBarInactiveTintColor: isDarkColorScheme ? "#fff" : "#000",
          tabBarLabel: (props) => {
            return (
              <Text
                font="Manrope_600SemiBold"
                className={cn(
                  "mt-1.5 font-semibold text-[12px] leading-[18px]",
                  props.focused
                    ? "text-purple-500 dark:text-purple-700"
                    : "text-foreground"
                )}
              >
                {props.children}
              </Text>
            );
          },
          tabBarStyle: {
            backgroundColor: !isDarkColorScheme ? "#f9f9f9" : "#212121",
            paddingTop: 10,
          },
          header: (props) => {
            return (
              <View className="mt-14 flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("~/assets/images/mini-logo.png")}
                    className="w-[24px] aspect-square"
                    resizeMode="cover"
                  />
                  <Text
                    font="Manrope_700Bold"
                    className="text-foreground font-bold text-[18px] leading-[26px]"
                  >
                    Cinephoria
                  </Text>
                </View>
                <View className="flex-row items-center gap-5">
                  <Pressable onPress={() => router.navigate("/search")}>
                    <SearchNormal
                      size={24}
                      color={isDarkColorScheme ? "#fff" : "#000"}
                    />
                  </Pressable>
                  <Pressable onPress={() => router.navigate("/notifications")}>
                    <Notification
                      size={24}
                      color={isDarkColorScheme ? "#fff" : "#000"}
                    />
                  </Pressable>
                  <ThemeToggle />
                </View>
              </View>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }: TopBarIconProps) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="agenda"
          options={{
            title: "Agenda",
            tabBarIcon: ({ color, size }: TopBarIconProps) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: "Discover",
            tabBarIcon: ({ color, size }: TopBarIconProps) => (
              <View className="w-[48px] h-[48px] my-auto rounded-lg bg-purple-500 dark:bg-purple-700 flex items-center justify-center">
                <Star size={size} color={"#fff"} />
              </View>
            ),
            tabBarLabel: () => null, // Hide label for discover tab
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color, size, focused }: TopBarIconProps) => (
              <DirectInbox size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }: TopBarIconProps) => (
              <Profile size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarItemStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="media/[id]"
          options={{
            title: "Media Details",
            headerShown: false,
            tabBarItemStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="prefiltered/[id]"
          options={{
            title: "Pre Filtered Search",
            tabBarItemStyle: {
              display: "none",
            },
          }}
        />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
