import { useState } from "react";

import styles from "./Button.module.css"

function Button({ color, children, action = () => {} }) {
    const [selected, setSelected] = useState(false);

    function handleSelected() {
        setSelected(!selected);
    }

    function handleClick() 
    {
        handleSelected();
        action();
    }

    return (
        <button
            className={selected ? styles.selected : ""}
            onClick={handleClick}
            style={{
                backgroundColor: color
            }}
        >
            {children}
        </button>
    );
}

export default Button;
