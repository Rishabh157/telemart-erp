import React from "react";
import "./App.css";
import { default as PageRoutes } from "./PageRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <PageRoutes />
      </Provider>
      <Toaster />
    </>
  );
}

export default App;
