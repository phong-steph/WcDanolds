import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { animateScroll } from "react-scroll";
import _ from "lodash";

import Item from "../Item";
import Spinner from "../Spinner";
import { detectScrollBottom } from "../../utils/scroll";

const ItemList = () => {
  const nbItemsPerRequest = 3;
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(nbItemsPerRequest);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const cartItems = useSelector((state) => state.cartReducer.items);

  useEffect(() => {
    setLoading(true);
    // Trick
    // Scroll down to display spinner
    animateScroll.scrollMore(40, { duration: 500 });

    const fetchItems = async () => {
      try {
        const response = await fetch(`/items?limit=${limit}`);
        const json = await response.json();
        setTotalItems(json.totalCount);
        setItems(json.items);
      } catch (error) {
        // do something
      }
      setLoading(false);
    };

    fetchItems();
  }, [limit]);

  const handleScroll = useCallback(
    _.debounce(() => {
      if (detectScrollBottom()) {
        let delta = nbItemsPerRequest;
        if (totalItems <= limit) delta = 0;
        setLimit(limit + delta);
      }
    }, 500),
    [limit, totalItems]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limit, totalItems, handleScroll]);

  return (
    <div className="item-list">
      <ul>
        {items.map((item) => {
          let cartNbItems = 0;
          const foundItem = cartItems.find(
            (cartItem) => item.id === cartItem.id
          );
          if (foundItem) cartNbItems = foundItem.nbItems;
          return (
            <li key={item.id}>
              <Item {...item} cartNbItems={cartNbItems} />
            </li>
          );
        })}
      </ul>
      <Spinner loading={loading} />
    </div>
  );
};

export default ItemList;
