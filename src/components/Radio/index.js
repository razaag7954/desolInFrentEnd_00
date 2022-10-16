import styles from "../Input/style.module.css";
import React from "react";

const RadioField = ({ value, label, name, placeholder, type, onChange, classes, }) => (
    <div className="form-group position-relative">
        {label && <label htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            className={`form-control ${classes && classes}`}
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);