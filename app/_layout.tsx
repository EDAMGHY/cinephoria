// /app/_layout.tsx
import "~/global.css";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "~/context/AuthContext";
import { Storage } from "~/lib/utils";
import { SignupProvider } from "~/context";
import { useFonts } from "@expo-google-fonts/manrope/useFonts";
import { Manrope_200ExtraLight } from "@expo-google-fonts/manrope/200ExtraLight";
import { Manrope_300Light } from "@expo-google-fonts/manrope/300Light";
import { Manrope_400Regular } from "@expo-google-fonts/manrope/400Regular";
import { Manrope_500Medium } from "@expo-google-fonts/manrope/500Medium";
import { Manrope_600SemiBold } from "@expo-google-fonts/manrope/600SemiBold";
import { Manrope_700Bold } from "@expo-google-fonts/manrope/700Bold";
import { Manrope_800ExtraBold } from "@expo-google-fonts/manrope/800ExtraBold";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function Navigator() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const checkForOnboarding = async () => {
    const item = await Storage.get("onboarding");
    console.log("itemitemitemitem", item);
    if (!item) {
      router.replace("/onboarding");
    }
  };

  // Once we know whether there is a user, redirect:
  useEffect(() => {
    checkForOnboarding();
    console.log("emailemail", user);
    if (!loading) {
      if (!user) {
        router.replace("/(tabs)"); // go to your tabbed app
      } else {
        router.replace("/registerlogin"); // show login/register
      }
    }
  }, [user, loading]);

  return null; // we’re navigating imperatively
}

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    console.log("fonts not loaded");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SignupProvider>
        <AuthProvider>
          <Navigator />
          <Stack screenOptions={{ headerShown: false }}>
            {/* Auth screens */}
            <Stack.Screen name="login" />
            <Stack.Screen name="(signup-steps)/register-step1" />
            <Stack.Screen name="(signup-steps)/register-step2" />
            <Stack.Screen name="(signup-steps)/register-step3" />
            <Stack.Screen name="(signup-steps)/register-step4" />
            <Stack.Screen name="(signup-steps)/register-step5" />
            <Stack.Screen name="(signup-steps)/register-laststep" />
            <Stack.Screen name="registerlogin" />
            <Stack.Screen name="verify-email" />
            <Stack.Screen name="verify-otp" />
            {/* Main app group */}
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthProvider>
      </SignupProvider>
    </QueryClientProvider>
  );
}
