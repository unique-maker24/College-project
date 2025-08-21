import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { createCompanyApi, retrieveCompanyApi, updateCompanyApi } from "../api/CompanyApiService"

const validationSchema = Yup.object().shape({
    //companyCode: Yup.string().trim().required('Required!').min(2, 'Must be more than 2 characters')
     //   .matches(/^[a-zA-Z]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/, "Invalid Value! Special Charactes, spaces and numbers are not allowed.").max(55, 'Company code cannot be more than 55 characters'),

    companyName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters').matches(/^[a-zA-Z0-9_\s]*[a-zA-Z_]+[a-zA-Z0-9_]*$/, "Invalid Value!").max(1500, 'Company Name cannot be more than 1500 characters'),
});

export default function Company() {

    const { id } = useParams()

    const [companyName, setCompanyName] = useState('')
    const [companyCode, setCompanyCode] = useState('')


    const navigate = useNavigate()


    useEffect(() => {

        retrieveCompanies();
    },
        [id]

    )
    function retrieveCompanies() {
        if (id !== -1) {
            retrieveCompanyApi(id)
                .then(response => {
                    console.log(response)
                    setCompanyName(response.data.companyName)
                    //setCompanyCode(response.data.companyCode)
                })
                .catch(error => console.log(error))
        }
    };

    function onSubmit(values) {
        console.log(values)

        values.id = id;

        console.log(values)

        if (id === -1) {
            createCompanyApi(values)
                .then(response => {
                    console.log('====================================================')
                    navigate('/Admin/companies')
                })
                .catch(error => console.log(error))

        } else {
            updateCompanyApi(id, values)
                .then(response => {
                    navigate('/Admin/companies')
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="container">
            <h1>Add Company </h1>
            <div>
                <Formik initialValues={{ companyName }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>


                                {/*<fieldset className="form-group">
                                    <label>Company Code</label>
                                    <Field type="text" className="form-control" name="companyCode" />
                                    {props.errors.companyCode &&
                                        <span className="text-danger">{props.errors.companyCode}</span>
                                    }
                                </fieldset>*/}

                                <fieldset className="form-group">
                                    <label>Company Name</label>
                                    <Field type="text" className="form-control" name="companyName" />
                                    {props.errors.companyName &&
                                        <span className="text-danger">{props.errors.companyName}</span>
                                    }
                                </fieldset>
                                
                                <div>
                                    <button className="btn btn-success m-5" type="submit" >Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>

        </div>
    )
}