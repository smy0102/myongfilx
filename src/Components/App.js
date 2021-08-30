import React, { Component } from "react";
import Routers from "Components/Routers";
import GlobalStyles from "./GlobalStyles";

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyles />
        <Routers />
      </div>
    );
  }
}

export default App;
