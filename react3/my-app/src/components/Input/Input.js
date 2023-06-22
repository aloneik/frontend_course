import { useState, forwardRef } from "react";

import styles from "./Input.module.css"

export default forwardRef(
    function Input ({ addTodoItem }, inputRef) {
        const [itemDescription, setDescription] = useState('');

        function handleSubmit(e) {
            addTodoItem(itemDescription);
            setDescription("");
        }

        return (
            <div>
                <input
                    ref={inputRef}
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
);
