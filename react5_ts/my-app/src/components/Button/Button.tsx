import { useState, useContext } from "react";

import styles from "./Button.module.css"

import classNames from 'classnames/bind';

import { Theme, ThemeContext } from "../../contexts/ThemeContext";

type ButtonProps = {
    children?: React.ReactNode,
    color: any,
    action(): void
};

const classes = {
    btnLight: styles.buttonLight,
    btnDark: styles.buttonDark,
    selected: styles.selected
};

const cx = classNames.bind(classes);

function Button({ color, children, action = () => {} }: ButtonProps) {
    const theme = useContext(ThemeContext);
    const [selected, setSelected] = useState(false);

    function handleSelected() {
        setSelected(!selected);
    }

    function handleClick() {
        handleSelected();
        action();
    }

    const className = cx({
        btnLight: theme === Theme.Light,
        btnDark: theme === Theme.Dark,
        selected: selected
    });

    return (
        <button
            className={className}
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
