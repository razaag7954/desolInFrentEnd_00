import React from "react";
import styles from './style.module.css';

export const InputField = ({checked, value, label, name, placeholder, type, onChange, classes, icon, handleIconClick, autoComplete }) => (
    <div className="form-group position-relative">
        {label && <label htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            className={`${type == 'radio' ? '' : 'form-control'} ${classes ?  classes : ''}`}
            placeholder={placeholder}
            onChange={onChange}
            checked={type === 'radio' && true}
            autoComplete={autoComplete ? autoComplete : "false"}
        />
        {icon && <span onClick={handleIconClick && handleIconClick} className={styles.icon}>{icon}</span>}
    </div>
);
