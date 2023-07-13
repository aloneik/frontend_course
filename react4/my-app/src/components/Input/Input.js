import { useState, forwardRef, useContext } from "react";

import styles from "./Input.module.css";

import { ThemeContext } from "../../contexts/ThemeContext";
import { useTasksDispatch } from "../../contexts/TodoItemsContext";

export default forwardRef(
    function Input (_, inputRef) {
        const theme = useContext(ThemeContext);
        const wrappedDispatch = useTasksDispatch();
        const [itemDescription, setDescription] = useState('');

        function handleSubmit(e) {
            wrappedDispatch.add(itemDescription);
            setDescription("");
        }

        return (
            <div>
                <input
                    ref={inputRef}
                    className={styles.input + " " + theme}
                    type="text"
                    id="listItemInput"
                    placeholder="Enter task description..."
                    value={itemDescription}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className={styles.addBtn}
                    style={{color: "black"}}
                >
                    Add
                </button>
            </div>
        );
    }
);
