import { useState } from "react";

import styles from "./Button.module.css"

function Button({ text, color, action = () => {} }) {
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
            {text}
        </button>
    );
}

export default Button;
