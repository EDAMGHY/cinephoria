// /app/forgot-password.tsx
import { View } from "react-native";
import { Button, Text } from "~/components/ui";
import { useRouter } from "expo-router";
import { BackgroundImage } from "~/components/widgets";

export default function ForgetPasswordScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-center">
      <BackgroundImage source={require("~/assets/images/pattern.png")} />
      <Text className="text-white"> Forgot Password</Text>

      <View className="w-full flex-col gap-4 p-7">
        <Button onPress={() => router.push("/login")}>
          <Text className="text-white"> Sign in</Text>
        </Button>
      </View>
    </View>
  );
}
