import React from "react";
import styles from './style.module.css';
import {ErrorMessage, Field} from "formik";

export const InputField = ({rows, as, disabled, value, label, name, placeholder, type, onChange, classes, icon, handleIconClick, autoComplete }) => (
   <>
       <div className="form-group position-relative">
           {label && <label htmlFor="input-field">{label}</label>}
           <Field
               className={"form-control" } name={ name } placeholder={ placeholder }
               type={ type } as={ as && as }  rows={ rows } disabled={disabled ? true : false}
           />
           {/*<input*/}
           {/*    type={type}*/}
           {/*    value={value}*/}
           {/*    name={name}*/}
           {/*    className={`${type == 'radio' ? '' : 'form-control'} ${classes ?  classes : ''}`}*/}
           {/*    placeholder={placeholder}*/}
           {/*    onChange={onChange}*/}
           {/*    checked={type === 'radio' && true}*/}
           {/*    autoComplete={autoComplete ? autoComplete : "false"}*/}
           {/*/>*/}
           {icon && <span onClick={handleIconClick && handleIconClick} className={styles.icon}>
               {
                   icon
               }
                    </span>}
       </div>
       <ErrorMessage component="div" style={{ color: "red" }} name={name} />
   </>

);
