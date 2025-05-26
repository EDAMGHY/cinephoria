import { API_ORIGINAL_IMAGE_URL } from "@env";
import { FlatList, View } from "react-native";
import { Text, Image } from "~/components/ui";
import { cn } from "~/lib/utils";
import { DetailsTabProps, ImageData } from "~/types";

export const ImagesSection = ({ images }: DetailsTabProps) => {
  return (
    <View className="flex-col gap-10">
      <ImagesList nodes={images?.backdrops!} type="Backdrops" />
      <ImagesList nodes={images?.posters!} type="Posters" />
      <ImagesList nodes={images?.logos!} type="Logos" />
      <Text>{JSON.stringify(images?.logos, null, 2)}</Text>
    </View>
  );
};

const ImagesList = ({
  nodes,
  type = "Logos",
}: {
  nodes: ImageData[];
  type?: "Logos" | "Posters" | "Backdrops";
}) => {
  return (
    <View className="flex-col gap-4">
      <Text className="text-xl leading-8" font="Manrope_700Bold">
        {type}
      </Text>

      {nodes?.length ? (
        <>
          {type === "Posters" ? (
            <FlatList
              data={nodes || []}
              keyExtractor={(item: ImageData) => item.file_path + ""}
              renderItem={({ item }) => (
                <ImageItem item={item} type="Posters" />
              )}
              horizontal
              contentContainerClassName="gap-3"
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View className={cn("flex gap-4 flex-col")}>
              {nodes?.map((logo) => (
                <ImageItem key={logo.file_path} item={logo} type={type} />
              ))}
            </View>
          )}
        </>
      ) : (
        <Text className="text-sm text-muted-foreground">
          No logos available for {type}
        </Text>
      )}
    </View>
  );
};

const ImageItem = ({
  item,
  type = "Logos",
}: {
  item: ImageData;

  type?: "Logos" | "Posters" | "Backdrops";
}) => {
  return (
    <View
      key={item.file_path}
      className={cn(
        "shrink-0 rounded flex-col gap-4",
        type === "Posters" ? "w-[100px] h-[150px]" : "w-full aspect-video"
      )}
    >
      <Image
        source={{
          uri: API_ORIGINAL_IMAGE_URL + item.file_path,
        }}
        className=" w-full h-full rounded"
        resizeMode="cover"
      />
    </View>
  );
};
