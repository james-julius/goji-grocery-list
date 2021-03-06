import React, { useState, useEffect, useCallback } from 'react';
import ItemAdder from '../../components/ItemAdder/ItemAdder';
import GroceryListItem from '../../components/GroceryListItem/GroceryListItem';
import './List.scss';

export default function List() {
    const [items, setItems] = useState(null);
    const [listFilter, setListFilter] = useState('abc');

    useEffect(() => {
        // Ensure we have local storage set up and running on page load. If not, we create it.
        if (items === null) {
            console.log('Items not instantiated. Loading...');
            const localList = localStorage.getItem("shoppingList");
            if (localList === null) {
                console.log('instantiating localStorage');
                localStorage.setItem('shoppingList', JSON.stringify([]));
                setItems([]);
            } else {
                setItems(JSON.parse(localList));
            }
        }
    }, []);

    useEffect(() => {
      localStorage.setItem('shoppingList', JSON.stringify(items));
    }, [items]);

    function deleteListItem(itemId) {
        const itemIndex = items.findIndex(groceryItem => groceryItem.id === itemId);

        if (itemIndex !== -1) {
            const itemsCopy = [...items];
            itemsCopy.splice(itemIndex, 1);
            setItems(itemsCopy);
        }
    }

    function toggleItemInStock(itemId) {
        const itemIndex = items.findIndex(
          (groceryItem) => groceryItem.id === itemId
        );
        const itemsCopy = [...items];
        const groceryItem = itemsCopy[itemIndex];
        
        groceryItem.currentlyHave = !groceryItem.currentlyHave;
        setItems(itemsCopy);
    }

    function createNewListItem(item) {
        const itemsCopy = [...items];
        itemsCopy.push(item);
        setItems(itemsCopy);
    }

    const generateFilteredShoppingList = useCallback(() => {
        const itemsCopy = items;
        /* Function that handles the list filters and maps the GroceryList accordingly. */
        if (!items || items.length === 0) {
            return <h4>There's nothing here yet. Add an item!</h4>;
        }
        // Sort list items before we return.
        switch (listFilter) {
          case "abc":
              itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "zxy":
              itemsCopy.sort(function (a, b) {
                  if (a.name < b.name) {
                      return 1;
                  }
                  if (a.name > b.name) {
                      return -1;
                  } else {
                    return 0;
                  }
              });
            break;
          case "123":
              itemsCopy.sort((a, b) => b.priority - a.priority);
            break;
          case "321":
              itemsCopy.sort((a, b) => a.priority - b.priority);
            break;
            default:
                // Do nothing
            break;
        } 
            return (
            <ul className="shopping-list">
                {itemsCopy.map((item, idx) => {
                return <GroceryListItem
                          item={item} 
                          key={idx} 
                          deleteItem={deleteListItem}
                          toggleItemStatus={toggleItemInStock}
                        />;
                })}
            </ul>
            );
    }, [listFilter]);

    return (
      <div className="list-page">
        <h1>Your shopping list</h1>
        <ItemAdder addItem={createNewListItem} />
        <div className="filter-dropdown">
          <label>Sort by: </label>
          <select
            value={listFilter}
            onChange={(e) => setListFilter(e.target.value)}
          >
            <option value="abc">Alphabetical</option>
            <option value="zxy">Reverse Alphabetical</option>
            <option value="123">Priority</option>
            <option value="321">Reverse Priority</option>
          </select>
        </div>
        {generateFilteredShoppingList()}
      </div>
    );
}