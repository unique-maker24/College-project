import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllCompaniesApi, deleteCompanyApi } from "../api/CompanyApiService"


function ListCompanies() {

    const navigate = useNavigate()
    
    const [companies,setCompanies] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshCompanies(), [])

    function refreshCompanies() {
        
        retrieveAllCompaniesApi()
        .then(response => {
            setCompanies(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteCompany(id) {
        console.log('clicked ' + id)
        deleteCompanyApi(id)
        .then(

            () => {
                setMessage(`Delete of company with id = ${id} successful`)
                refreshCompanies()
            }
            //1: Display message
            //2: Update Companies list
        )
        .catch(error => console.log(error))
    }

    function updateCompany(id) {
        console.log('clicked ' + id)
        navigate(`/Admin/company/${id}`)
    }

    function addCompany() {
        navigate(`/Admin/company/-1`)
    }

    return (
        <div className="container">
            <h1>Companies</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Id</th>
                                {/* <th>Comapny Code</th> */}
                                <th>Company Name</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        companies.map(
                            company => (
                                <tr key={company.id}>
                                    <td>{company.id}</td>
                                    {/*  <td>{company.companyCode}</td>*/}
                                    <td>{company.companyName}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteCompany(company.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateCompany(company.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addCompany}>Add Company</div>
        </div>
    )
}

export default ListCompanies