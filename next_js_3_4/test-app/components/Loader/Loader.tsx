import styles from "./Loader.module.css"

export default function Loader() {
    return (
        <div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}
