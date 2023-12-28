import { Image } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import fallMovie from "../../assets/images/fallMovie.jpg";

const MovieCard = ({ item, width, height, handleClick }) => {
  const imgUrl = "http://image.tmdb.org/t/p/w342";

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
      <Image
        source={{ uri: `${imgUrl}${item.poster_path}` } || fallMovie}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
