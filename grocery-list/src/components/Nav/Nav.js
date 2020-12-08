import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
    return (
      <nav>
        <div class="logo">
            <h2>GroceryList</h2>
        </div>
        <ul class="navlist">
          <NavLink to="/">
            <li>View List</li>
          </NavLink>
          <NavLink to="/add-item">
            <li>Add Item</li>
          </NavLink>
        </ul>
      </nav>
    );
}