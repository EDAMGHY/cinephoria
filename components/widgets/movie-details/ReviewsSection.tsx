import { API_POSTER_IMAGE_URL } from "@env";
import { Star1 } from "iconsax-react-nativejs";
import { User } from "lucide-react-native";
import { Image, View } from "react-native";
import { Text } from "~/components/ui";
import { formatDate } from "~/lib/utils";
import { DetailsTabProps } from "~/types";

export const ReviewsSection = ({ reviews }: DetailsTabProps) => {
  return (
    <View className="flex-col gap-4">
      {reviews?.results.length
        ? reviews.results.map((review) => (
            <View
              key={review.id}
              className="p-4 bg-[#1C1C1E] rounded-lg flex-col gap-4"
            >
              <Text
                font="Manrope_500Medium"
                className="text-sm text-muted-foreground"
              >
                {formatDate(review.created_at)}
              </Text>
              <View className="flex-row items-center gap-3">
                {review.author_details.avatar_path ? (
                  <Image
                    source={{
                      uri:
                        API_POSTER_IMAGE_URL +
                        review.author_details.avatar_path,
                    }}
                    className="w-16 h-16 rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-16 h-16 bg-neutral-800 rounded-full flex justify-center items-center">
                    <User size={24} color={"#fff"} />
                  </View>
                )}
                <View className="flex-col gap-3">
                  <Text
                    className="text-lg text-secondary font-bold"
                    font="Manrope_700Bold"
                  >
                    {review.author}
                  </Text>

                  <View className="flex-row items-center gap-2">
                    <Star1 variant="Bold" size={16} color={"#DEBF1F"} />
                    <Text font="Manrope_700Bold" className="text-center">
                      {review.author_details.rating || "-"}/10
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-foreground mt-2">{review.content}</Text>
            </View>
          ))
        : null}
    </View>
  );
};
