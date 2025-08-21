import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { retrieveAllCompaniesApi } from '../api/CompanyApiService'
import { createProductApi, retrieveProductApi, updateProductApi } from '../api/ProductApiService'
import { retrieveAllCategoriesApi } from '../api/ProductCategoryApiService'

const validationSchema = Yup.object().shape({
    company: Yup.string().trim().required('Required!'),
    productName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters').matches(/^[a-zA-Z0-9_\s]*[a-zA-Z_]+[a-zA-Z0-9_]*$/, "Invalid Value!"),
    productCategory: Yup.string().trim().required('Required!'),
    productCode: Yup.string().trim().required('Required!').min(2, 'Must be more than 2 characters')
        .matches(/^[a-zA-Z]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/, "Invalid Value! Special Charactes, spaces and numbers are not allowed.").max(55, 'Product code cannot be more than 55 characters'),
});

export default function Product() {

    const { id } = useParams()

    const [productObj, setProductObj] = useState({})
    const [allCompanies, setAllCompanies] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        retrieveAllCompanies();
        retrieveProductCategories();
        retrieveProdcut();
    },
        [id]

    )

    function retrieveProductCategories() {
        console.log(` retrieveProductCategories `)
        retrieveAllCategoriesApi().then((res) => {
            console.log(res.data)
            setAllCategories(res.data)
        });

    }

    function retrieveAllCompanies() {
        console.log(` retrieveAllCompanies `)
        retrieveAllCompaniesApi().then((res) => {
            console.log(res.data)
            setAllCompanies(res.data)
        });

    }

    function retrieveProdcut() {

        if (id !== '-1') {
            console.log(`retrieveProdcut `)
            retrieveProductApi(id)
                .then(response => {
                    console.log(response.data)
                    let tempObj = response.data;
                    tempObj.company = response.data.company && response.data.company.id
                    tempObj.productCategory = response.data.productCategory && response.data.productCategory.id
                    setProductObj(tempObj)
                })
                .catch(error => console.log(error))
        }
    };

    function onSubmit(values) {

        values.id = id
        values.company = {
            "id": values.company
        }
        values.productCategory = {
            "id": values.productCategory
        }


        console.log(values)
        if (id === '-1') {
            createProductApi(values).then(res => {
                navigate('/Admin/products')
            })
            .catch(error => console.log(error))
        } else {
            updateProductApi(id, values)
                .then(response => {
                    navigate('/Admin/products')
                })
                .catch(error => console.log(error))
        }

    }


    return (
        <div className="container">
            <h1> Add Product </h1>
            <div>
                <Formik initialValues={productObj}
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
                                    <label>Company:</label><span style={{ color: "red" }}> *</span>
                                    <Field as="select" className="form-control" name="company" >
                                        <option value="" >Select</option>
                                        {
                                            allCompanies.map((company, i) => <option key={i} value={company.id}> {company.companyName}</option>)
                                        }
                                    </Field>
                                    {props.errors.company &&
                                        <span className="text-danger">{props.errors.company}</span>
                                    }

                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Product Category:</label><span style={{ color: "red" }}> *</span>
                                    <Field as="select" className="form-control" name="productCategory" >
                                        <option value="" >Select</option>
                                        {
                                            allCategories.map((category, i) => <option key={i} value={category.id}> {category.categoryName}</option>)
                                        }
                                    </Field>
                                    {props.errors.productCategory &&
                                        <span className="text-danger">{props.errors.productCategory}</span>
                                    }
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Product Name:</label><span style={{ color: "red" }}> *</span>
                                    <Field type="text" className="form-control" name="productName" />
                                    {props.errors.productName &&
                                        <span className="text-danger">{props.errors.productName}</span>
                                    }
                                </fieldset>
                                
                                <fieldset className="form-group">
                                    <label>Product Code:</label><span style={{ color: "red" }}> *</span>
                                    <Field type="text" className="form-control" name="productCode" />
                                    {props.errors.productCode &&
                                        <span className="text-danger">{props.errors.productCode}</span>
                                    }
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Product Description:</label>
                                    <Field type="text" className="form-control" name="productDesc" as="textarea" />
                                    {props.errors.productDesc &&
                                        <span className="text-danger">{props.errors.productDesc}</span>
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