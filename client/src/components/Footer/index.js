import React from "react";
import { useSelector } from "react-redux";

export const Footer = () => {
  const cart = useSelector((state) => state.cartReducer);

  return (
    cart.items.length > 0 && (
      <footer>
        <div className="container">
          <h3>Panier</h3>
          <div className="d-flex flex-row justify-content-around">
            <ul>
              {cart.items.map((item) => (
                <li key={item.id}>
                  <div className="d-flex flex-row justify-content-between">
                    <p>{item.nbItems}</p>
                    <p>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex flex-column">
              <p>TOTAL: {cart.total.toFixed(2)}€</p>
              <button className="btn btn-primary btn-lg">PAYER</button>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
