import { useState } from "react";

function Input({ addTodoItem }) {
    const [itemDescription, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        addTodoItem(itemDescription);
        setDescription("");
      }

    return (
        <div className="input">
            <input
                type="text"
                id="listItemInput"
                placeholder="Enter task description..."
                value={itemDescription}
                onChange={e => setDescription(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="addBtn"
            >
                Add
            </button>
        </div>
    );
}

export default Input;