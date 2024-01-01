import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { styles } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import fallMovie from "../../assets/images/fallMovie.jpg";
import { image500 } from "../../utils/imgUtil";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAllBtn }) => {
  const navigate = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>

        {/* if seeAll btn is true show him, else don't show */}
        {!hideSeeAllBtn && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.results?.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => navigate.push("Movie", item.id)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: `${image500(item.poster_path)}` } || fallMovie}
                  defaultSource={fallMovie}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
