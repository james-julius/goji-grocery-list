import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

export default function ItemAdder({ addItem }) {
    const [newItemName, setNewItemName] = useState('');
    const [haveNewItem, setHaveNewItem] = useState(false);
    const [newItemImportance, setNewItemImportance] = useState(3);

    function handleImportanceChange(e) {
        e.preventDefault();
        setNewItemImportance(e.target.value);
    }

    function handleNewItemNameChange(e) {
      e.preventDefault();
      setNewItemName(e.target.value);
    }

    function handleHaveNewItemChange(e) {
        e.preventDefault();
        setHaveNewItem(e.target.value);
    }
    
    function genUniqueId() {
        const validatingUnique = true;
        while (validatingUnique) {
            const newId = uuid();
            const localList = JSON.parse(localStorage.getItem("shoppingList"));
            if (localList === null || localList.length === 0) {
                return newId;
            } else {
                if (localList.findIndex(el => el.id === newId) === -1) {
                    return newId;
                }
            }
        }
    }

    function handleAddItem() {
        // Validation checks, before using the addItem prop passed down to create it.
        if (!newItemName) {
            alert("Please ensure you have filled out all item fields!");
            return;
        }

        const uniqueId = genUniqueId();

        const newItem = {
            name: newItemName,
            id: uniqueId,
            currentlyHave: haveNewItem,
            lastUpdated: DateTime.local(),
        };
        addItem(newItem);
    }

    return (
      <div className="item-adder">
        Add a new item:
        <label>
          Item name:
          <input
            type="text"
            min="3"
            value={newItemName}
            onChange={handleNewItemNameChange}
            placeholder="Item name.."
          />
        </label>
        <label>
          Do you have it now?
          <input type="checkbox" value={haveNewItem} onChange={handleHaveNewItemChange}/>
        </label>
        <label>
          How important is this? 1 = highest, 5 = lowest
          <select value={newItemImportance} onChange={handleImportanceChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button onClick={handleAddItem}>
            Add Item
        </button>
      </div>
    );
}