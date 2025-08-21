import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllProductsForSellApi, deleteProductForSellApi } from "./api/ProductForSellApiService"
import { useAuth } from "./security/AuthContext";


function ListProductForSale() {
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate()
    
    const [products,setProducts] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshProducts(), [])

    function refreshProducts() {
        
        retrieveAllProductsForSellApi('blucodesdev1@gmail.com')
        .then((response) => {
            console.log(response.data)
            setProducts(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteProduct(id) {
        console.log('clicked ' + id)
        deleteProductForSellApi(id)
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
        navigate(`/product-for-sale/${id}`)
    }

    function addProduct() {
        navigate(`/product-for-sale/-1`)
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
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Delete</th>
                               
                            </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(
                            product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.product.productName}</td>
                                    <td>{product.product.productCode}</td>
                                    <td>{product.product.company.companyName}</td>
                                    <td>{product.product.productCategory.categoryName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.city}</td>
                                    <td>{product.state}</td>
                                    <td>{product.country}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteProduct(product.id)}>Delete</button> </td>
                                    
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

export default ListProductForSale