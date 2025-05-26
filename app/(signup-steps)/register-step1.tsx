// /app/login.tsx
import { Image, View } from "react-native";
import { useState } from "react";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import { Introduction, TopHeader } from "~/components/widgets";

export default function RegisterStep1Screen() {
  const router = useRouter();
  const { step, next, back, state, updateField } = useSignUp();

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-around p-4">
      <TopHeader onBack={back} />
      {/* <BackgroundImage source={require("~/assets/images/pattern.png")} /> */}
      <View className="w-full flex-col gap-16">
        <Introduction
          title="Your Email Address"
          description="Create your account to get unlock full Encore experience."
        />

        <View className="w-full flex-col gap-4">
          <Input
            placeholder="Email"
            value={state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => updateField("email", text)}
          />
          <View className="flex-col justify-between gap-4">
            <Button
              variant={state.email ? "default" : "gray"}
              disabled={!state.email}
              onPress={() => {
                next();
                router.push("/(signup-steps)/register-step2");
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
