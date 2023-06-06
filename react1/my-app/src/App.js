import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";

import './css/main.css';
import ListItem from './components/ListItem/ListItem.js';
import Input from './components/Input/Input';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey) || "[]"),
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

function App() {
  const [todoItems, setTodoItems] = useStateWithLocalStorage('todoItems');

  function toggleItemCompleted(id) {
    const updatedItems = todoItems.map((item) => id === item.id ? {...item, completed: !item.completed} : item);
    setTodoItems(updatedItems);
  }

  function deleteTodoItem(id) {
    const remainingItems = todoItems.filter((item) => id !== item.id);
    setTodoItems(remainingItems);
  }

  const listItems = todoItems.map(todoItem =>
    <ListItem
      description={todoItem.description}
      completed={todoItem.completed}
      id={todoItem.id}
      key={todoItem.id}
      toggleCompleted={toggleItemCompleted}
      deleteItem={deleteTodoItem} />
  );

  function addTodoItem(description) {
    const newItem = { id: `todo-${nanoid()}`, description: description, completed: false };
    setTodoItems([...todoItems, newItem]);
  }

  return (
    <div className="App">
      <div className="header">
        <h2 className="title">To Do List</h2>
        <Input addTodoItem={addTodoItem}/>
      </div>
      <ul className="todoList" id="list">
        {listItems}
      </ul>
    </div>
  );
}

export default App;
