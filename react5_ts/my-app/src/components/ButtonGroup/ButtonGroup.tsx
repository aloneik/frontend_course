import { useState, useContext } from "react";

import classNames from 'classnames/bind';

import styles from "./ButtonGroup.module.css"

import { Theme, ThemeContext } from "../../contexts/ThemeContext";

type Button = {
  id: number,
  label: string
};

type ButtonGroupProps = {
  buttons: Button[],
  defaultSelection: number,
  clickHandle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void
};

const classes = {
  main: styles.customButton,
  btnLight: styles.customButtonLight,
  btnDark: styles.customButtonDark,
  selected: styles.active
};
const cx = classNames.bind(classes);

function ButtonGroup({ buttons, defaultSelection, clickHandle }: ButtonGroupProps) {
  const theme = useContext<Theme>(ThemeContext);
  const [clickedId, setClickedId] = useState<number>(defaultSelection);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    setClickedId(id);
    clickHandle(event, id);
  };

  const lightTheme = theme === Theme.Light;

  return (
    <>
      {buttons.map(button => (
        <button
          key={button.id}
          name={button.label}
          onClick={(event) => handleClick(event, button.id)}
          className={
            cx({
              main: true,
              btnLight: lightTheme,
              btnDark: !lightTheme,
              selected: button.id === clickedId
            })
          }
        >
          {button.label}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;
