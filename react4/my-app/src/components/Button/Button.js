import { useState, useContext } from "react";

import styles from "./Button.module.css"

import { ThemeContext } from "../../contexts/ThemeContext";

function Button({ color, children, action = () => {} }) {
    const theme = useContext(ThemeContext);
    const [selected, setSelected] = useState(false);

    function handleSelected() {
        setSelected(!selected);
    }

    function handleClick() {
        handleSelected();
        action();
    }

    let classNames = [theme === "light" ? styles.buttonLight : styles.buttonDark];
    if (selected) {
        classNames.push(selected ? styles.selected : "");
    }

    return (
        <button
            className={classNames.join(" ")}
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
