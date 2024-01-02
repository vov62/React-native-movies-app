import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/movie list/MovieList";
import {
  useGetTrendingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useTopRatedMoviesQuery,
} from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const { data: trendMoviesData, isLoading: isLoadingTrending } =
    useGetTrendingMoviesQuery();
  const { data: upcomingData, isLoading: isLoadingUpcoming } =
    useGetUpcomingMoviesQuery();
  const { data: topRatedData, isLoading: isLoadingTopRated } =
    useTopRatedMoviesQuery();

  const navigation = useNavigation();
  const favorite = useSelector((state) => state.rootReducers.favorite);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="#fff" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>Movies</Text>
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
              {favorite.favorite.length > 0 ? (
                <HeartIcon size="30" color="red" fill="red" />
              ) : (
                <HeartIcon size="30" color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {isLoadingTrending || isLoadingUpcoming || isLoadingTopRated ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* trending movies carousal */}
          <TrendingMovies data={trendMoviesData} />

          {/* upcoming movies row */}
          <MovieList title="Upcoming" data={upcomingData} />

          {/* topRated movies */}
          <MovieList title="Top rated" data={topRatedData} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
