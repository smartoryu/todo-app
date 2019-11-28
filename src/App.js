import React, { Component } from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <Header />
        <Homepage />
        <div>Lorem ipsum dolor sit amet.</div>
      </div>
    );
  }
}

export default App;
