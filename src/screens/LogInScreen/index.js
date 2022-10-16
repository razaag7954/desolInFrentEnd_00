import React, {useState}from "react";
import styles from './style.module.css';
import {LogIn} from "../../api/login";
import { useNavigate } from "react-router-dom";
import {Button} from "../../components/button";
import {InputField} from "../../components/Input";
import {toast} from "react-toastify";
import axios from "axios";
export const LogInPage = () => {
    const[inputValues, setInputValues] = useState({email: '', password: ''});


    const [typeOfPassword, setTypeOfPassword] = useState(true);
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputValues({
            ...inputValues,
            [name] : value
        })
        console.log(inputValues)
    }
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = inputValues;
        const data = {
           email,
            password
        }
        // axios.post("https://demoapp7954.herokuapp.com/signin", data).then(res => {
        //     console.log(res.data.token, "result")
        //     localStorage.setItem('token', res.data.token);
        //     navigate("/")
        //     toast.success('successfully login')
        // }).catch(err => {
        //     console.log(err, "this is error")
        // })
        LogIn(data).then(res => {
            localStorage.setItem('token', res.data.token);
            navigate("/")
            toast.success('successfully login')
        }).catch(err => {
            console.log(err, "this is error")
        })

        // localStorage.setItem('token', "thisistokenfromserverresponse");
        // navigate("/")
        // console.log(data, "form data");

    }
    const toggleTypeOfPassword = () => {
        setTypeOfPassword(current => !current);
    }
    return(
        <>
            <div className={styles.authFormContainer}>
                <form className={styles.authForm} onSubmit={handleSubmit} autoComplete={"off"}>
                    <div className={styles.authFormContent}>
                        <h3 className={styles.authFormTitle}>Sign In</h3>
                        <div className="mt-3">
                            <InputField
                                label={'Email address'}
                                type={'text'}
                                placeholder={'Enter email'}
                                value={inputValues.email}
                                name={"email"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <InputField
                                label={'password'}
                                type={typeOfPassword === true ? 'password' : 'text'}
                                placeholder={'Enter Password'}
                                value={inputValues.password}
                                name={"password"}
                                onChange={handleChange}
                                icon={"icon"}
                                handleIconClick={() => toggleTypeOfPassword()}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <Button type={'submit'} variant={'primary'}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}