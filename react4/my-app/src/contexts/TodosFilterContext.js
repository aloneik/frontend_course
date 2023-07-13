import { useMemo, createContext, useContext } from 'react';

import { filterItems, sortItems } from "../utils.js";

import { useTasks } from "./TodoItemsContext";

const FilteredTodoItemsContext = createContext([]);

export function FilteredTodoItemsProvider({ filterType, sortType, children }) {
    const tasks = useTasks();

    const filteredTodoItems = useMemo(() => filterItems(filterType, tasks), [filterType, tasks]);
    const filteredAndSortedTodoItems = useMemo(() => sortItems(sortType, filteredTodoItems), [sortType, filteredTodoItems]);

    return <FilteredTodoItemsContext.Provider value={filteredAndSortedTodoItems}>{children}</FilteredTodoItemsContext.Provider>;
}

export function useFilteredTasks() {
    return useContext(FilteredTodoItemsContext);
}
