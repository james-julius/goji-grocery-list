import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import moment  from 'moment';
import './ItemAdder.scss';

export default function ItemAdder({ addItem }) {
    const [newItemName, setNewItemName] = useState('');
    const [haveNewItem, setHaveNewItem] = useState(false);
    const [newItemImportance, setNewItemImportance] = useState(3);

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
            lastUpdated: moment.now(),
            priority: newItemImportance
        };
        addItem(newItem);
        setNewItemName('');
        setNewItemImportance(3);
        setHaveNewItem(false);
    }

    return (
      <div className="item-adder">
        <h3>Add a new item:</h3>
        <label>
          Item name:
          <input
            type="text"
            min="3"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name.."
          />
        </label>
        <label class="checkbox">
          Do you have it now?
          <input
            type="checkbox"
            value={haveNewItem}
            onChange={(e) => setHaveNewItem(e.target.value)}
          />
        </label>
        <label>
          How important is this? (1 = high, 5 = low)<br/>
          <select
            value={newItemImportance}
            onChange={(e) => setNewItemImportance(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    );
}