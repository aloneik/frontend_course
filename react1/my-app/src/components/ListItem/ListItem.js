import { useState } from 'react';

import Button from '../Button/Button';

function ListItem({ description, completed, id, toggleCompleted, deleteItem }) {
    const [completedState, setCompletedState] = useState(completed);

    function switchCompletedState() {
        setCompletedState(!completedState);
        toggleCompleted(id);
    }

    function handleDelete() {
        deleteItem(id);
    }

    return (
        <li className={completedState ? "completed" : ""}>
            {description}
            <Button text="Complete" color={"green"} action={switchCompletedState} />
            <Button text="Delete" color={"red"} action={handleDelete} />
        </li>
    );
}

export default ListItem;