import { useState, useEffect, useRef } from 'react';

import './css/main.css';

import Input from './components/Input/Input';
import TodoList from './components/TodoList/TodoList';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';

import { Filter, SortType } from './utils.js';

import JsonPlaceholderService from "./services/JsonPlaceholderServise";

import { ThemeContext } from "./contexts/ThemeContext";
import { TodoItemsProvider } from "./contexts/TodoItemsContext";
import { FilteredTodoItemsProvider } from "./contexts/TodosFilterContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [selectedFiter, setFilter] = useState(Filter.NoFilter);
  const [selectedSortType, setSortType] = useState(SortType.NoSort);
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);

  const filterButtons = [
    {label: "All", id: 1},
    {label: "Active", id:2},
    {label: "Completed", id: 3}
  ];
  const sortTypeButtons = [
    {label: "No Sort", id: 1},
    {label: "Sort A-Z", id: 2},
    {label: "Sort Z-A", id: 3},
    {label: "Sort by status", id: 4}
  ];

  function setFilterById(id) {
    const filterType = id === 1 ? Filter.NoFilter : (id === 2 ? Filter.Active : Filter.Completed);
    setFilter(filterType);
  }

  function setSortById(id) {
    id = +id;
    let sortType;
    if (id === 1) {
      sortType = SortType.NoSort;
    }
    else if (id === 2) {
      sortType = SortType.ByNameAToZ;
    }
    else if (id === 3) {
      sortType = SortType.ByNameZToA;
    }
    else if (id === 4) {
      sortType = SortType.ByStatus;
    }
    setSortType(sortType);
  }

  return (
    <ThemeContext.Provider value={theme}>
    <TodoItemsProvider itemsProviderService={JsonPlaceholderService}>
    <FilteredTodoItemsProvider filterType={selectedFiter} sortType={selectedSortType}>
    <div className="App">
      <div className="header">
        <h2 className="title">To Do List</h2>
        <Input ref={inputRef}/>
        <ButtonGroup
          buttons={filterButtons}
          defaultSelection={filterButtons[0].id}
          clickHandle={(_, id) => setFilterById(id)}
        />
        <br/>
        <label for="sortTypeSelector">Select sort type:</label>
        <select name="sortTypeSelector" id="sortTypeSelector" onChange={e => setSortById(e.target.value)}>
          {sortTypeButtons.map(b => <option value={b.id}>{b.label}</option>)}
        </select>
        <br/>
        <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
          Use dark mode
        </label>
      </div>
      <TodoList />
    </div>
    </FilteredTodoItemsProvider>
    </TodoItemsProvider>
    </ThemeContext.Provider>
  );
}

export default App;
