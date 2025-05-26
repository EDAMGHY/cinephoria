import { ArrowLeft } from "iconsax-react-nativejs";
import React, { useRef } from "react";
import {
  View,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Button } from "../ui";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// tweak this to whatever height your poster should be
const HEADER_MAX_HEIGHT = SCREEN_WIDTH * 1.0;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const DetailsParallax = ({
  posterUri,
  children,
  onPress,
}: {
  posterUri: string;
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // move the image up as you scroll
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 2],
    extrapolate: "clamp",
  });

  // optionally, you can also scale it slightly when you pull down
  const scale = scrollY.interpolate({
    inputRange: [-HEADER_MAX_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* animated header image */}
      <Animated.Image
        source={{ uri: posterUri }}
        style={[
          styles.headerImage,
          {
            transform: [{ translateY }, { scale }],
          },
        ]}
        resizeMode="cover"
      />

      <Button
        onPress={() => onPress?.()}
        variant="outline"
        size={"custom"}
        className="absolute top-14 left-5 z-10 p-2 !bg-black/40 !border-transparent"
      >
        <ArrowLeft size={24} color="#fff" />
      </Button>

      {/* your “back” button, etc */}
      {/* <YourBackButton style={styles.backButton} /> */}

      {/* the scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={{
          // push content below the header
          paddingTop: HEADER_MAX_HEIGHT,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View className="flex-1 justify-start bg-[#141414] p-5 flex-col gap-5 rounded-[25px] -mt-[12.5%]">
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "#141414" },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: HEADER_MAX_HEIGHT,
  },
  backButton: {
    position: "absolute",
    top: StatusBar.currentHeight! + 10,
    left: 10,
    zIndex: 10,
  },
});
