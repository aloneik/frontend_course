export const Filter = Object.freeze({
    NoFilter: Symbol("noFilter"),
    Active: Symbol("active"),
    Completed: Symbol("completed")
});

export const SortType = Object.freeze({
    NoSort: Symbol("noSort"),
    ByNameAToZ: Symbol("byNameAtoZ"),
    ByNameZToA: Symbol("byNameZtoA"),
    ByStatus: Symbol("byStatus")
});

export function filterItems(selectedFiter, todoItems) {
    console.log(`Apply ${selectedFiter.toString()} filter`);

    if (selectedFiter === Filter.NoFilter) {
        return todoItems;
    }
    else if (selectedFiter === Filter.Active) {
        return todoItems.filter((item) => !item.completed);
    }
    else if (selectedFiter === Filter.Completed) {
        return todoItems.filter((item) => item.completed);
    }
};

export function sortItems(selectedSortType, todoItems) {
    console.log(`Apply ${selectedSortType.toString()} sort type`);

    if (selectedSortType === SortType.NoSort) {
        return todoItems;
    }

    let sorted = [...todoItems];
    if (selectedSortType === SortType.ByNameAToZ) {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (selectedSortType === SortType.ByNameZToA) {
        sorted.sort((a, b) => -1 * a.title.localeCompare(b.title));
    }
    else if (selectedSortType === SortType.ByStatus) {
        sorted.sort((a, b) => a.completed - b.completed);
    }
    else {
        console.log(`Unknown sort type: '${selectedSortType}'`);
    }
    return sorted;
};
