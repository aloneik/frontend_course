import { memo, useContext } from 'react';

import styles from './TodoList.module.css';

import TodoListItem from '../TodoListItem/TodoListItem';
import Loader from '../Loader/Loader';

import { ThemeContext } from '../../contexts/ThemeContext';
import { useLoadingState } from '../../contexts/TodoItemsContext';
import { useFilteredTasks } from '../../contexts/TodosFilterContext';

export default memo(
    function TodoList() {
        const theme = useContext(ThemeContext);
        const todoItems = useFilteredTasks();
        const {isLoaded, error} = useLoadingState();

        if (error) {
            return <div>Error: {error.message}</div>
        }
        else {
            return <>
                { !isLoaded
                    ? <Loader />
                    : <ul className={[styles.todoList, theme === "light" ? styles.todoListLight : styles.todoListDark].join(" ")}>
                        { todoItems.map(todoItem =>
                            <TodoListItem
                                description={todoItem.title}
                                completed={todoItem.completed}
                                id={todoItem.id}
                                key={todoItem.id}
                            />)
                        }
                      </ul>
                }
                </>
        }
    }
);
