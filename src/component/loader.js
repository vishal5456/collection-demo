import React from 'react';
import styles from "../style/loader.module.scss";

export default function Index(props) {
    return (
        <div className={`${styles.container} ${props.parent == "botStore" ? "botStoreLoader" : null}`}>
            <div className={`${styles.loader} ${styles.loader3}`}></div>
        </div>
    )
}