import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllCategoriesApi, deleteCategoryApi } from "../api/ProductCategoryApiService"


function ListProductCategories() {

    const navigate = useNavigate()
    
    const [categories,setCategories] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshProductCategories(), [])

    function refreshProductCategories() {
        
        retrieveAllCategoriesApi()
        .then(response => {
            setCategories(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteCategory(id) {
        console.log('clicked ' + id)
        deleteCategoryApi(id)
        .then(

            () => {
                setMessage(`Delete of company with id = ${id} successful`)
                refreshProductCategories()
            }
            //1: Display message
            //2: Update Categories list
        )
        .catch(error => console.log(error))
    }

    function updateCategory(id) {
        console.log('clicked ' + id)
        navigate(`/Admin/category/${id}`)
    }

    function addCategory() {
        navigate(`/Admin/category/-1`)
    }

    return (
        <div className="container">
            <h1>Product Categories</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Category</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        categories.map(
                            category => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.categoryCode}</td>
                                    <td>{category.categoryName}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteCategory(category.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateCategory(category.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addCategory}>Add Category</div>
        </div>
    )
}

export default ListProductCategories