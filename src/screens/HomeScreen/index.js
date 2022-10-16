import {InputField} from "../../components/Input";
import React,{useState} from "react";
import {Button} from "../../components/button";
import {FileUpload} from "../../components/FileUpload";
import axios from "axios";
import {toast} from "react-toastify";
import styles from './style.module.css';
import {AddCar} from "../../api/car";


export const HomePage = () => {
    const [inputValues, setInputValues] = useState({name: '', price: '', phone: '', city: '', images: []});
    const {name, price, phone, city, images} = inputValues;
    const [limit, setLimit] = useState(1);
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState({imagesPreviewUrls: []});
    const [disable,setDisable] = useState(false);
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
        if(e.target.files.length > limit){
            toast.warn("Please Upload Images equal to number of copies you select")
            return;
        }
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setUrl((prev)=>{
            return(
                {
                    ...url,
                    imagesPreviewUrls: [...prev.imagesPreviewUrls,fileArray]
                }
            )
        })


        const images = [];
        const image = e.target.files;
        const data = new FormData()
        data.append("upload_preset", "uploadfile")
        data.append("cloud_name","deefwtqln");
        setDisable(true)
        for (let i = 0; i<image.length; i++){
            data.append("file", image[i]);
            axios.post("https://api.cloudinary.com/v1_1/deefwtqln/image/upload", data)
                .then(res => {
                    // setUrl(res.data.secure_url);
                    setDisable(false)
                    setInputValues((prev)=>{
                        return (
                            {
                                ...inputValues,
                                images: [...prev.images ,res.data.secure_url]
                            }
                        )

                    })
                }).catch(err => {
                    setDisable(false)
                console.log(err)
            })
        }
    }

    const handleAddCar = (e) => {
        e.preventDefault();
        console.log(inputValues, "form values")
        AddCar(inputValues).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleLimit = (e) => {
        setLimit(e.target.value)
    }

    return (
        <>
            <div className={`container mt-5 ${styles.addContainer}`}>
                <form action="">
                    <div>
                        <InputField
                            label={'Car Model'}
                            type={'text'}
                            placeholder={'Enter Car Model'}
                            value={name}
                            name={"name"}
                            onChange={handleChange}
                        />
                        <InputField
                            label={'Price'}
                            type={'number'}
                            placeholder={'Enter Car Price'}
                            value={price}
                            name={"price"}
                            onChange={handleChange}
                        />
                        <InputField
                            label={'Phone'}
                            type={'number'}
                            placeholder={'Enter Your Phone no.'}
                            value={phone}
                            name={"phone"}
                            onChange={handleChange}
                        />
                        <div className={"row"}>
                            <div className="col">
                                <label htmlFor="city" className={styles.mr_8}>City:</label>
                                <label htmlFor="lahore" className={styles.mr_8}>Lahore:</label>
                                <input className={styles.mr_8} type="radio" name={"city"} value={"lahore"} onChange={handleChange}/>
                                <label htmlFor="karachi" className={styles.mr_8}>karachi:</label>
                                <input type="radio" name={"city"} value={"karachi"} onChange={handleChange}/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="limit">No. of Copies: </label>
                            <select onChange={handleLimit} id={"limit"}>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        { url.imagesPreviewUrls &&
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

                    </div>


                    {/*<div className={`${styles.showImageContainer} border`}>*/}

                    {/*<div className={styles.backDropEffect} >*/}
                    {/*    <span>view icon</span>*/}
                    {/*    <span>delete icon</span>*/}
                    {/*</div>*/}

                    {/*</div>*/}
                    <div>
                        <Button
                            type={'submit'}
                            variant={'secondary'}
                            handleClick={handleAddCar}
                            disabled={disable}
                        >
                            Add Car
                        </Button>
                    </div>

                </form>
            </div>

        </>
    )
}