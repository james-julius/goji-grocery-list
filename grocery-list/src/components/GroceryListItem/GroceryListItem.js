import React from 'react';
import { Link } from 'react-router-dom';

export default function GroceryListItem({ item, key}) {
    return (
      <li className="list-item" key={key}>
        {item.name}
        {item.currentlyHave ? (
          <span className="stock-status have">Have</span>
        ) : (
          <span className="stock-status out">Ran out</span>
        )}
        <span className="last-updated">Last updated: {item.lastUpdated}</span>
        <Link to={`/grocery-item/${item.id}`}>
          <button>View</button>
        </Link>
      </li>
    );
}