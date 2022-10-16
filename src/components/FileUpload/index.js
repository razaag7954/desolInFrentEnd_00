import React from "react";
import styles from './style.module.css';


export const FileUpload = ({handleFile}) => {

    return (
        <label htmlFor={'uploadImage'} className={`${styles.uploadImageContainer} border`}>
               <span className={styles.text}><span className={styles.addIcon}>+</span> Add Pictures</span>
            <input
                id={'uploadImage'}
                type="file"
                onChange={handleFile}
                style={{display: 'none'}}
                multiple
                accept=".jpeg, .pdf, .png, .jpg"
            />

        </label>
    )
}