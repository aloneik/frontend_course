import { useContext, useState } from 'react';

import Button from '../Button/Button';
import styles from './TodoListItem.module.css'

import { ThemeContext } from '../../contexts/ThemeContext';
import { useTasksDispatch } from '../../contexts/TodoItemsContext';

function TodoListItem({ description, completed, id }) {
    const theme = useContext(ThemeContext);
    const dispatch = useTasksDispatch();
    const [completedState, setCompletedState] = useState(completed);

    function switchCompletedState() {
        setCompletedState(!completedState);
        dispatch.change(id);
    }

    function handleDelete() {
        dispatch.delete(id);
    }

    let classNames = [
        theme === "light" ? styles.todoListItemLight : styles.todoListItemDark,
    ];
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