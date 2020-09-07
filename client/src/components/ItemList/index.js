import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const cartItems = useSelector((state) => state.cartReducer.items);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/items");
      const json = await response.json();
      setItems(json.items);
    };

    fetchItems();
  }, []);

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
    </div>
  );
};

export default ItemList;
