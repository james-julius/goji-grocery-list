import React, { useState, useEffect } from 'react';
import ItemAdder from '../../components/ItemAdder/ItemAdder';
import { Link } from 'react-router-dom';
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

    function handleItemClick(e) {
        e.preventDefault();

    }

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
              <li className="list-item" key={idx}>
                {item.name}
                {item.currentlyHave ? (
                  <span className="stock-status have">Have</span>
                ) : (
                  <span className="stock-status out">Ran out</span>
                )}
                <span className="last-updated">
                  Last updated: {item.lastUpdated}
                </span>
                <Link to={`/grocery-item/${item.id}`}>
                  <button>View</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
}