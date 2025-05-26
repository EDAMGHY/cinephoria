import { useRouter } from "expo-router";
import { ArrowLeft, Filter, Search } from "lucide-react-native";
import {
  Dimensions,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { genres } from "~/api/genres";
import { Button, Image, Input, Text } from "~/components/ui";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const SearchScreen = () => {
  const router = useRouter();
  return (
    <ScrollView
      className="flex-1 mt-14"
      contentContainerClassName="px-4 flex-col gap-4"
    >
      <View className="flex-row items-center justify-start">
        <Button
          onPress={() => router.back?.()}
          variant="outline"
          size={"custom"}
          className="p-2 !bg-transparent !border-transparent"
        >
          <ArrowLeft size={24} color="#fff" />
        </Button>
        <Text
          className="text-center text-card-foreground text-2xl"
          style={{
            width: width - 110,
          }}
          font="Manrope_700Bold"
        >
          Search
        </Text>
      </View>

      <View className="relative border border-input rounded flex-row items-center justify-start">
        <Pressable className="px-4">
          <Search size={24} color="#8E8E93" />
        </Pressable>
        <Input
          placeholder="Search movies/series"
          className="flex-1 !px-0 border-0"
        />
        <View className="absolute w-px h-1/2 top-3.5 right-[45px] bg-[#636366] -translate-y-1/2" />
        <Pressable className="place-self-end place px-4">
          <Filter size={24} color="#D3B52C" />
        </Pressable>
      </View>
      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Categories
        </Text>

        <View className="flex-row items-center gap-4 flex-wrap">
          {genres.map((genre, idx) => (
            <View
              className="relative rounded-xl overflow-hidden aspect-video max-h-[70px] flex-col items-center gap-2"
              key={idx + 1}
              style={{ width: Math.floor(width / 2) - 21 }}
            >
              <Image
                source={require("~/assets/images/movie.png")}
                className="w-full absolute inset-0 h-full -z-1"
                resizeMode="cover"
              />
              <View className="absolute inset-0 flex justify-center items-start p-6 z-[10]">
                <LinearGradient
                  colors={["#212121", "rgba(33,33,33,0)"]}
                  locations={[0.4407, 0.9684]}
                  start={{ x: 0.008, y: 0.412 }}
                  end={{ x: 0.992, y: 0.588 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text>{genre.name}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
