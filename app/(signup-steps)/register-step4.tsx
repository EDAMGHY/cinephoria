// /app/login.tsx
import { Image, View } from "react-native";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import { Introduction, TopHeader } from "~/components/widgets";

export default function RegisterStep4Screen() {
  const router = useRouter();
  const { step, next, back, state, updateField } = useSignUp();

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-around p-4">
      <TopHeader onBack={back} />

      {/* <BackgroundImage source={require("~/assets/images/pattern.png")} /> */}
      <View className="w-full flex-col gap-16">
        <Introduction
          title="Create a Username"
          description="Create a unique username for your profile."
        />

        <View className="w-full flex-col gap-4">
          <Input
            placeholder="Username"
            value={state.username}
            keyboardType="default"
            textContentType="nickname"
            autoCapitalize="none"
            onChangeText={(text) => updateField("username", text)}
          />
          <View className="flex-col justify-between gap-4">
            <Button
              variant={state.username ? "default" : "gray"}
              disabled={!state.username}
              onPress={() => {
                next();
                router.push("/(signup-steps)/register-step5");
              }}
            >
              <Text className="text-white"> Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
