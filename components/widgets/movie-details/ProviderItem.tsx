import { API_POSTER_IMAGE_URL } from "@env";
import { Image, View } from "react-native";
import { ProviderOption } from "~/types";

export const ProviderItem = ({ provider }: { provider: ProviderOption }) => {
  return (
    <View key={provider.provider_id} className="flex-row items-center gap-3">
      <Image
        source={{
          uri: API_POSTER_IMAGE_URL + provider.logo_path,
        }}
        className="w-16 h-16 rounded"
        resizeMode="cover"
      />
    </View>
  );
};
