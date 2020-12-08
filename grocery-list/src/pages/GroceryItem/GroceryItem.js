import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function GroceryEntry() {
    const { groceryItemId } = useParams('id');
    return (
        <div class="grocery-item-page">
            <h3>{groceryItemId}</h3>
        </div>
    )
}