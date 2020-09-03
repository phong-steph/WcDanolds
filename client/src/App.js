import React from "react";
import "./App.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Banner />
      <ItemList />
      <Footer />
    </div>
  );
}

export default App;
