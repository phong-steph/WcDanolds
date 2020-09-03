import React from "react";
import "./App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./assets/banner.jpg";

function App() {
  return (
    <div className="container">
      <Header />
      <img class="banner" src={Banner} alt="Mcdonalds banner" />
      <Footer />
    </div>
  );
}

export default App;
