import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { Routing } from "./route/route";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        {/* <Home /> */}
        <Routing />
      </Provider>
    </div>
  );
}

export default App;
