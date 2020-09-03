import React from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./assets/banner.jpg";

function App() {
  return (
    <div className="App">
      <Header />
      <img class="banner" src={Banner} alt="Mcdonalds banner" />
      <Footer />
    </div>
  );
}

export default App;
