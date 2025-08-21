import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllProductsApi, deleteProductApi } from "../api/ProductApiService"


function ListProducts() {

    const navigate = useNavigate()
    
    const [products,setProducts] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshProducts(), [])

    function refreshProducts() {
        
        retrieveAllProductsApi()
        .then(response => {
            setProducts(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteProduct(id) {
        console.log('clicked ' + id)
        deleteProductApi(id)
        .then(

            () => {
                setMessage(`Delete of product with id = ${id} successful`)
                refreshProducts()
            }
            //1: Display message
            //2: Update Companies list
        )
        .catch(error => console.log(error))
    }

    function updateProduct(id) {
        console.log('clicked ' + id)
        navigate(`/Admin/product/${id}`)
    }

    function addProduct() {
        navigate(`/Admin/product/-1`)
    }

    return (
        <div className="container">
            <h1>Products</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Company</th>
                                <th>Product Category</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(
                            product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.productCode}</td>
                                    <td>{product.company.companyName}</td>
                                    <td>{product.productCategory.categoryName}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteProduct(product.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateProduct(product.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addProduct}>Add Product</div>
        </div>
    )
}

export default ListProducts