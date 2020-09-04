import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const cardItems = useSelector((state) => state.itemsReducer);
  console.log(cardItems);
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
          let cardNbItems = 0;
          const foundItem = cardItems.find(
            (cardItem) => item.id === cardItem.id
          );
          if (foundItem) cardNbItems = foundItem.nbItems;
          return (
            <li key={item.id}>
              <Item {...item} cardNbItems={cardNbItems} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
