import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme/index";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast/Cast";
import MovieList from "./../components/movie list/MovieList";
import Loading from "../components/Loading";
import {
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from "../redux/slices/apiSlice";
import fallMovie from "../assets/images/fallMovie.jpg";

const ios = Platform.OS == "ios";
const { width, height } = Dimensions.get("window");
const topMargin = ios ? "" : "mt-3";

const MoviesScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const imgUrl = "http://image.tmdb.org/t/p/w500";
  let bullet = "\u2022";

  const { data, isLoading, isFetching } = useGetMovieDetailsQuery(item);
  const { data: similarMovies } = useGetSimilarMoviesQuery(item);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1 "
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "#fff"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: `${imgUrl}${data?.poster_path}` }}
              style={{ width, height: height * 0.55 }}
              defaultSource={fallMovie}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0 "
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {data?.title}
        </Text>

        <Text className="text-neutral-400 font-semibold text-base text-center">
          {data?.status} {bullet} {data?.release_date?.split("-")[0]} {bullet}
          {data?.runtime}
          min
        </Text>

        <View className="flex-row  justify-center mx-4 space-x-2">
          {data?.genres?.map((genre, idx) => {
            let showDot = idx + 1 != data.genres.length;
            return (
              <Text
                key={genre.id}
                className="text-neutral-400 font-semibold text-base text-center "
              >
                {genre?.name} {showDot ? `${bullet}` : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wider">
          {data?.overview}
        </Text>
      </View>

      {/* cast */}
      <Cast cast={data} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        hideSeeAllBtn={true}
        data={similarMovies}
      />
    </ScrollView>
  );
};

export default MoviesScreen;
