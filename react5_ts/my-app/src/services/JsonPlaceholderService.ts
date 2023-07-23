import ITodoItem from "../types/TodoItemType";
import { BaseTodosService } from "./BaseService";

interface IJsonPlaceholderData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export default class JsonPlaceholderService implements BaseTodosService {
    private static baseUrl = "https://jsonplaceholder.typicode.com";
    private static todosHandle = `${JsonPlaceholderService.baseUrl}/todos`;
    private static basicHeaders = {
        "Content-type": "application/json; charset=UTF-8",
    };

    private static async fetchData(url: string): Promise<IJsonPlaceholderData[]> {
        const response = await fetch(url);
        return await response.json();
    }

    async getItems(): Promise<ITodoItem[]> {
        return JsonPlaceholderService.fetchData(JsonPlaceholderService.todosHandle)
            .then(items => items.map<ITodoItem>(item => ({
                description: item.title,
                completed: item.completed,
                id: `${item.id}`
            })));
    }

    async addTodoItem(description: string, completed: boolean, userId: number) {
        const response = await fetch(JsonPlaceholderService.todosHandle, {
            method: "POST",
            body: JSON.stringify({
                title: description,
                completed: completed,
                userId: userId
            }),
            headers: JsonPlaceholderService.basicHeaders
        })
        const newItem = await response.json().then(item => ({
            description: item.title,
            completed: item.completed,
            id: `${item.id}`
        }));
        return newItem;
    }

    async updateTodoItem(todoItemId: string, updatedState: object) {
        await fetch(`${JsonPlaceholderService.todosHandle}/${todoItemId}`, {
            method: "PATCH",
            body: JSON.stringify({...updatedState}),
            headers: JsonPlaceholderService.basicHeaders
        });
    }

    async deleteTodoItem(todoItemId: string) {
        await fetch(`${JsonPlaceholderService.todosHandle}/${todoItemId}`, {
            method: "DELETE",
            headers: JsonPlaceholderService.basicHeaders
        });
    }
}