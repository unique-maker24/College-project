import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { getUserApi, updateUserApi } from "../api/ApiService"

const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required('Required!').email('Invalid Email!'),

    fullName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters').matches(/^[a-zA-Z0-9_\s]*[a-zA-Z_]+[a-zA-Z0-9_]*$/, "Invalid Value!"),
    city: Yup.string().trim().required('Required!'),
    state: Yup.string().trim().required('Required!'),
    country: Yup.string().trim().required('Required!'),
    postalCode: Yup.string().trim().required('Required!'),
    cellNumber: Yup.string().trim().required('Required!').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Value!"),
    phoneNumber: Yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Value!"),
});

export default function User() {

    const { id } = useParams()

    const [userObj, setUserObj] = useState({})

    const navigate = useNavigate()


    useEffect(() => {

        retrieveUsers();
    },
        [id]

    )
    function retrieveUsers() {
        if (id !== -1) {
            getUserApi(id)
                .then(response => {
                    setUserObj(response.data)
                })
                .catch(error => console.log(error))
        }
    };

    function onSubmit(values) {
        console.log(values)
        values.id = id


        console.log(values)


        updateUserApi(id, values)
            .then(response => {
                navigate('/Admin/users')
            })
            .catch(error => console.log(error))

    }


    return (
        <div className="container">
            <h1>User </h1>
            <div>
                <Formik initialValues={userObj}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
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
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>

        </div>
    )
}