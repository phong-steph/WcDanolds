import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { emptyCart } from "./reducers/cartSlice";

import Header from "./components/Header";
import Alert from "./components/Alert";
import Banner from "./components/Banner";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const handlePurchaseClick = () => {
    setShowAlert(true);
  };

  const handleAlertClick = () => {
    setShowAlert(false);
    dispatch(emptyCart());
  };

  return (
    <>
      <Header />
      <div className="container">
        <Alert show={showAlert} closeAlert={handleAlertClick} />
        <Banner />
        <ItemList />
      </div>
      <Footer onPurchaseClick={handlePurchaseClick} />
    </>
  );
}

export default App;
