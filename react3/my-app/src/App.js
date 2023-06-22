import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from "nanoid";

import './css/main.css';

import Input from './components/Input/Input';
import Loader from './components/Loader/Loader';
import TodoList from './components/TodoList/TodoList';
import Button from './components/Button/Button';

import { Filter, filterItems, SortType, sortItems } from './utils.js'
import { useData } from './effects/useData';


function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [selectedFiter, setFilter] = useState(Filter.NoFilter);
  const [selectedSortType, setSortType] = useState(SortType.NoSort);
  const [todosData, isLoaded, error] = useData("https://jsonplaceholder.typicode.com/todos");
  const inputRef = useRef(null);

  useEffect(() => setTodoItems(todosData.slice(20)), [todosData]);
  useEffect(() => inputRef.current.focus(), []);

  const filteredTodoItems = useMemo(() => filterItems(selectedFiter, todoItems), [selectedFiter, todoItems]);
  const filteredAndSortedTodoItems = useMemo(() => sortItems(selectedSortType, filteredTodoItems), [selectedSortType, filteredTodoItems]);

  async function toggleItemCompleted(id) {
    const completed = !todoItems.find((item) => id === item.id).completed;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          completed: completed
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const updatedItems = todoItems.map((item) => id === item.id ? {...item, completed: completed} : item);
      setTodoItems(updatedItems);
    }
    catch (error) {
      console.log(error);
      alert("Unable to sync 'completed' state.");
    }
  }

  async function deleteTodoItem(id) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const remainingItems = todoItems.filter((item) => id !== item.id);
      setTodoItems(remainingItems);
    }
    catch (error) {
      console.log(error);
      alert("Unable to remove.");
    }
  }

  async function addTodoItem(description) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: description,
          completed: false,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const newItem = await response.json();

      // jsonplaceholder returns the same ID for all "new" element
      newItem.id = `todo-${nanoid()}`;

      setTodoItems([...todoItems, newItem]);
    }
    catch (error) {
      console.log(error);
      alert("Unable to add new item");
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else {
    return (
      <div className="App">
        <div className="header">
          <h2 className="title">To Do List</h2>
          <Input ref={inputRef} addTodoItem={addTodoItem}/>
          <Button text="All" action={() => setFilter(Filter.NoFilter)} />
          <Button text="Active" action={() => setFilter(Filter.Active)} />
          <Button text="Completed" action={() => setFilter(Filter.Completed)} />
          <br/>
          <Button text="No Sort" action={() => setSortType(SortType.NoSort)} />
          <Button text="Sort by description" action={() => setSortType(SortType.ByName)} />
          <Button text="Sort by status" action={() => setSortType(SortType.ByStatus)} />
        </div>
        { !isLoaded ?
            <Loader /> :
            <TodoList itemsList={filteredAndSortedTodoItems} toggleCompleted={toggleItemCompleted} deleteItem={deleteTodoItem}/>
        }
      </div>
    );
  }
}

export default App;
