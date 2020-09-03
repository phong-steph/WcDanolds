import React, { useState, useEffect } from "react";

import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);

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
        {items.map((item) => (
          <li key={item.id}>
            <Item {...item} nb={0} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
