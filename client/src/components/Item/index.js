import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

import RemoveIcon from "./RemoveIcon";

const Item = (props) => {
  const [toggleRemove, setToggleRemove] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setToggleRemove(false);
    },
    onSwipedRight: () => {
      setToggleRemove(true);
    },
    trackMouse: true,
  });

  return (
    <div
      className="d-flex flex-row item align-items-center justify-content-between"
      {...swipeHandlers}
    >
      <RemoveIcon toggle={toggleRemove} setToggleRemove={setToggleRemove} />

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
      <div className="item-nb">{props.cardNbItems}</div>
    </div>
  );
};

export default Item;
