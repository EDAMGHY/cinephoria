// /app/onboarding.tsx
import React, { useRef, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  StyleSheet,
  ViewToken,
} from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "~/components/ui";
import { Storage } from "~/lib/utils";
import { slides } from "~/components/data";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // track which slide is visible
  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index!);
      }
    }
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const scrollTo = useCallback((idx: number) => {
    flatListRef.current?.scrollToIndex({ index: idx });
  }, []);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      // done → go to login (or wherever)
      Storage.set("onboarding", true);
      router.replace("/registerlogin");
    }
  };

  const skipOnBoarding = () => {
    Storage.set("onboarding", true);
    router.replace("/registerlogin");
  };

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={[styles.slide, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-custom-black justify-center relative">
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          source={require("~/assets/images/pattern1.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <Button
        variant="link"
        className="z-[50] absolute top-16 right-5"
        onPress={skipOnBoarding}
      >
        <Text className="text-white">Skip</Text>
      </Button>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        className="mt-32"
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(i) => i.key}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* dots */}
      <View style={styles.dots}>
        {slides.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, idx === currentIndex ? styles.dotActive : {}]}
          />
        ))}
      </View>
      <View className="mb-20 mx-5">
        {currentIndex === slides.length - 1 && (
          <Button onPress={handleNext}>
            <Text className="text-white font-semibold">Get Started</Text>
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f13", justifyContent: "center" },
  slide: { alignItems: "center", padding: 20 },
  image: { height: 300, marginVertical: 40 },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: { fontSize: 14, color: "#ccc", textAlign: "center", marginTop: 12 },

  dots: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#444",
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: "#ffd700", width: 16 },

  button: {
    alignSelf: "center",
    backgroundColor: "#ffd700",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 40,
  },
  buttonText: { color: "#0f0f13", fontWeight: "600" },
});
