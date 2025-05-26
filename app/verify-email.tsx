// /app/verify-email.tsx
import { View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { BackgroundImage } from "~/components/widgets";
import { Input, Text, Button } from "~/components/ui";
// import { api } from '~/lib/api'; // your API client

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const onVerify = async () => {
    // await api.verifyEmail({ code });
    // on success, you might auto-sign in or let user login:
    router.replace("/login");
  };

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-center p-4">
      <BackgroundImage source={require("~/assets/images/bg-public.png")} />
      <View className="w-full flex-col gap-4 mt-32">
        <Text className="text-white">
          Enter the code we sent to your email:
        </Text>

        <Input
          placeholder="e:123456"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <Button onPress={onVerify}>
          <Text>Verify</Text>
        </Button>
      </View>
    </View>
  );
}
