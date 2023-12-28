import Navigation from "./navigation";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { getMoviesData } from "./redux/slices/apiSlice";

export default function App() {
  return (
    <ApiProvider api={getMoviesData}>
      <Navigation />
    </ApiProvider>
  );
}
