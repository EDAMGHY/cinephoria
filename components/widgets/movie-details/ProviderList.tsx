import { View } from "react-native";
import { ProviderItem } from "./ProviderItem";
import { Text } from "~/components/ui";
import { ProviderOption } from "~/types";

export const ProviderList = ({
  providers,
  type = "Flatrate",
}: {
  type: "Flatrate" | "Renting" | "Buying";
  providers: ProviderOption[];
}) => {
  return (
    <View className="flex-col gap-3">
      <Text font="Manrope_700Bold" className="text-lg text-secondary">
        {type}
      </Text>

      {!providers || providers.length === 0 ? (
        <Text className="text-[#8E8E93]">
          No providers available for {type} in your region.
        </Text>
      ) : (
        <View className="flex-row items-center gap-3 flex-wrap">
          {providers.map((provider) => (
            <ProviderItem key={provider.provider_id} provider={provider} />
          ))}
        </View>
      )}
    </View>
  );
};
