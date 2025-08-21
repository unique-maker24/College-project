import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { registerUserApi } from './api/ApiService'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required('Required!').email('Invalid Email!'),
    password: Yup.string().trim().required('Required!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/,'Password lenght must be between 8 to 15 characters, must have atleast one upper case and lower case letter, must have atleast one digit'),
    confirmedPassword : Yup.string().required('Required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    fullName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters'),
    city: Yup.string().trim().required('Required!'),
    state: Yup.string().trim().required('Required!'),
    country: Yup.string().trim().required('Required!'),
    postalCode: Yup.string().trim().required('Required!'),
    cellNumber: Yup.string().trim().required('Required!'),
});

function Registration() {

    const user1 = {
        
    }

    const [fullName, setFullName] = useState('')
    const [user, setUser] = useState({"email": "",
        "password": "",
        "confirmedPassword" : "",
        "fullName": "",
        "addressLine1": "",
        "addressLine2": "",
        "city": "",
        "state": "",
        "country": "",
        "postalCode": "",
        "phoneNumber": "",
        "cellNumber": ""})


    const navigate = useNavigate()

    function onSubmit(values) {
        console.log(values)

        registerUserApi(values)
            .then(response => {
                console.log('====================================================')
                navigate('/login')
            })
            .catch(error => console.log(error))


    }



    return (
        <div className="Registration">
            <h1>User Registration</h1>

            <Formik initialValues={user}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                //validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>

                           
                    
                            <fieldset className="form-group">
                                <label>User Email:</label><span style={{ color: "red" }}> *</span>
                                <Field type="email" className="form-control" name="email" />
                                {props.errors.email &&
                                    <span className="text-danger">{props.errors.email}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Password:</label><span style={{ color: "red" }}> *</span>
                                <Field type="password" className="form-control" name="password" />
                                {props.errors.password &&
                                    <span className="text-danger">{props.errors.password}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Confirm Password:</label><span style={{ color: "red" }}> *</span>
                                <Field type="password" className="form-control" name="confirmedPassword" />
                                {props.errors.confirmedPassword &&
                                    <span className="text-danger">{props.errors.confirmedPassword}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Full Name:</label><span style={{ color: "red" }}> *</span>
                                <Field type="text" className="form-control" name="fullName" />
                                {props.errors.fullName &&
                                    <span className="text-danger">{props.errors.fullName}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Address Line1:</label>
                                <Field type="text" className="form-control" name="addressLine1" />
                                {props.errors.addressLine1 &&
                                    <span className="text-danger">{props.errors.addressLine1}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Address Line2:</label>
                                <Field type="text" className="form-control" name="addressLine2" />
                                {props.errors.addressLine2 &&
                                    <span className="text-danger">{props.errors.addressLine2}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>City:</label><span style={{ color: "red" }}> *</span>
                                <Field type="text" className="form-control" name="city" />
                                {props.errors.city &&
                                    <span className="text-danger">{props.errors.city}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>State:</label><span style={{ color: "red" }}> *</span>
                                <Field type="text" className="form-control" name="state" />
                                {props.errors.state &&
                                    <span className="text-danger">{props.errors.state}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Country:</label><span style={{ color: "red" }}> *</span>
                                <Field type="text" className="form-control" name="country" />
                                {props.errors.country &&
                                    <span className="text-danger">{props.errors.country}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Postal Code:</label><span style={{ color: "red" }}> *</span>
                                <Field type="text" className="form-control" name="postalCode" />
                                {props.errors.postalCode &&
                                    <span className="text-danger">{props.errors.postalCode}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Phone Number</label>
                                <Field type="number" className="form-control" name="phoneNumber" />
                                {props.errors.phoneNumber &&
                                    <span className="text-danger">{props.errors.phoneNumber}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Cell Number:</label><span style={{ color: "red" }}> *</span>
                                <Field type="number" className="form-control" name="cellNumber" />
                                {props.errors.cellNumber &&
                                    <span className="text-danger">{props.errors.cellNumber}</span>
                                }
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Register</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Registration