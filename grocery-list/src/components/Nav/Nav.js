import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
    return (
      <nav>
        <div className="logo">
            <h2>GroceryList</h2>
        </div>
        <ul className="navlist">
          <NavLink to="/">
            <li>View List</li>
          </NavLink>
          <NavLink to="/grocery-entry/:id">
            <li>Add Item</li>
          </NavLink>
        </ul>
      </nav>
    );
}