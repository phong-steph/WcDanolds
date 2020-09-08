import React, { useState, useCallback, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useDispatch } from "react-redux";

import { addItem, removeItem } from "../../../containers/cartSlice";

import RemoveIcon from "./RemoveIcon";

const Item = (props) => {
  const [toggleRemove, setToggleRemove] = useState(false);
  const dispatch = useDispatch();

  // /!\ Hack
  // mouseCoord is used to prevent onClick handler while swiping
  // See https://github.com/oliviertassinari/react-swipeable-views/issues/347#issuecomment-640446980
  const mouseCoord = useRef({ x: 0 });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setToggleRemove(false);
    },
    onSwipedRight: () => {
      if (props.cartNbItems > 0) setToggleRemove(true);
    },
    delta: 0,
    trackMouse: true,
  });

  const handleMouseDown = (e) => {
    mouseCoord.current.x = e.screenX;
  };

  const handleItemClick = (e) => {
    const delta = Math.abs(e.screenX - mouseCoord.current.x);

    if (delta < 10) {
      dispatch(addItem(props));
    }
  };

  const handleRemoveClick = useCallback(() => {
    dispatch(removeItem(props.id));
  }, [props.id, dispatch]);

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
        onClick={handleItemClick}
        onMouseDown={handleMouseDown}
      >
        <img src={props.logo} alt={props.title} />
        <div className="d-flex flex-column info">
          <h5>{props.title}</h5>
          <p>{props.price.toFixed(2)}‎€</p>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="item-nb">{props.cartNbItems}</div>
    </div>
  );
};

export default Item;
