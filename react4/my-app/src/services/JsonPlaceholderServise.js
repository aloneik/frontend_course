export default class JsonPlaceholderService {
    static #baseUrl = "https://jsonplaceholder.typicode.com";
    static #todosHandle = `${JsonPlaceholderService.#baseUrl}/todos`;
    static #basicHeaders = {
        "Content-type": "application/json; charset=UTF-8",
    };

    static async #fetchData(url) {
        const response = await fetch(url);
        const fetchedData = await response.json();
        return fetchedData
    }

    static async getData() {
        return JsonPlaceholderService.getTodos();
    }

    static async getTodos() {
        return JsonPlaceholderService.#fetchData(JsonPlaceholderService.#todosHandle)
    }

    static async addTodoItem(description, completed, userId) {
        const response = await fetch(JsonPlaceholderService.#todosHandle, {
            method: "POST",
            body: JSON.stringify({
                title: description,
                completed: completed,
                userId: userId
            }),
            headers: JsonPlaceholderService.#basicHeaders
        })
        const newItem = await response.json();
        return newItem;
    }

    static async updateTodoItem(todoItemId, updatedState) {
        await fetch(`${JsonPlaceholderService.#todosHandle}/${todoItemId}`, {
            method: "PATCH",
            body: JSON.stringify({...updatedState}),
            headers: JsonPlaceholderService.#basicHeaders
        });
    }

    static async deleteTodoItem(todoItemId) {
        await fetch(`${JsonPlaceholderService.#todosHandle}/${todoItemId}`, {
            method: "DELETE",
            headers: JsonPlaceholderService.#basicHeaders
        });
    }
}