// /app/login.tsx
import { Image, Pressable, View } from "react-native";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { Check, Eye, EyeSlash, TickCircle } from "iconsax-react-nativejs";
import { Introduction, TopHeader } from "~/components/widgets";
import { useState } from "react";

export default function RegisterStep2Screen() {
  const router = useRouter();
  const [isEyeShown, setIsEyeShown] = useState(false);
  const { next, back, state, updateField } = useSignUp();

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-around p-4">
      <TopHeader onBack={back} />

      {/* <BackgroundImage source={require("~/assets/images/pattern.png")} /> */}
      <View className="w-full flex-col gap-16">
        <Introduction
          title="Your Personal Info"
          description="Create your account to get unlock full Encore experience."
        />

        <View className="w-full flex-col gap-4">
          <View className="relative w-full">
            <Input
              placeholder="Password"
              className="pr-12"
              secureTextEntry={!isEyeShown}
              value={state.password}
              onChangeText={(value) => updateField("password", value)}
            />
            <Pressable
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setIsEyeShown((prev) => !prev)}
            >
              {isEyeShown ? (
                <Eye color="#fff" size={24} variant="Outline" />
              ) : (
                <EyeSlash color="#fff" size={24} variant="Outline" />
              )}
            </Pressable>
          </View>

          <View className="flex-col gap-2">
            <View className="flex-row gap-2">
              <View className="flex-none">
                <TickCircle size={20} color="#4B4B4B" />
              </View>
              <Text className="text-gray-500 flex-1 text-sm shrink-0">
                Password must be at least 8 characters long and contain at least
                one number.
              </Text>
            </View>

            <View className="flex-row gap-2">
              <View className="flex-none">
                <TickCircle size={20} color="#4B4B4B" />
              </View>
              <Text className="text-gray-500 flex-1 text-sm shrink-0">
                Password must be at least 8 characters long and contain at least
                one number.
              </Text>
            </View>
            <View className="flex-row gap-2">
              <View className="flex-none">
                <TickCircle size={20} color="#4B4B4B" />
              </View>
              <Text className="text-gray-500 flex-1 text-sm shrink-0">
                Password must be at least 8 characters long and contain at least
                one number.
              </Text>
            </View>
          </View>
          <View className="flex-col justify-between gap-4">
            <Button
              variant={state.password ? "default" : "gray"}
              disabled={!state.password}
              onPress={() => {
                next();
                router.push("/(signup-steps)/register-step3");
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
