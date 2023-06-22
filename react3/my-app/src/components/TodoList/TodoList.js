import { memo } from 'react';

import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.css'

export default memo(
    function TodoList({ itemsList, toggleCompleted, deleteItem }) {
        const todoItems = itemsList.map(todoItem =>
            <TodoListItem
                description={todoItem.title}
                completed={todoItem.completed}
                id={todoItem.id}
                key={todoItem.id}
                toggleCompleted={toggleCompleted}
                deleteItem={deleteItem} />
        );

        return (
            <ul className={styles.todoList}>
                {todoItems}
            </ul>
        );
    }
);
