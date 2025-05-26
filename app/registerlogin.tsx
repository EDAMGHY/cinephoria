// /app/registerlogin.tsx
import { Image, View } from "react-native";
import { Button, Text } from "~/components/ui";
import { useRouter } from "expo-router";
import { BackgroundImage } from "~/components/widgets";
import { Google, Apple } from "iconsax-react-nativejs";
import { useSignUp } from "~/context";

export default function RegisterLoginScreen() {
  const router = useRouter();
  const { reset } = useSignUp();

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-center">
      <BackgroundImage source={require("~/assets/images/pattern.png")} />
      <View className="w-full h-full py-20 flex justify-between flex-col gap-10 px-7">
        <View className="w-4/5 mx-auto aspect-square">
          <Image
            source={require("~/assets/images/cine-logo.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="w-full mb-32 flex-col gap-4">
          <View className="flex-col justify-between gap-4">
            <Button onPress={() => router.push("/login")}>
              <Text className="text-white"> Sign in</Text>
            </Button>
            <Text className="text-center">Or</Text>
            <View className="flex-col gap-4">
              <Button
                variant="white"
                className="flex flex-row items-center gap-2"
              >
                <Google color="#000" variant="Bold" size={32} />
                <Text>Sign in with Google</Text>
              </Button>
              <Button
                variant="outline"
                className="text-white flex-row items-center gap-2"
              >
                <Apple color="#fff" variant="Bold" size={32} />
                <Text>Sign in with Apple ID</Text>
              </Button>
            </View>
            <View className="items-center justify-center flex-row gap-2">
              <Text>Don’t have an account Yet? </Text>
              <Button
                variant="link"
                className="self-start"
                size={"custom"}
                onPress={() => (
                  reset(), router.replace("/(signup-steps)/register-step1")
                )}
              >
                <Text className="text-secondary font-bold">Sign up</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
