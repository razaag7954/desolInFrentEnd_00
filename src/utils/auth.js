import * as yup from 'yup'

export const signupValidationSchema = yup.object( {
    email: yup.string().email( 'Email must be valid' ).required( 'Email is required' ),
    password: yup.string().min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
} );
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const addCarValidationSchema = yup.object( {
    name: yup.string().min(3, "name must be 3 characters at minimum").required( 'Name is required' ),
    price: yup.string().required("Price is required"),
    phone: yup.string().min(10, "Phone at least 11 character long").matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    city: yup.string().required("City is required")
} );
