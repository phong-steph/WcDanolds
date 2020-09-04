import React from "react";
import "./App.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Banner />
        <ItemList />
      </div>
      <Footer />
    </>
  );
}

export default App;
