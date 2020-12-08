import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function GroceryEntry() {
    const { groceryItemId } = useParams('id');
    const [item, setItem] = useState(null);

    useEffect(() => {
      if (!item) {
        const localList = localStorage.getItem("shoppingList");
        if (localList) {
            const listItem = localList.filter((item) => item.id === groceryItemId);
            if (listItem) {
            setItem(listItem);
            }
        }
      }
    }, [item, groceryItemId]);

    return (
        <div class="grocery-item-page">
            <h3>{groceryItemId}</h3>
            <div className="manage-item">

            </div>
        </div>
    )
}