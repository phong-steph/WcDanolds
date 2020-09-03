import React from "react";

const Item = (props) => {
  return (
    <div className="d-flex flex-row item align-items-center justify-content-between">
      <div className="d-flex flex-row align-items-center">
        <img src={props.logo} alt={props.title} />
        <div className="d-flex flex-column info">
          <div className="d-flex flex-row justify-content-between mb-2">
            <h5>{props.title}</h5>
            <span>{props.price}‎€</span>
          </div>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="item-nb">{props.nb}</div>
    </div>
  );
};

export default Item;
