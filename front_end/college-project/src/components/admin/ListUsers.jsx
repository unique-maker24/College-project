import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { getAllUsersApi, deleteUsersApi} from "../api/ApiService"


function ListUsers() {

    const navigate = useNavigate()
    
    const [users,setUsers] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => getAllUsers(), [])

    function getAllUsers() {
        
        getAllUsersApi()
        .then(response => {
            setUsers(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteUser(id) {
        console.log('clicked ' + id)
        deleteUsersApi(id)
        .then(

            () => {
                setMessage(`Delete of user with id = ${id} successful`)
                getAllUsers()
            }
            //1: Display message
            //2: Update Users list
        )
        .catch(error => console.log(error))
    }

    function updateUser(id) {
        console.log('clicked ' + id)
        navigate(`/Admin/user/${id}`)
    }

  

    return (
        <div className="container">
            <h1>Registered Users</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <td>Cell Number</td>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Postal Code</th>
                               
                            </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(
                            user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.cellNumber}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td>{user.country}</td>
                                    <td>{user.postalCode}</td>
                                   

                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteUser(user.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateUser(user.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            
        </div>
    )
}

export default ListUsers