import { useState } from 'react';

import Button from '../Button/Button';
import styles from './TodoListItem.module.css'

function TodoListItem({ description, completed, id, toggleCompleted, deleteItem }) {
    const [completedState, setCompletedState] = useState(completed);

    function switchCompletedState() {
        setCompletedState(!completedState);
        toggleCompleted(id);
    }

    function handleDelete() {
        deleteItem(id);
    }

    let classNames = [styles.todoListItem];
    if (completedState) {
        classNames.push(styles.completed);
    }

    return (
        <li className={classNames.join(" ")}>
            {description}
            <Button text="Complete" color={"green"} action={switchCompletedState} />
            <Button text="Delete" color={"red"} action={handleDelete} />
        </li>
    );
}

export default TodoListItem;