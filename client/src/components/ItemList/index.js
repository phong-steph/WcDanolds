import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { itemAdded } from "../../containers/itemsSlice";

import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.itemsReducer);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/items");
      const json = await response.json();
      setItems(json.items);
    };

    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    dispatch(itemAdded(item));
  };

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
            <li key={item.id} onClick={() => handleItemClick(item)}>
              <Item {...item} cardNbItems={cardNbItems} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
