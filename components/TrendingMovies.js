import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard/MovieCard";
import { useNavigation } from "@react-navigation/native";

const TrendingMovies = ({ data }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data.results}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            width={width}
            height={height}
            handleClick={handleClick}
          />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
