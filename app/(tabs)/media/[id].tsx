import { API_ORIGINAL_IMAGE_URL, API_POSTER_IMAGE_URL } from "@env";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Clock, Star1 } from "iconsax-react-nativejs";
import { Globe, ThumbsUp } from "lucide-react-native";
import { Fragment, useMemo, useState } from "react";
import { ScrollView, Image, TouchableOpacity, View } from "react-native";
import { useSingleMovies } from "~/api";
import { Badge, Text } from "~/components/ui";
import {
  DetailsParallax,
  ImagesSection,
  ReviewsSection,
  OverviewSection,
} from "~/components/widgets";
import { cn, formatDate } from "~/lib/utils";
import {
  DetailsTabProps,
  MovieCredits,
  MovieDetail,
  MovieDetailImages,
  MovieDetailSimilar,
  MovieDetailsReviews,
  MovieProviders,
  MovieVideos,
} from "~/types";

const detailsTabs = [
  {
    id: 1,
    name: "Overview/Info",
    panel: (props: DetailsTabProps) => <OverviewSection {...props} />,
  },
  {
    id: 2,
    name: "Reviews",
    panel: (props: DetailsTabProps) => <ReviewsSection {...props} />,
  },
  {
    id: 3,
    name: "Images",
    panel: (props: DetailsTabProps) => <ImagesSection {...props} />,
  },
];

const MovieDetailsScreen = () => {
  const router = useRouter();
  const [tab, setTab] = useState(detailsTabs[0].id);
  const { id, type } = useLocalSearchParams();
  const { data } = useSingleMovies<MovieDetail>(+id);

  const { data: credits } = useSingleMovies<MovieCredits>(+id, "credits");
  const { data: providers } = useSingleMovies<MovieProviders>(
    +id,
    "watch/providers"
  );
  const { data: videos } = useSingleMovies<MovieVideos>(+id, "videos");
  const { data: similar } = useSingleMovies<MovieDetailSimilar>(+id, "similar");

  const { data: reviews } = useSingleMovies<MovieDetailsReviews>(
    +id,
    "reviews"
  );
  const { data: images } = useSingleMovies<MovieDetailImages>(+id, "images");

  const directors = useMemo(() => {
    return credits?.crew.filter((member) => member.job === "Director");
  }, [credits]);

  const trailer = useMemo(() => {
    return videos?.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
  }, [videos]);

  console.log("typetypetype", type);

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-foreground">
          Loading...
          {id}
          {type}
        </Text>
      </View>
    );
  }

  return (
    <DetailsParallax
      posterUri={API_ORIGINAL_IMAGE_URL + data?.backdrop_path}
      onPress={() => router.back()}
    >
      <View className="flex-row gap-4 overflow-hidden">
        <Image
          source={{
            uri: API_POSTER_IMAGE_URL + data?.poster_path,
          }}
          className="shrink-0 w-24 h-[120px] rounded"
          resizeMode="cover"
        />
        <View className="flex-shrink flex-col justify-between gap-4 py-2">
          <View className="flex-col items-start gap-3">
            <Text
              font="Manrope_700Bold"
              className="text-foreground text-[16px] leading-[20px]"
            >
              {data?.title}
            </Text>

            <View className="flex-row items-center gap-2 flex-wrap">
              {data?.genres.map((genre, idx) => (
                <Fragment key={idx + 1}>
                  <Text className="text-[14px] leading-[22px] text-[#090909]/60 dark:text-[#909090]">
                    {genre.name}
                  </Text>
                  {genre !== data?.genres[data?.genres.length - 1] && (
                    <View className="w-1.5 h-1.5 bg-[#909090] rounded-full"></View>
                  )}
                </Fragment>
              ))}
            </View>
            <View className="flex-row items-center justify-between w-full gap-2 flex-wrap">
              {data?.runtime && (
                <View className="flex-row items-center gap-2">
                  <Clock size={16} color={"#DEBF1F"} />
                  <Text className="text-[#DEBF1F] text-[12px] leading-[20px]">
                    {data?.runtime} min
                  </Text>
                </View>
              )}
              {data?.release_date && (
                <View className="flex-row items-center gap-2">
                  <Calendar size={16} color={"#DEBF1F"} />
                  <Text className="text-[#DEBF1F] text-[12px] leading-[20px]">
                    {formatDate(data?.release_date)}
                  </Text>
                </View>
              )}
              {data?.origin_country && (
                <View className="flex-row items-center gap-2">
                  <Globe size={16} color={"#DEBF1F"} />
                  <Text className="text-[#DEBF1F] text-[12px] leading-[20px]">
                    {data?.origin_country}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View className="border p-4 rounded-2xl justify-between w-full border-[#282828] flex-row gap-4 overflow-hidden ">
        <View className="flex-col gap-2">
          <Text className="text-[14px] text-center leading-[20px] text-[#777777]">
            From IMDb
          </Text>

          <View className="flex-row items-center gap-2">
            <Star1 variant="Bold" size={16} color={"#DEBF1F"} />
            <Text font="Manrope_700Bold" className="text-center">
              8.5/10
            </Text>
          </View>
        </View>

        <View className="w-px h-3/4 bg-[#282828] m-auto"></View>

        <View className="flex-col gap-2">
          <Text className="text-[14px] text-center leading-[20px] text-[#777777]">
            From users
          </Text>
          <View className="flex-row items-center gap-2">
            <ThumbsUp size={16} color={"#fff"} />
            <Text font="Manrope_700Bold" className="text-center">
              98%
            </Text>
          </View>
        </View>
        <View className="w-px h-3/4 bg-[#282828] m-auto"></View>

        <View className="flex-col gap-2">
          <Text className="text-[14px] text-center leading-[20px] text-[#777777]">
            Content Rating
          </Text>
          <Text font="Manrope_700Bold" className="text-center">
            PG-13
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-col gap-4">
        {/* Details Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row items-center gap-2 flex-wrap"
        >
          {detailsTabs.map((item) => (
            <Badge
              asChild
              variant={tab == item.id ? "secondary" : "gray"}
              key={item.id}
            >
              <TouchableOpacity onPress={() => setTab(item.id)}>
                <Text
                  className={cn(
                    "text-[12px] leading-[18px] font-semibold",
                    tab == item.id ? "text-black" : "text-foreground"
                  )}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Badge>
          ))}
        </ScrollView>
        {/* Tab content  */}
        {detailsTabs[tab - 1].panel({
          movie: data,
          credits,
          directors,
          providers,
          videos,
          trailer,
          similar,
          reviews,
          images,
        })}
      </View>
    </DetailsParallax>
  );
};

export default MovieDetailsScreen;
