import { createContext, useState, useContext, useReducer, useEffect } from 'react';
import { nanoid } from 'nanoid';

import JsonPlaceholderService from '../services/JsonPlaceholderServise';

const TodoItemsContext = createContext([]);
const TodoItemsDispatchContext = createContext(null);
const ItemsLoadingStateContext = createContext({isLoaded: false, error: null});

export function TodoItemsProvider({ itemsProviderService, children }) {
  const [tasks, dispatch] = useReducer(todoItemsReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingError, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await itemsProviderService.getData();
        dispatch({type: "initialized", initialItems: fetchedData})
      }
      catch (error) {
        setError(error);
      }
      finally {
        setIsLoaded(true);
      }
    }
    fetchData();
  }, [itemsProviderService]);

  async function handleItemAdded(description) {
    try {
      const newItem = await JsonPlaceholderService.addTodoItem(description, false, 1);

      // jsonplaceholder returns the same ID for all "new" element
      const id = `todo-${nanoid()}`;

      dispatch({
        type: "added",
        id: id,
        title: newItem.title
      });
    }
    catch (error) {
      console.log(error);
      alert("Unable to add new item");
    }
  }

  function handleItemChanged(itemId) {
    const completed = !tasks.find((item) => itemId === item.id).completed;
    try {
      JsonPlaceholderService.updateTodoItem(itemId, {completed: completed});

      const updatedItem = tasks.map((item) => itemId === item.id ? {...item, completed: completed} : item);
      dispatch({
        type: "changed",
        todoItem: updatedItem
      });
    }
    catch (error) {
      console.log(error);
      alert("Unable to sync 'completed' state.");
    }
  }

  function handleItemDeleted(itemId) {
    try {
      JsonPlaceholderService.deleteTodoItem(itemId);

      dispatch({
        type: "deleted",
        id: itemId
      });
    }
    catch (error) {
      console.log(error);
      alert("Unable to remove.");
    }
  }

  const wrappedDispatch = {
    add: handleItemAdded,
    change: handleItemChanged,
    delete: handleItemDeleted,
    initialize: (todosData) => dispatch({type: "initialized", initialItems: todosData})
  };

  return (
    <TodoItemsContext.Provider value={tasks}>
      <TodoItemsDispatchContext.Provider value={wrappedDispatch}>
        <ItemsLoadingStateContext.Provider value={{isLoaded: isLoaded, error: loadingError}}>
          {children}
        </ItemsLoadingStateContext.Provider>
      </TodoItemsDispatchContext.Provider>
    </TodoItemsContext.Provider>
  );
}

export function useTasks() {
  return useContext(TodoItemsContext);
}

export function useTasksDispatch() {
  return useContext(TodoItemsDispatchContext);
}

export function useLoadingState() {
  return useContext(ItemsLoadingStateContext);
}

function todoItemsReducer(todoItems, action) {
  switch (action.type) {
      case "initialized": {
          return action.initialItems;
      }
      case "added": {
          return [
              ...todoItems,
              {
                  id: action.id,
                  title: action.title,
                  completed: false,
              },
          ];
      }
      case "changed": {
          return todoItems.map((item) => {
              if (item.id === action.todoItem.id) {
                  return action.todoItem;
              } else {
                  return item;
              }
          });
      }
      case "deleted": {
          return todoItems.filter((item) => item.id !== action.id);
      }
      default: {
          throw Error('Unknown action: ' + action.type);
      }
  }
}
