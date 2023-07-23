import { useState, forwardRef, useContext } from "react";

import styles from "./Input.module.css";

import { Theme, ThemeContext } from "../../contexts/ThemeContext";
import { useTasksDispatch } from "../../contexts/TodoItemsContext";


export default forwardRef(
    function Input (_, inputRef: React.ForwardedRef<HTMLInputElement>) {
        const theme = useContext<Theme>(ThemeContext);
        const wrappedDispatch = useTasksDispatch();
        const [itemDescription, setDescription] = useState<string>('');

        function handleSubmit(_: React.MouseEvent<HTMLButtonElement>) {
            wrappedDispatch?.add(itemDescription);
            if (wrappedDispatch === null) {
                console.log("Unable to add an element. Dispacth object is null.")
            }
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
