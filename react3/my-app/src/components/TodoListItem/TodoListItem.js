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
            <Button color={"green"} action={switchCompletedState}>
                Complete
            </Button>
            <Button color={"red"} action={handleDelete}>
                Delete
            </Button>
        </li>
    );
}

export default TodoListItem;