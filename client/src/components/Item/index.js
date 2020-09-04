import React, { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useDispatch } from "react-redux";

import { addItem, removeItem } from "../../containers/itemsSlice";

import RemoveIcon from "./RemoveIcon";

const Item = (props) => {
  const [toggleRemove, setToggleRemove] = useState(false);
  const dispatch = useDispatch();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setToggleRemove(false);
    },
    onSwipedRight: () => {
      if (props.cardNbItems > 0) setToggleRemove(true);
    },
    trackMouse: true,
  });

  const handleItemClick = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveClick = useCallback(() => {
    dispatch(removeItem(props.id));
  }, [props.id]);

  return (
    <div
      className="d-flex flex-row item align-items-center justify-content-between"
      {...swipeHandlers}
    >
      <RemoveIcon
        toggle={toggleRemove}
        setToggleRemove={setToggleRemove}
        handleRemoveClick={handleRemoveClick}
      />

      <div
        className="d-flex flex-row align-items-center"
        onClick={() => handleItemClick(props)}
      >
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
