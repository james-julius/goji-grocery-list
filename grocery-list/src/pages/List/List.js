import React, { useState, useEffect, useCallback } from 'react';
import ItemAdder from '../../components/ItemAdder/ItemAdder';
import GroceryListItem from '../../components/GroceryListItem/GroceryListItem';
import './List.scss';

export default function List() {
    const [items, setItems] = useState(null);
    const [listFilter, setListFilter] = useState(null);
    const [itemsChanged, setItemsChanged] = useState(false);

    useEffect(() => {
        // Ensure we have local storage set up and running on page load. If not, we create it.
        if (items === null) {
            console.log('Items not instantiated. Loading...');
            const localList = window.localStorage.getItem("shoppingList");
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
        const localList = window.localStorage.getItem("shoppingList");
        setItems(JSON.parse(localList));
    }, [itemsChanged]);

    function deleteListItem(itemId) {
        const itemIndex = items.findIndex(groceryItem => groceryItem.id === itemId);

        if (itemIndex !== -1) {
            items.splice(itemIndex, 1);
            localStorage.setItem('shoppingList', JSON.stringify(items));
            toggleItemsChanged();
        }
    }

    function createNewListItem(item) {
        const localList = JSON.parse(window.localStorage.getItem("shoppingList"));
        console.log('retrieved local item: ' + localList);
        localList.push(item);
        window.localStorage.setItem('shoppingList', JSON.stringify(localList));
        setItems(localList,);
    }

    const generateFilteredShoppingList = useCallback(() => {
        /* Function that handles the list filters and maps the GroceryList accordingly. */
        if (!items) {
            return <h4>There's nothing here yet. Add an item!</h4>;
        }
        if (!listFilter) {
            return (
            <ul className="shopping-list">
                {items.map((item, idx) => {
                return <GroceryListItem item={item} key={idx} deleteItem={deleteListItem}/>;
                })}
            </ul>
            );
        }
    }, [items, listFilter]);

    function toggleItemsChanged() {
      setItemsChanged(!itemsChanged);
    }

    return (
      <div className="list-page">
        Your shopping list
        <div className="filter-option">
            <label>Sort by:</label>
            <select value={listFilter} onChange={e => setListFilter(e.target.value)}>
                <option value="abc"></option>
            </select>
        </div>
        <ItemAdder addItem={createNewListItem}/>
          {generateFilteredShoppingList()}
      </div>
    );
}