import React, { useState, useCallback, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addItem, removeItem } from "../../../reducers/cartSlice";

import RemoveIcon from "./RemoveIcon";

const Item = (props) => {
  const maxSwipedDelta = 10;

  const dispatch = useDispatch();
  const [toggleRemove, setToggleRemove] = useState(false);

  const cartItemNb = useSelector((state) => {
    const foundItem = state.cartReducer.items.find(
      (item) => props.id === item.id
    );
    if (foundItem) return foundItem.nbItems;
    return 0;
  });

  // /!\ Hack
  // mouseCoord is used to prevent onClick handler while swiping
  // See https://github.com/oliviertassinari/react-swipeable-views/issues/347#issuecomment-640446980
  const mouseCoord = useRef({ x: 0 });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setToggleRemove(false);
    },
    onSwipedRight: () => {
      if (cartItemNb) setToggleRemove(true);
    },
    trackMouse: true,
  });

  const handleMouseDown = (e) => {
    mouseCoord.current.x = e.screenX;
  };

  const handleItemClick = (e) => {
    const delta = Math.abs(e.screenX - mouseCoord.current.x);

    if (delta < maxSwipedDelta) {
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
      <div className="item-nb">{cartItemNb}</div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Item;
