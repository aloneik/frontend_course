import { useState } from "react";

import styles from "./Input.module.css"

function Input({ addTodoItem }) {
    const [itemDescription, setDescription] = useState('');

    function handleSubmit(e) {
        addTodoItem(itemDescription);
        setDescription("");
    }

    return (
        <div>
            <input
                className={styles.input}
                type="text"
                id="listItemInput"
                placeholder="Enter task description..."
                value={itemDescription}
                onChange={e => setDescription(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className={styles.addBtn}
            >
                Add
            </button>
        </div>
    );
}

export default Input;