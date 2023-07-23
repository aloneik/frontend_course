import { match } from "ts-pattern";

import ITodoItem from "./types/TodoItemType";

export enum FilterType {
    NoFilter,
    Active,
    Completed
}

export enum SortType {
    NoSort,
    ByNameAToZ,
    ByNameZToA,
    ByStatus
}

export function filterItems(selectedFiter: FilterType, todoItems: ITodoItem[]) {
    console.log(`Apply ${selectedFiter} filter`);

    return match(selectedFiter)
        .with(FilterType.NoFilter, _ => todoItems)
        .with(FilterType.Active, _ => todoItems.filter((item) => !item.completed))
        .with(FilterType.Completed, _ => todoItems.filter((item) => item.completed))
        .otherwise(filterType => {
            console.log(`Unknown filter type: ${filterType}`);
            return todoItems;
        });
};

export function sortItems(selectedSortType: SortType, todoItems: ITodoItem[]) {
    console.log(`Apply ${selectedSortType} sort type`);

    return match(selectedSortType)
        .with(SortType.NoSort, _ => todoItems)
        .with(SortType.ByNameAToZ, _ => [...todoItems].sort((a, b) => a.description.localeCompare(b.description)))
        .with(SortType.ByNameZToA, _ => [...todoItems].sort((a, b) => -1 * a.description.localeCompare(b.description)))
        .with(SortType.ByStatus, _ => [...todoItems].sort(item => item.completed ? -1 : 1))
        .otherwise(sortType => {
            console.log(`Unknown sort type: ${sortType}`);
            return todoItems;
        });
};
