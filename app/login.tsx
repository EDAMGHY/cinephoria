// /app/login.tsx
import { Image, Pressable, View } from "react-native";
import { useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { BackgroundImage } from "~/components/widgets";
import { Google, Apple, Eye, EyeSlash } from "iconsax-react-nativejs";
import { useSignUp } from "~/context";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { reset } = useSignUp();

  const router = useRouter();
  const [state, setState] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isEyeShown, setIsEyeShown] = useState(false);

  const onSubmit = async () => {
    if (!state.email || !state.password) {
      alert("Please fill in all fields");
      return;
    }

    await signIn(state.email, state.password);

    router.push("/");
  };

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
          <Input
            placeholder="Email / Username"
            value={state.email}
            onChangeText={(value) =>
              setState((oldState) => ({ ...oldState, email: value }))
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View className="relative w-full">
            <Input
              placeholder="Password"
              className="pr-12"
              secureTextEntry={!isEyeShown}
              value={state.password}
              onChangeText={(value) =>
                setState((oldState) => ({ ...oldState, password: value }))
              }
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
          <Button
            variant="link"
            className="self-start"
            size={"custom"}
            onPress={() => router.push("/forgot-password")}
          >
            <Text className="text-primary">Forgot Password ?</Text>
          </Button>

          <View className="w-full mb-32 flex-col gap-4">
            <View className="flex-col justify-between gap-4">
              <Button onPress={onSubmit}>
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
    </View>
  );
}
