// /app/login.tsx
import { Image, View } from "react-native";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { Introduction, TopHeader } from "~/components/widgets";

export default function RegisterLastStepScreen() {
  const router = useRouter();
  const { next, back, state } = useSignUp();

  console.log("all data ", state);
  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-around p-4">
      {/* <BackgroundImage source={require("~/assets/images/pattern.png")} /> */}
      <TopHeader onBack={back} />
      <View className="w-full flex-col justify-between py-10 h-4/5 gap-16">
        <Introduction
          title="Account Created Successfully"
          description="Your account has being created successfully. Login to your account
            and discover best product offers."
        />

        <Image
          source={require("~/assets/images/check-image.png")}
          className="w-[110px] h-[110px] mx-auto"
          resizeMode="cover"
        />
        <View className="flex-col justify-between gap-6">
          <Button
            onPress={() => {
              next();
              router.push("/(tabs)");
            }}
          >
            <Text className="text-white"> Start Browsing</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
