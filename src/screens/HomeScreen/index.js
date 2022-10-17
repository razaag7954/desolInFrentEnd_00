import {InputField} from "../../components/Input";
import React,{useState} from "react";
import {Button} from "../../components/button";
import {FileUpload} from "../../components/FileUpload";
import axios from "axios";
import {toast} from "react-toastify";
import styles from './style.module.css';
import {AddCar} from "../../api/car";
import {addCarValidationSchema} from "../../utils/auth";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {json} from "react-router-dom";


export const HomePage = () => {
    const [inputValues, setInputValues] = useState({name: '', price: '', phone: '', city: ''});
    const [images, setImages] = useState({images: []})
    const [limit, setLimit] = useState(1);
    const [ url, setUrl ] = useState({imagesPreviewUrls: []});
    const [disable,setDisable] = useState(false);
    const [errorForImages,setErrorForImages] = useState(false);
    let fileObj = [];
    let fileArray = [];
    const options = [
        {label: 1, value: 1},
        {label: 2, value: 2},
        {label: 3, value: 3},
        {label: 4, value: 4},
        {label: 5, value: 5},
        {label: 6, value: 6},
        {label: 7, value: 7},
        {label: 8, value: 8},
        {label: 9, value: 9},
        {label: 10, value: 10},
    ]

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputValues({
            ...inputValues,
            [name] : value
        })
    }
    const uploadImage = (e) => {

        e.preventDefault();
        console.log(url.imagesPreviewUrls.length,)
        if(e.target.files.length > limit || url.imagesPreviewUrls.length >= limit){
            toast.warn("Please Upload Images equal to number of copies you select")
            return;
        }
        if(e.target.files){
            fileObj.push(e.target.files)
            for (let i = 0; i < fileObj[0].length; i++) {
                fileArray.push(URL.createObjectURL(fileObj[0][i]))
            }
            console.log(fileArray)
            setUrl(prev => ({
                imagesPreviewUrls: [...prev.imagesPreviewUrls,fileArray]
            }))
        }


        const data = new FormData()
        data.append("upload_preset", "uploadfile")
        data.append("cloud_name","deefwtqln");
        setDisable(true);
        const image = e.target.files;
        for (let i = 0; i<image.length; i++){
            data.append("file", image[i]);
            axios.post("https://api.cloudinary.com/v1_1/deefwtqln/image/upload", data)
                .then(res => {
                    console.log(res, "this is res")
                    setImages(prev => ({
                        images: [...prev.images ,res.data?.secure_url]
                    }))
                    setDisable(false);
                }).catch(err => {
                setDisable(false)
                console.log(err)
            })
        }
        if(images.images.length){
            setErrorForImages(false)
        }
    }

    const handleAddCar = (values) => {
        console.log(values)
        console.log(images)
        if(!images.images.length > 0){
            setErrorForImages(true);
            return;
        }else {
            setErrorForImages(false)
        }
        values.images = images.images;
        values.phone.toString();
        values.price.toString();
        values.price = String(values['price']);
        values.phone = String(values['phone']);
        let res = values;
        console.log(res, "form values")
        AddCar(res).then(res => {
            console.log(res);
            toast.success("Add Car successfully");
            setInputValues({
                name: '', price: '', phone: '', city: ''
            })
            setImages({
                images: []
            })
            setUrl({
                imagesPreviewUrls: []
            })
        }).catch(err => {
            console.log(err)
        })

    }
    const handleLimit = (e) => {
        setLimit(e.target.value)
    }


    return (
        <div className="container p-5 border mt-5" style={{borderRadius:'6px'}}>
            <Formik
                initialValues={inputValues}
                onSubmit={(values)=>handleAddCar(values)}
                validationSchema={addCarValidationSchema}
            >{()=>(
                <Form>
                    <div>
                        <h4 className="text-center text-dark mt-3">Add Car</h4>
                    </div>
                    <div className={`container mt-5 ${styles.addContainer}`}>
                        <div>
                            <InputField
                                label={'Car Model'}
                                type={'text'}
                                placeholder={'Enter Car Model'}
                                name={"name"}
                            />
                            <InputField
                                label={'Price'}
                                type={'number'}
                                placeholder={'Enter Car Price'}
                                name={"price"}
                            />
                            <InputField
                                label={'Phone'}
                                type={'number'}
                                placeholder={'Enter Your Phone no.'}
                                name={"phone"}
                            />
                            <div className="mt-2"></div>
                            <div className={"row"}>
                                <div className="col">
                                    <span className={styles.mr_8}>City:</span>
                                    <label htmlFor="lahore" className={styles.mr_8}>Lahore:</label>
                                    <Field
                                        name="city"
                                        value="lahore"
                                        className="mr-2 leading-tight"
                                        type="radio"
                                    />
                                    <label htmlFor="karachi" className={styles.mr_8}>karachi:</label>
                                    <Field
                                        name="city"
                                        value="karachi"
                                        className="mr-2 leading-tight"
                                        type="radio"
                                    />
                                </div>
                                <ErrorMessage component="div" style={{ color: "red" }} name={"city"} />
                            </div>
                            <div className="mt-2"></div>

                            <div>
                                <label htmlFor="limit">No. of Copies: </label>
                                <select onChange={handleLimit} id={"limit"}>
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2"></div>
                        </div>

                        <div className="row">
                            { url.imagesPreviewUrls.length > 0 &&
                                url.imagesPreviewUrls.map((imagePreviewUrl , i) => {
                                    return(
                                        <div className={`${styles.showImageContainer} border col-1`}>
                                            <img key={i} alt='previewImg' src={imagePreviewUrl} />
                                        </div>
                                    )

                                })
                            }
                            <div className="col-1">
                                <FileUpload handleFile={uploadImage}/>
                            </div>
                            {
                                errorForImages &&
                                <div style={{color: "red"}}>
                                    images is required
                                </div>
                            }

                        </div>


                        {/*<div className={`${styles.showImageContainer} border`}>*/}

                        {/*<div className={styles.backDropEffect} >*/}
                        {/*    <span>view icon</span>*/}
                        {/*    <span>delete icon</span>*/}
                        {/*</div>*/}

                        {/*</div>*/}
                        <div className="text-center">
                            <Button
                                type={'submit'}
                                variant={'secondary'}
                                disabled={disable}
                            >
                                Add Car
                            </Button>
                            {
                                disable &&
                                <div>
                                    please wait while image is uploading...
                                </div>
                            }

                        </div>
                    </div>
                </Form>
            )}

            </Formik>



        </div>
    )
}