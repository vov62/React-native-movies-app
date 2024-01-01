import {
  View,
  Text,
  Dimensions,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useGetSearchTermQuery } from "../redux/slices/apiSlice";
import fallMovie from "../assets/images/fallMovie.jpg";
import { useDispatch, useSelector } from "react-redux";
import { MOVIE_SEARCH } from "../redux/slices/searchSlice";
import { image185 } from "../utils/imgUtil";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const SearchScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const searchTermObject = useSelector((state) => state.rootReducers?.search);
  const searchTerm = searchTermObject?.movieName || "";
  const { data: searchData, isLoading } = useGetSearchTermQuery(searchTerm);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          value={searchTerm}
          onChangeText={(val) => dispatch(MOVIE_SEARCH(val))}
          placeholder="Search Movie..."
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />

        <TouchableOpacity
          onPress={() => {
            navigate.navigate("Home");
          }}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="#fff" />
        </TouchableOpacity>
      </View>

      {/* results */}

      {isLoading ? (
        <Loading />
      ) : searchData?.results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({searchData?.results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {searchData?.results?.map((item, idx) => {
              return (
                <TouchableWithoutFeedback
                  key={idx}
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
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
