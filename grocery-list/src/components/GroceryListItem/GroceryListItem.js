import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function GroceryListItem({ item, deleteItem}) {
    return (
      <li className="list-item">
        {item.name}
        {item.currentlyHave ? (
          <span className="stock-status have">Have</span>
        ) : (
          <span className="stock-status out">Ran out</span>
        )}
        <span className="last-updated">Last updated: </span>
        <Link to={`/grocery-item/${item.id}`}>
          <button className="item-link">View</button>
        </Link>
        <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
      </li>
    );
}