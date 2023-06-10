import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";

import './css/main.css';

import Input from './components/Input/Input';
import Loader from './components/Loader/Loader';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const jsonResponse = await response.json();
        setIsLoaded(true);
        setTodoItems(jsonResponse);
      }
      catch (error) {
        setIsLoaded(true);
        setError(error);
      }},
      1000);
    }, []
  )

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
          <Input addTodoItem={addTodoItem}/>
        </div>
        { !isLoaded ?
            <Loader /> :
            <TodoList itemsList={todoItems} toggleCompleted={toggleItemCompleted} deleteItem={deleteTodoItem}/>
        }
      </div>
    );
  }
}

export default App;
