import { useState } from "react";

import styles from "./ButtonGroup.module.css"

function ButtonGroup({ buttons, defaultSelection, clickHandle }) {
  const [clickedId, setClickedId] = useState(defaultSelection);

  const handleClick = (event, id) => {
    setClickedId(id);
    clickHandle(event, id);
  };

  return (
    <>
      {buttons.map(button => (
        <button
          key={button.id}
          name={button.label}
          onClick={(event) => handleClick(event, button.id)}
          className={button.id === clickedId ? `${styles.customButton} ${styles.active}` : `${styles.customButton}`}
        >
          {button.label}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;
