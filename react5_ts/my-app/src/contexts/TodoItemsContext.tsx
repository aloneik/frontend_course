import React from 'react';
import { createContext, useState, useContext, useReducer, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { match, P } from "ts-pattern";

import { BaseTodosService } from '../services/BaseService';
import ITodoItem from '../types/TodoItemType';

type TodoItesContextProviderProps<TProvider> = {
    children?: React.ReactNode,
    providerService: TProvider
};

class TodosInitAction {
    public readonly initialItems: ITodoItem[];

    constructor(items: ITodoItem[]) {
        this.initialItems = items;
    }
};

class TodosAddAction {
    public readonly id: string;
    public readonly description: string;

    constructor(id: string, description: string) {
        this.id = id;
        this.description = description;
    }
};

class TodosChangeAction {
    public readonly todoItem: ITodoItem;

    constructor(todoItem: ITodoItem) {
        this.todoItem = todoItem;
    }
};

class TodosDeleteAction {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
};

declare type TodosAction = TodosInitAction | TodosAddAction | TodosChangeAction | TodosDeleteAction;

interface IWrappedDispatch {
    add(description: string): Promise<void>,
    change(itemId: string): Promise<void>,
    delete(itemId: string): Promise<void>,
    initialize(todosData: ITodoItem[]): void
}

interface IItemsLoadingState {
    isLoaded: boolean,
    error: string | null
}

const TodoItemsContext = createContext<ITodoItem[]>([]);
const TodoItemsDispatchContext = createContext<IWrappedDispatch | null>(null);
const ItemsLoadingStateContext = createContext<IItemsLoadingState>({ isLoaded: false, error: null });

export function TodoItemsProvider<TProvider extends BaseTodosService>({ children, providerService }: TodoItesContextProviderProps<TProvider>) {
    const tasksContext = useContext(TodoItemsContext);
    const [tasks, dispatch] = useReducer(todoItemsReducer, tasksContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingError, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await providerService.getItems();
                dispatch(new TodosInitAction(fetchedData));
            }
            catch (error) {
                setError((error as Error).message);
            }
            finally {
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [providerService]);

    async function handleItemAdded(description: string) {
        try {
            const newItem = await providerService.addTodoItem(description, false, 1);

            // jsonplaceholder returns the same ID for all "new" element
            const id = `todo-${nanoid()}`;

            dispatch(new TodosAddAction(id, newItem.description));
        }
        catch (error) {
            console.log(error);
            alert("Unable to add new item");
        }
    }

    async function handleItemChanged(itemId: string) {
        const changedItem = tasks.find((item: ITodoItem) => itemId === item.id);
        match(changedItem)
            .with(undefined, _ => console.log(`Unable to find item with id: ${itemId}`))
            .otherwise(async item => {
                item.completed = !item.completed;
                try {
                    await providerService.updateTodoItem(itemId, { completed: item.completed });

                    dispatch(new TodosChangeAction(item));
                }
                catch (error) {
                    console.log(error);
                    alert("Unable to sync 'completed' state.");
                }
            });
    }

    async function handleItemDeleted(itemId: string) {
        try {
            await providerService.deleteTodoItem(itemId);

            dispatch(new TodosDeleteAction(itemId));
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
        initialize: (todosData: ITodoItem[]) => dispatch(new TodosInitAction(todosData))
    };

    return (
        <TodoItemsContext.Provider value={ tasks }>
            <TodoItemsDispatchContext.Provider value={ wrappedDispatch }>
                <ItemsLoadingStateContext.Provider value={ { isLoaded: isLoaded, error: loadingError } }>
                    { children }
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

function todoItemsReducer(todoItems: ITodoItem[], action: TodosAction) {
    return match(action)
        .with(P.instanceOf(TodosInitAction), action => action.initialItems)
        .with(P.instanceOf(TodosAddAction), action => {
            return [
                ...todoItems,
                {
                    id: action.id,
                    description: action.description,
                    completed: false,
                },
            ];
        })
        .with(P.instanceOf(TodosChangeAction), action => {
            return todoItems.map((item) => {
                if (item.id === action.todoItem.id) {
                    return action.todoItem;
                } else {
                    return item;
                }
            });
        })
        .with(P.instanceOf(TodosDeleteAction), action => todoItems.filter((item) => item.id !== action.id))
        .otherwise(action => {
            console.log(`Unknown action type: ${typeof(action)}`);
            return todoItems;
        });
}
