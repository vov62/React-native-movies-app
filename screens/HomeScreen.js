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
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/movie list/MovieList";
import Loading from "../components/Loading";
import {
  useGetTrendingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useTopRatedMoviesQuery,
} from "../redux/slices/apiSlice";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const { data: trendMoviesData, isLoading: isLoadingTrending } =
    useGetTrendingMoviesQuery();
  const { data: upcomingData, isLoading: isLoadingUpcoming } =
    useGetUpcomingMoviesQuery();
  const { data: topRatedData, isLoading: isLoadingTopRated } =
    useTopRatedMoviesQuery();

  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="#fff" />
          </TouchableOpacity>
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
