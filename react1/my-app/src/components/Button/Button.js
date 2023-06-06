function Button({ text, color, action }) {
    return (
        <button
            onClick={action}
            style={{
                backgroundColor: color
            }}
        >
            {text}
        </button>
    );
}

export default Button;
