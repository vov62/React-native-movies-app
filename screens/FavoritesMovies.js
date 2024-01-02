import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FAVORITE } from "../redux/slices/favoritesSlices";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../utils/imgUtil";
import fallMovie from "../assets/images/fallMovie.jpg";

const { width, height } = Dimensions.get("window");

const FavoritesMovies = () => {
  const favorite = useSelector((state) => state.rootReducers.favorite);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mt-12 p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold" style={styles.text}>
            Favorite Movies
          </Text>

          <TouchableOpacity
            onPress={() => dispatch(REMOVE_FAVORITE())}
            className="bg-blue-800 py-1 px-3 rounded-lg"
          >
            <Text className="font-bold text-lg text-white">Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {favorite.favorite?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row justify-between flex-wrap">
            {favorite.favorite?.map((item) => {
              return (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => navigate.push("Movie", item.id)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: `${image185(item?.poster_path)}` || fallMovie,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                      defaultSource={fallMovie}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex justify-center items-center">
          <Text className=" text-white">Add favorites</Text>
        </View>
      )}
    </View>
  );
};

export default FavoritesMovies;
