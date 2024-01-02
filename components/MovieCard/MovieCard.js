import { Image } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import fallMovie from "../../assets/images/fallMovie.jpg";
import { image500 } from "../../utils/imgUtil";

const MovieCard = ({ item, width, height, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
      <Image
        source={{ uri: `${image500(item.poster_path)}` } || fallMovie}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        defaultSource={fallMovie}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
