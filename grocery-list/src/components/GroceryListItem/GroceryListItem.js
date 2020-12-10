import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './GroceryListItem.scss';

export default function GroceryListItem({ item, deleteItem, toggleItemStatus}) {
    return (
      <li className="list-item">
        <h6>{item.name}</h6>
        <div class="status-container">
          {item.currentlyHave ? (
            <span
              onClick={() => toggleItemStatus(item.id)}
              className="stock-status have"
            >
              HAVE
            </span>
          ) : (
            <span
              onClick={() => toggleItemStatus(item.id)}
              className="stock-status out"
            >
              OUT
            </span>
          )}
          <span className="last-updated">
            Last updated: <br /> {moment(item.lastUpdated).format("Do MMM")}
          </span>
        </div>
        <div class="action-container">
          <Link to={`/grocery-item/${item.id}`}>
            <button className="item-link">View</button>
          </Link>
          <button className="delete" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      </li>
    );
}