import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { createCategoryApi, retrieveCategoryApi, updateCategoryApi } from "../api/ProductCategoryApiService"

const validationSchema = Yup.object().shape({
    categoryCode: Yup.string().trim().required('Required!').min(2, 'Must be more than 2 characters')
    .matches(/^[a-zA-Z]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/, "Invalid Value! Special Charactes, spaces and numbers are not allowed.").max(55, 'Company code cannot be more than 55 characters'),
  
    categoryName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters').matches(/^[a-zA-Z0-9_\s]*[a-zA-Z_]+[a-zA-Z0-9_]*$/,"Invalid Value!").max(1500, 'Company Name cannot be more than 1500 characters'),
});

export default function ProdcutCategory() {
    
    const {id} = useParams()
    
    const[categoryName, setCategoryName] = useState('')
    const[categoryCode, setCategoryCode] = useState('')
   
    const navigate = useNavigate()
    
    
    useEffect(() => {
      
        retrieveCategories();
        },
        [id]

    )
    function retrieveCategories(){
        if(id !== -1) {
            retrieveCategoryApi(id)
            .then(response => {
                setCategoryName(response.data.categoryName)
                setCategoryCode(response.data.categoryCode)
            })
            .catch(error => console.log(error))
        }
    };

    function onSubmit(values) {
        console.log(values)
        
        values.id=id;

        console.log(values)

        if(id===-1) {
            createCategoryApi(values)
            .then(response => {
                console.log('====================================================')
                navigate('/Admin/categories')
            })
            .catch(error => console.log(error))
    
        } else {
            updateCategoryApi(id, values)
            .then(response => {
                navigate('/Admin/categories')
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className="container">
            <h1>Add Product Category </h1>
            <div>
                <Formik initialValues={ { categoryCode, categoryName } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validationSchema = {validationSchema}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            
                          <fieldset className="form-group">
                                <label>Category Code</label>
                                <Field type="text" className="form-control" name="categoryCode" />
                                {props.errors.categoryCode &&
                                    <span className="text-danger">{props.errors.categoryCode}</span>
                                }
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Category</label>
                                <Field type="text" className="form-control" name="categoryName" />
                                {props.errors.categoryName &&
                                    <span className="text-danger">{props.errors.categoryName}</span>
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