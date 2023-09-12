import { styled } from "styled-components";

type ButtonType = "text" | "contained" | "outlined";
type ButtonColor = "success" | "error" | "secondary";

const BASE_COLOR = "#1976D2";
const GRAY_COLOR = "#808080";

const SECONDARY_COLOR = "#9C27B0";
const ERROR_COLOR = "#D32F2F";
const SUCCESS_COLOR = "#2E7D32";

const HOVER_SECONDARY_COLOR = "#7B1FA2";
const HOVER_ERROR_COLOR = "#C62828";
const HOVER_SUCCESS_COLOR = "#1B5E20";
const HOVER_BASE_COLOR = "#1565C0";

function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function getBaseColor(props: any) {
    if (props.$color === "secondary") {
        return SECONDARY_COLOR;
    }
    if (props.$color === "error") {
        return ERROR_COLOR;
    }
    if (props.$color === "success") {
        return SUCCESS_COLOR;
    }

    return BASE_COLOR;
}

function getHoverBaseColor(props: any) {
    if (props.$color === "secondary") {
        return HOVER_SECONDARY_COLOR;
    }
    if (props.$color === "error") {
        return HOVER_ERROR_COLOR;
    }
    if (props.$color === "success") {
        return HOVER_SUCCESS_COLOR;
    }

    return HOVER_BASE_COLOR;
}

function getColor(props: any) {
    if (props.$disabled){
        return GRAY_COLOR;
    }

    return props.$variant === "contained" ? "white" : getBaseColor(props);
}

function getBackgroundColor(props: any) {
    
    if (props.$variant === "contained") {
        if (props.$disabled) {
            return  hexToRGB(getColor(props), 0.5);;
        }
        return getBaseColor(props);
    }

    return "white";
}

function getBorderColor(props: any) {
    const color = hexToRGB(getColor(props), 0.5);
    return props.$variant === "outlined" ? `1px solid ${color}` : 0;
}

function getHoverBorderColor(props: any) {
    if (props.$disabled) {
        return  "";
    }
    return props.$variant === "outlined" ? `1px solid ${getColor(props)}` : 0;
}
function getHoverBackgroundColor(props: any) {
    if (props.$disabled) {
        return  "";
    }

    if (props.$variant !== "contained") {
        return hexToRGB(getBaseColor(props), 0.1); // "rgba(25, 118, 210, 0.04)";
    }

    return getHoverBaseColor(props);
}

function getHoverBoxShadow(props: any) {
    if (props.$disabled) {
        return  "";
    }
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
        background-color: ${getHoverBackgroundColor};
        box-shadow: ${getHoverBoxShadow};
        border: ${getHoverBorderColor};
    }
`;
