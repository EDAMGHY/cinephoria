import { API_POSTER_IMAGE_URL } from "@env";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, Image, ScrollView, View } from "react-native";
import { useMoviesByGenre, useSeriesByGenre } from "~/api/discover";
import { Grid, Text } from "~/components/ui";
import { Movie, PaginatedList, TvShow } from "~/types";

const PreFilteredScreen = () => {
  const { id: genreId } = useLocalSearchParams();

  const [movieId, tvId] = genreId.toString().split("+");

  const { data: movies } = useMoviesByGenre<PaginatedList<Movie>>(movieId);
  const { data: series } = useSeriesByGenre<PaginatedList<TvShow>>(
    tvId ? tvId : movieId
  );

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-col p-4 gap-4"
    >
      <View className="flex-col gap-4">
        <Text font="Manrope_700Bold" className="text-xl text-card-foreground">
          Movies Search results: ({movies?.results.length})
        </Text>
        <Grid columns={2} gap={16}>
          {movies?.results.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: "/media/[id]",
                params: { id: item.id },
              }}
            >
              <View className="w-full shrink-0">
                <Image
                  source={{ uri: API_POSTER_IMAGE_URL + item.poster_path }}
                  className="w-full h-[250px] rounded-md"
                  resizeMode="stretch"
                />
                <Text
                  className="text-foreground mt-2 text-sm"
                  font="Manrope_700Bold"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </View>
            </Link>
          ))}
        </Grid>
      </View>

      <View className="flex-col gap-4">
        <Text font="Manrope_700Bold" className="text-xl text-card-foreground">
          Tv Series Search results: ({series?.results.length})
        </Text>
        <Grid columns={2} gap={16}>
          {series?.results.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: "/media/[id]",
                params: { id: item.id, type: "tv" },
              }}
            >
              <View className="w-full shrink-0">
                <Image
                  source={{ uri: API_POSTER_IMAGE_URL + item.poster_path }}
                  className="w-full h-[250px] rounded-md"
                  resizeMode="stretch"
                />
                <Text
                  className="text-foreground mt-2 text-sm"
                  font="Manrope_700Bold"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </View>
            </Link>
          ))}
        </Grid>
      </View>
    </ScrollView>
  );
};

export default PreFilteredScreen;
