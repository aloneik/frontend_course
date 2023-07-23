import { useState, useEffect, useRef, useMemo } from 'react';

import { match } from 'ts-pattern';

import './css/main.css';

import Input from './components/Input/Input';
import TodoList from './components/TodoList/TodoList';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';

import { FilterType, SortType } from './utils.ts';

import JsonPlaceholderService from './services/JsonPlaceholderService';

import { Theme, ThemeContext } from "./contexts/ThemeContext";
import { TodoItemsProvider } from "./contexts/TodoItemsContext";
import { FilteredTodoItemsProvider } from "./contexts/TodosFilterContext";

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [selectedFiter, setFilter] = useState<FilterType>(FilterType.NoFilter);
  const [selectedSortType, setSortType] = useState<SortType>(SortType.NoSort);
  const inputRef = useRef<HTMLInputElement>(null);

  const jsonplaceholderService = useMemo(() => new JsonPlaceholderService(), []);

  useEffect(() => inputRef.current?.focus(), []);

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

  function setFilterById(id: number): void {
    const filterType = match(id)
      .returnType<FilterType>()
      .with(1, _ => FilterType.NoFilter)
      .with(2, _ => FilterType.Active)
      .with(3, _ => FilterType.Completed)
      .otherwise(_ => FilterType.NoFilter);
    setFilter(filterType);
  }

  function setSortById(strId: string) {
    const id = +strId;
    const sortType = match(id)
      .returnType<SortType>()
      .with(1, _ => SortType.NoSort)
      .with(2, _ => SortType.ByNameAToZ)
      .with(3, _ => SortType.ByNameZToA)
      .with(4, _ => SortType.ByStatus)
      .otherwise(_ => SortType.NoSort);
    setSortType(sortType);
  }

  return (
    <ThemeContext.Provider value={theme}>
    <TodoItemsProvider providerService={jsonplaceholderService}>
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
        <label htmlFor="sortTypeSelector">Select sort type:</label>
        <select name="sortTypeSelector" id="sortTypeSelector" onChange={e => setSortById(e.target.value)}>
          {sortTypeButtons.map(b => <option value={b.id}>{b.label}</option>)}
        </select>
        <br/>
        <label>
        <input
          type="checkbox"
          checked={theme === Theme.Dark}
          onChange={(e) => {
            setTheme(e.target.checked ? Theme.Dark : Theme.Light)
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
