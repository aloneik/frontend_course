import { useState, useContext } from "react";

import styles from "./ButtonGroup.module.css"

import { ThemeContext } from "../../contexts/ThemeContext";

function ButtonGroup({ buttons, defaultSelection, clickHandle }) {
  const theme = useContext(ThemeContext);
  const [clickedId, setClickedId] = useState(defaultSelection);

  const handleClick = (event, id) => {
    setClickedId(id);
    clickHandle(event, id);
  };

  let classNames = [
    styles.customButton,
    theme === "light" ? styles.customButtonLight : styles.customButtonDark
  ];

  return (
    <>
      {buttons.map(button => (
        <button
          key={button.id}
          name={button.label}
          onClick={(event) => handleClick(event, button.id)}
          className={[...classNames, button.id === clickedId ? styles.active : ""].join(" ")}
        >
          {button.label}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;
