import { useContext, useState } from 'react';

import classNames from 'classnames/bind';

import Button from '../Button/Button';
import styles from './TodoListItem.module.css'

import { Theme, ThemeContext } from '../../contexts/ThemeContext';
import { useTasksDispatch } from '../../contexts/TodoItemsContext';

type TodoListItemProps = {
    description: string,
    completed: boolean,
    id: string
};

const classes = {
    light: styles.todoListItemLight,
    dark: styles.todoListItemDark,
    completed: styles.completed
};
const cx = classNames.bind(classes);

function TodoListItem({ description, completed, id }: TodoListItemProps) {
    const theme = useContext<Theme>(ThemeContext);
    const wrappedDispatch = useTasksDispatch();
    const [completedState, setCompletedState] = useState(completed);

    function switchCompletedState() {
        setCompletedState(!completedState);
        wrappedDispatch?.change(id);
    }

    function handleDelete() {
        wrappedDispatch?.delete(id);
    }

    const lightTheme = theme === Theme.Light;

    return (
        <li className={
            cx({
                light: lightTheme,
                dark: !lightTheme,
                completed: completedState
            })
        }>
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