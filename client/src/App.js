import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { emptyCart } from "./containers/cartSlice";

import Header from "./components/Header";
import Banner from "./components/Banner";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  // Hack: Should be removed / optimized
  // get cart items only to add footer-margin class
  const cartItems = useSelector((state) => state.cartReducer.items);
  const footerMargin = cartItems.length > 0 ? " footer-margin" : "";

  const dispatch = useDispatch();

  const handlePurchaseClick = () => {
    dispatch(emptyCart());
  };

  return (
    <>
      <Header />
      <div className={`container ${footerMargin}`}>
        <Banner />
        <ItemList />
      </div>
      <Footer onPurchaseClick={handlePurchaseClick} />
    </>
  );
}

export default App;
