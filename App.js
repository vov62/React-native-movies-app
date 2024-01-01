import Navigation from "./navigation";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import store from "./redux/store";
import { getMoviesApi } from "./redux/slices/apiSlice";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
