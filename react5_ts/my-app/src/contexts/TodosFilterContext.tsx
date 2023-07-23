import { useMemo, createContext, useContext } from 'react';

import ITodoItem from '../types/TodoItemType.ts';
import { FilterType, SortType, filterItems, sortItems } from "../utils.ts";
import { useTasks } from "./TodoItemsContext.tsx";

type FilteredTodoItemsProviderProps = {
    children?: React.ReactNode,
    filterType: FilterType,
    sortType: SortType,
};

const FilteredTodoItemsContext = createContext<ITodoItem[]>([]);

export function FilteredTodoItemsProvider({ filterType, sortType, children }: FilteredTodoItemsProviderProps) {
    const tasks = useTasks();

    const filteredTodoItems = useMemo(() => filterItems(filterType, tasks), [filterType, tasks]);
    const filteredAndSortedTodoItems = useMemo(() => sortItems(sortType, filteredTodoItems), [sortType, filteredTodoItems]);

    return (
        <FilteredTodoItemsContext.Provider value={filteredAndSortedTodoItems}>
            {children}
        </FilteredTodoItemsContext.Provider>
    );
}

export function useFilteredTasks() {
    return useContext(FilteredTodoItemsContext);
}
