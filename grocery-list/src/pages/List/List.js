import React, { useState, useEffect } from 'react';
import ItemAdder from '../../components/ItemAdder/ItemAdder';
import GroceryListItem from '../../components/GroceryListItem/GroceryListItem';
import './List.scss';

export default function List() {
    const [items, setItems] = useState([
      {
        name: "Milk",
        id: '123',
        currentlyHave: true
      },
      {
        name: "Eggs",
        id: '25',
        currentlyHave: false

      },
    ]);

    useEffect(() => {
        if (items === []) {
            const localList = localStorage.getItem('shoppingList');
            if (localList) {
                setItems(localList);
            }
        }
    }, [items]);

    return (
      <div className="list-page">
        Your shopping list
        <ItemAdder/>
        <ul className="shopping-list">
          {items.map((item, idx) => {
            return (
                <GroceryListItem item={item} key={idx}/>
            );
          })}
        </ul>
      </div>
    );
}