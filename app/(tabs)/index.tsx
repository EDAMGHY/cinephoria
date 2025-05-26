import { ChevronRightCircle } from "lucide-react-native";
import { Fragment, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Badge, Button, Text } from "~/components/ui";
import { Banner, Movie, Genre } from "~/types";
import { cn, formatDate, getGenres } from "~/lib/utils";
import { TopSlider } from "~/components/widgets";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from "~/api";
import { API_POSTER_IMAGE_URL } from "@env";
import { Calendar, PlayCircle } from "iconsax-react-nativejs";
import { useColorScheme } from "~/lib/useColorScheme";
import { genres } from "~/api/genres";
import { Link } from "expo-router";

// Placeholder data arrays
const bannerData: Banner[] = [
  {
    id: "1",
    title: "Pick the right show for you",
    images: [
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?random=2",
    ],
  },
];

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState<Genre["id"]>(
    genres[0].id
  );

  const { data: nowPlayingMovies = [] } = useNowPlayingMovies();
  const { data: topRatedMovies = [] } = useTopRatedMovies();
  const { data: popularMovies = [] } = usePopularMovies();
  const { data: upcomingMovies = [] } = useUpcomingMovies();

  const renderBanner = ({ item }: { item: Banner }) => (
    <View
      className="relative mx-3 bg-[#6526D9] rounded-xl gap-8 flex-row items-center overflow-hidden"
      style={{ width: width - 24 }}
    >
      <Image
        source={require("~/assets/images/hand.png")}
        className="absolute bottom-2 right-[110px] z-10 w-[100px] h-[60px] scale-125"
        resizeMode="cover"
      />
      <Image
        source={require("~/assets/images/rectangle.png")}
        className="absolute top-8 left-1 -z-1 w-[46px] h-[46px]"
        resizeMode="cover"
      />
      <View className="w-[180px] h-[180px] absolute -bottom-[70%] rotate-[67deg] -z-1 -right-12 bg-secondary" />
      <View className="w-full min-h-[200px] h-full shrink-0 flex-1 flex-col justify-around px-8 py-6 gap-6">
        <Text
          font="Manrope_700Bold"
          className="text-white text-[18px] leading-[28px] font-bold"
        >
          {item.title}
        </Text>
        <Button
          variant="link"
          size={"custom"}
          className="self-start flex-row items-center justify-center gap-2"
        >
          <Text className="text-white">Get Started</Text>
          <ChevronRightCircle size={16} color={"#fff"} />
        </Button>
      </View>
      <View className="relative flex-row justify-end w-fit pt-10 pb-16 pr-6">
        {item.images.map((uri, idx) => (
          <Image
            key={idx}
            source={{ uri }}
            className="shrink-0 w-[90px] h-[120px] rounded-lg"
            style={{
              transform: [
                {
                  translateX: idx === 0 ? 0 : -30,
                },
                {
                  translateY: idx === 0 ? -10 : 10,
                },
                {
                  rotate: idx === 0 ? "0deg" : "20deg",
                },
              ],
            }}
            resizeMode="cover"
          />
        ))}
      </View>
    </View>
  );

  // only log when you actually tap
  const handlePress = (id: Genre["id"]) => {
    console.log("Selected category:", id, typeof id);
    setSelectedCategory(id);
  };

  const renderCategory = ({ item }: { item: Genre }) => {
    const isSelected = item.id === selectedCategory;

    return (
      <Badge asChild variant={isSelected ? "secondary" : "gray"}>
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <Text
            className={cn(
              "text-[12px] leading-[18px] font-semibold",
              isSelected ? "text-black" : "text-foreground"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </Badge>
    );
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <Link
      href={{
        pathname: "/movies/[id]",
        params: { id: item.id },
      }}
    >
      <View className="w-[100px] shrink-0">
        <Image
          source={{ uri: API_POSTER_IMAGE_URL + item.poster_path }}
          className="w-30 h-44 rounded-md"
          resizeMode="cover"
        />
        <Text className="text-foreground mt-2 text-sm" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Link>
  );

  const renderPopularMovie = ({ item }: { item: Movie }) => {
    const genres = getGenres(item.genre_ids);
    return (
      <View
        className="flex-row gap-4 bg-[#212121]/10 dark:bg-[#212121] rounded-2xl p-5 overflow-hidden"
        style={{ width: width * 0.8 }}
      >
        <Image
          source={{ uri: API_POSTER_IMAGE_URL + item.poster_path }}
          className="shrink-0 w-24 h-[120px] rounded"
          resizeMode="cover"
        />
        <View className="flex-shrink self-start flex-col justify-start gap-4 py-2">
          <View className="flex-col items-start gap-3">
            <View className="flex-row items-center gap-2">
              <Calendar size={16} color={"#DEBF1F"} />
              <Text className="text-[#DEBF1F] text-[12px] leading-[20px]">
                {formatDate(item.release_date)}
              </Text>
            </View>
            <Text
              font="Manrope_700Bold"
              className="text-foreground text-[16px] leading-[20px]"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex-row items-center gap-2 flex-wrap"
            >
              {genres.map((genre, idx) => (
                <Fragment key={idx + 1}>
                  <Text className="text-[12px] leading-[18px] text-[#090909]/60 dark:text-[#909090]">
                    {genre}
                  </Text>
                  {genre !== genres[genres.length - 1] && (
                    <View className="w-1.5 h-1.5 bg-[#909090] rounded-full"></View>
                  )}
                </Fragment>
              ))}
            </ScrollView>
          </View>

          <Button
            variant="link"
            size="custom"
            className="flex-row items-center gap-2 self-start"
          >
            <PlayCircle
              variant="Broken"
              size={20}
              color={isDarkColorScheme ? "#fff" : "#000"}
            />
            <Text className="text-foreground !text-[14px] !leading-[20px]">
              Watch Now
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-start bg-background">
      <ScrollView contentContainerClassName="gap-4 pt-2 pb-4">
        {/* Banner Section */}
        <View>
          <FlatList
            data={bannerData}
            keyExtractor={(item) => item.id}
            renderItem={renderBanner}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Genres Section */}
        <View>
          <FlatList
            data={genres}
            keyExtractor={(item) => item.id + ""}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pl-4 gap-3"
          />
        </View>

        {/* Now Playing Section */}
        <View>
          <TopSlider title="Now Playing" />
          <FlatList
            data={nowPlayingMovies?.results || []}
            keyExtractor={(item: Movie) => item.id + ""}
            renderItem={renderMovie}
            horizontal
            contentContainerClassName="pl-3 gap-3"
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Top Rated Section */}
        <View>
          <TopSlider title="Top Rated" />
          <FlatList
            data={topRatedMovies?.results || []}
            keyExtractor={(item: Movie) => item.id + ""}
            renderItem={renderMovie}
            horizontal
            contentContainerClassName="pl-3 gap-3"
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Popular Section */}
        <View>
          <TopSlider title="Popular" />
          <FlatList
            data={popularMovies?.results || []}
            keyExtractor={(item: Movie) => item.id + ""}
            renderItem={renderMovie}
            horizontal
            contentContainerClassName="pl-3 gap-3"
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Coming Soon Section */}
        <View>
          <TopSlider title="Coming Soon" />
          <FlatList
            data={upcomingMovies?.results || []}
            keyExtractor={(item: Movie) => item.id + ""}
            renderItem={renderPopularMovie}
            horizontal
            contentContainerClassName="pl-3 gap-5"
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
