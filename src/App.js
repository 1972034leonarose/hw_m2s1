import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routing } from "./route/route";

function App() {
  return (
    <div>
      <Provider store={store}>
        {/* <Home /> */}
        <Routing/>
      </Provider>
    </div>
  );
}

export default App;
