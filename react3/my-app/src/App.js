import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from "nanoid";

import './css/main.css';

import Input from './components/Input/Input';
import Loader from './components/Loader/Loader';
import TodoList from './components/TodoList/TodoList';
import Button from './components/Button/Button';

import { Filter, filterItems, SortType, sortItems } from './utils.js'
import { useData } from './effects/useData';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';


function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [selectedFiter, setFilter] = useState(Filter.NoFilter);
  const [selectedSortType, setSortType] = useState(SortType.NoSort);
  const [todosData, isLoaded, error] = useData("https://jsonplaceholder.typicode.com/todos");
  const inputRef = useRef(null);

  useEffect(() => setTodoItems(todosData), [todosData]);
  useEffect(() => inputRef.current.focus(), []);

  const filteredTodoItems = useMemo(() => filterItems(selectedFiter, todoItems), [selectedFiter, todoItems]);
  const filteredAndSortedTodoItems = useMemo(() => sortItems(selectedSortType, filteredTodoItems), [selectedSortType, filteredTodoItems]);

  const filterButtons = [
    {label: "All", id: 1},
    {label: "Active", id:2},
    {label: "Completed", id: 3}
  ];
  const sortTypeButtons = [
    {label: "No Sort", id: 1},
    {label: "Sort by description", id: 2},
    {label: "Sort by status", id: 3}
  ];

  function setFilterById(id) {
    const filterType = id === 1 ? Filter.NoFilter : (id === 2 ? Filter.Active : Filter.Completed);
    setFilter(filterType);
  }

  function setSortById(id) {
    const sortType = id === 1 ? SortType.NoSort : (id === 2 ? SortType.ByName : SortType.ByStatus);
    setSortType(sortType);
  }

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
          <ButtonGroup
            buttons={filterButtons}
            defaultSelection={filterButtons[0].id}
            clickHandle={(_, id) => setFilterById(id)}
          />
          <br/>
          <ButtonGroup
            buttons={sortTypeButtons}
            defaultSelection={sortTypeButtons[0].id}
            clickHandle={(_, id) => setSortById(id)}
          />
        </div>
        { !isLoaded ?
            <Loader /> :
            <TodoList
              itemsList={filteredAndSortedTodoItems}
              toggleCompleted={toggleItemCompleted}
              deleteItem={deleteTodoItem}
            />
        }
      </div>
    );
  }
}

export default App;
