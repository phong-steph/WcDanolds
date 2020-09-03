import React from "react";
import "./App.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
