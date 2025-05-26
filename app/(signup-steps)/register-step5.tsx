// /app/login.tsx
import { Image, Pressable, View } from "react-native";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { TopHeader } from "~/components/widgets";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Trash } from "iconsax-react-nativejs";

export default function RegisterStep5Screen() {
  const router = useRouter();
  const { next, back, state, updateField } = useSignUp();

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      updateField("profilePic", result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 relative items-center dark:bg-custom-black bg-white justify-around p-4">
      {/* <BackgroundImage source={require("~/assets/images/pattern.png")} /> */}
      <TopHeader onBack={back} />
      <View className="w-full flex-col gap-16">
        <View className="max-w-[250px] mx-auto flex-col gap-4">
          <Text className="text-center text-2xl font-bold">
            Profile Picture
          </Text>
        </View>
        <View className="w-full flex-col gap-6">
          <Pressable
            onPress={pickImage}
            className="relative w-full justify-center items-center aspect-video gap-6 bg-[#2C2C2E] rounded-xl border-2 border-dashed border-[#3A3A3C]"
          >
            {image && (
              <Pressable
                className="absolute top-4 right-4"
                onPress={() => {
                  setImage(null);
                  updateField("profilePic", "");
                }}
              >
                <Trash color="#fff" size={24} />
              </Pressable>
            )}
            <Image
              source={
                image ? { uri: image } : require("~/assets/images/avatar.png")
              }
              className="w-[80px] h-[80px] rounded-full"
              resizeMode="cover"
            />
            <View className="flex-col gap-3">
              <Text className="text-center text-lg text-gray-300">
                <Text className="text-secondary">Upload</Text> Picture
              </Text>
              <Text className="text-gray-300">JPG , PNG, GIF</Text>
            </View>
          </Pressable>

          <View className="flex-col justify-between gap-6">
            <Button
              onPress={() => {
                next();
                router.push("/(signup-steps)/register-laststep");
              }}
            >
              <Text className="text-white"> Continue</Text>
            </Button>
            <Button
              variant={"gray"}
              onPress={() => {
                updateField("profilePic", ""); // Reset the profile picture
                next();
                router.push("/(signup-steps)/register-laststep");
              }}
            >
              <Text className="text-white"> Skip</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
