import React, {useState}from "react";
import styles from './style.module.css';
import {LogIn} from "../../api/login";
import { useNavigate } from "react-router-dom";
import {Button} from "../../components/button";
import {InputField} from "../../components/Input";
import {toast} from "react-toastify";
import axios from "axios";
import {Form, Formik} from "formik";
import {signupValidationSchema} from "../../utils/auth";
import eye from "../../assets/images/icons8-eye-24.png"
export const LogInPage = () => {

    const [typeOfPassword, setTypeOfPassword] = useState(true);

    let navigate = useNavigate();
    const handleSubmit = (values) => {
        LogIn(values).then(res => {
            localStorage.setItem('token', res.data.token);
            toast.success('successfully login')
            navigate("/")

        }).catch(err => {
            console.log(err, "this is error")
        })


    }
    const toggleTypeOfPassword = () => {
        setTypeOfPassword(current => !current);
    }
    const formInitialSchema = {
        email: "",
        password: "",
    };
    return(
        <>
            <Formik
                initialValues={formInitialSchema}
                onSubmit={(values)=>handleSubmit(values)}
                validationSchema={signupValidationSchema}
            >
                <Form>
            <div className={styles.authFormContainer}>

                    <div className={styles.authFormContent}>
                        <h3 className={styles.authFormTitle}>Sign In</h3>
                        <div className="mt-3">
                            <InputField
                                label={'Email address'}
                                type={'text'}
                                placeholder={'Enter email'}
                                name={"email"}
                            />
                        </div>
                        <div className="mt-3">
                            <InputField
                                label={'password'}
                                type={typeOfPassword === true ? 'password' : 'text'}
                                placeholder={'Enter Password'}
                                name={"password"}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/></svg>
                                }
                                handleIconClick={() => toggleTypeOfPassword()}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <Button type={'submit'} variant={'primary'}>
                                Submit
                            </Button>
                        </div>
                    </div>

            </div>
                </Form>
                </Formik>
        </>
    )
}