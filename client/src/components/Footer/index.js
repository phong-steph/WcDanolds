import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const Footer = (props) => {
  const cart = useSelector((state) => state.cartReducer);
  let visible = "";
  if (cart.items.length > 0) {
    visible = "show";
  }
  return (
    <footer className={visible}>
      <div className="container">
        <div className="d-flex flex-row justify-content-around">
          <ul>
            {cart.items.map((item) => (
              <li key={item.id}>
                <div className="d-flex flex-row justify-content-between">
                  <p className="text-left">{item.nbItems}</p>
                  <p className="text-right">{item.title}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column">
            <p>TOTAL: {cart.total.toFixed(2)}€</p>
            <button onClick={props.onPurchaseClick} className="btn btn-primary">
              PAYER
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  onPurchaseClick: PropTypes.func.isRequired,
};

export default Footer;
