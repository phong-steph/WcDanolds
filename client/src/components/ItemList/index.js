import React, { useState, useEffect } from "react";

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
    <ul>
      {items.map((item) => {
        return (
          <>
            <li>
              <img src={item.logo} alt={item.title} />
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default ItemList;
