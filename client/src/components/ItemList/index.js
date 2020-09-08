import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Item from "../Item";
import Spinner from "../Spinner";

const ItemList = () => {
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [items, setItems] = useState([]);
  const cartItems = useSelector((state) => state.cartReducer.items);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/items?limit=${limit}`);
      const json = await response.json();
      setItems(json.items);
      setLoading(false);
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
      <Spinner loading={loading} />
    </div>
  );
};

export default ItemList;
