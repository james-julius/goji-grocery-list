import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
      <nav>
        <ul>
          <Link to="/">
            <li>View List</li>
          </Link>
          <Link to="/add-item">
            <li>Add Item</li>
          </Link>
        </ul>
      </nav>
    );
}