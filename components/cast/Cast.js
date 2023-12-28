import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetActorsDetailsQuery } from "../../redux/slices/apiSlice";
import fallActor from "../../assets/images/fallPerson.png";

const Cast = ({ cast }) => {
  const imgUrl = "http://image.tmdb.org/t/p/w185";

  const navigation = useNavigation();
  const { data } = useGetActorsDetailsQuery(cast?.id);

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.cast?.length > 0 &&
          data?.cast?.map((actor, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Actor", actor)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{
                      uri: `${imgUrl}${actor?.profile_path}`,
                    }}
                    defaultSource={fallActor}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  {actor?.character.length > 10
                    ? actor?.character.slice(0, 10) + "..."
                    : actor?.character}
                </Text>

                <Text className="text-neutral-400 text-xs mt-1">
                  {actor?.original_name.length > 10
                    ? actor?.original_name.slice(0, 10) + "..."
                    : actor?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
