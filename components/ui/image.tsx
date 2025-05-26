import {
  View,
  Image as ImageRN,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState } from "react";

interface ImageProps extends React.ComponentProps<typeof ImageRN> {}

export function Image({ ...rest }: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="w-full h-full overflow-hidden">
      {loading && (
        <View
          style={{ ...StyleSheet.absoluteFillObject, alignSelf: "center" }}
          className="flex items-center justify-center border rounded-lg"
        >
          <ActivityIndicator size="small" />
        </View>
      )}
      <ImageRN
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        {...rest}
      />
    </View>
  );
}
