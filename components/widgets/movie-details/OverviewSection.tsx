import { API_POSTER_IMAGE_URL } from "@env";
import React from "react";
import { FlatList, Image, View } from "react-native";
import { Text } from "~/components/ui";
import { CastMember, DetailsTabProps, Movie } from "~/types";
import { YoutubePlayer } from "../youtube-player/YoutubePlayer";
import { ProviderList } from "./ProviderList";
import { Link } from "expo-router";

export const OverviewSection = ({
  movie,
  directors,
  credits,
  trailer,
  providers,
  similar,
}: DetailsTabProps) => {
  const usaProviders = providers?.results["US"];

  const noProviders =
    !usaProviders?.flatrate?.length &&
    !usaProviders?.rent?.length &&
    !usaProviders?.buy?.length;

  const castItemRender = ({ item }: { item: CastMember }) => {
    return (
      <View className="flex-col justify-around py-3 px-2 w-[120px] bg-[#1C1C1E] rounded-lg items-center gap-2">
        <Image
          source={{
            uri: API_POSTER_IMAGE_URL + item.profile_path,
          }}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
        <Text
          className="text-[14px] text-center leading-[20px] text-foreground"
          font="Manrope_700Bold"
        >
          {item.name}
        </Text>
      </View>
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

  return (
    <View className="flex-col gap-10">
      {/* Overview */}
      <Text className="text-[#8E8E93]">{movie?.overview}</Text>
      {/* Directors Section */}
      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Directed by
        </Text>
        <View className="flex-row items-center gap-4 flex-wrap">
          {directors?.map((director) => (
            <View
              key={director.id}
              className="bg-[#1C1C1E] py-2 px-4 rounded-xl flex-row items-center gap-3"
            >
              <Image
                source={{
                  uri: API_POSTER_IMAGE_URL + director.profile_path,
                }}
                className="w-16 h-16 rounded-full"
                resizeMode="cover"
              />
              <Text
                className="text-[14px] leading-[20px] text-foreground"
                font="Manrope_700Bold"
              >
                {director.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Available on
        </Text>
        {noProviders ? (
          <Text className="text-[#8E8E93]">
            No providers available in your region.
          </Text>
        ) : (
          <>
            <ProviderList type="Renting" providers={usaProviders?.rent!} />
            <ProviderList type="Buying" providers={usaProviders?.buy!} />
            <ProviderList type="Flatrate" providers={usaProviders?.flatrate!} />
          </>
        )}
      </View>
      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Trailer
        </Text>
        {trailer?.key && <YoutubePlayer videoId={trailer?.key} />}
      </View>

      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Cast
        </Text>
        <FlatList
          data={credits?.cast || []}
          keyExtractor={(item: CastMember) => item.id + ""}
          renderItem={castItemRender}
          horizontal
          contentContainerClassName="gap-4"
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View className="flex-col gap-4">
        <Text className="text-xl leading-8" font="Manrope_700Bold">
          Similar Movies
        </Text>
        <FlatList
          data={similar?.results || []}
          keyExtractor={(item: Movie) => item.id + ""}
          renderItem={renderMovie}
          horizontal
          contentContainerClassName="gap-3"
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
