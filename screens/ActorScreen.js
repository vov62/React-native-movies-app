import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import MovieList from "../components/movie list/MovieList";
import Loading from "../components/Loading";
import {
  useGetActorDetailsQuery,
  useGetActorMoviesQuery,
  useGetMovieDetailsQuery,
} from "../redux/slices/apiSlice";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const ActorScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  // console.log(item);

  const { data: dataTwo } = useGetActorDetailsQuery(item.id);
  // const { data: some, isLoading: load } = useGetMovieDetailsQuery(item);
  const { data: actorMoviesData } = useGetActorMoviesQuery(item.id);
  // console.log(actorMoviesData?.cast);

  const imgUrl = "http://image.tmdb.org/t/p/w342";

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
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
          <HeartIcon size="35" color={isFavorite ? "red" : "#fff"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Actor details */}

      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 5,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{ uri: `${imgUrl}${dataTwo?.profile_path}` }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {dataTwo?.name}
            </Text>

            <Text className="text-base text-neutral-500 text-center">
              {dataTwo?.place_of_birth}
            </Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {dataTwo?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>

            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {dataTwo?.birthday}
              </Text>
            </View>

            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {dataTwo?.known_for_department}
              </Text>
            </View>

            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {dataTwo?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {dataTwo?.biography || "N/A"}
            </Text>
          </View>

          {/* movies */}
          {/* <MovieList
            title={"Movies"}
            hideSeeAllBtn={true}
            data={actorMoviesData}
          /> */}
        </View>
      )}
    </ScrollView>
  );
};

export default ActorScreen;
