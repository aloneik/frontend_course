import ITodoItem from "../types/TodoItemType";

export interface BaseTodosService {
    getItems(): Promise<ITodoItem[]>;
    addTodoItem(description: string, completed: boolean, userId: number): Promise<ITodoItem>;
    updateTodoItem(todoItemId: string, updatedState: object): Promise<void>;
    deleteTodoItem(todoItemId: string): Promise<void>;
}