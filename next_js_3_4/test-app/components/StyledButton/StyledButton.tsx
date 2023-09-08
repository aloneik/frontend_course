import { styled } from "styled-components";

type ButtonType = "text" | "contained" | "outlined";
type ButtonColor = "success" | "error" | "secondary";

const BASE_COLOR = "#1976D2";
const GRAY_COLOR = "gray";
const HOVER_COLOR = "#1565c0";

function getBaseColor(props: any) {
    return props.$disabled ? GRAY_COLOR : BASE_COLOR;
}

function getColor(props: any) {
    if (props.$color === "secondary") {
        return "#9C27B0";
    }
    else if (props.$color === "error") {
        return "#D32F2F";
    }

    return props.$variant === "contained" ? "white" : getBaseColor(props);
}

function getBackgroundColor(props: any) {
    if (props.$variant === "contained") {
        return getBaseColor(props);
    }

    if (props.$color === "success") {
        return "#2E7D32";
    }

    return "white";
}

function getBorderColor(props: any) {
    return props.$variant === "outlined" ? `1px solid ${getBaseColor(props)}` : 0;
}

function getHoverColor(props: any) {
    if (props.$disabled) {
        return (props.$variant === "text" || props.$variant === "outlined") ? "white" : GRAY_COLOR;
    }

    if (props.$variant !== "contained") {
        return "rgba(25, 118, 210, 0.04)";
    }

    return HOVER_COLOR;
}

function getHoverBoxShadow(props: any) {
    if (props.$disabled || props.$variant !== "contained") {
        return "";
    }

    return "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)";
}

export const StyledButton = styled.button<{ $variant: ButtonType; $color?: ButtonColor; $disabled?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${getBackgroundColor};
    color: ${getColor};
    outline: 0;
    border: ${getBorderColor};
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    text-decoration: none;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 8px;
    border-radius: 4px;

    &&:hover {
        background-color: ${getHoverColor};
        box-shadow: ${getHoverBoxShadow};
    }
`;
