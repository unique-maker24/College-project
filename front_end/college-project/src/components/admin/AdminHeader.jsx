import {Link} from 'react-router-dom'
import { useAuth } from '../security/AuthContext'

function AdminHeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return (
        
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.blucodes.com" target="_blank">Blucodes</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    {isAuthenticated 
                                        && <Link className="nav-link" to="/Admin/home">Home</Link>}
                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/Admin/companies">Companies</Link>}                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/Admin/categories">Product Category</Link>}                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/Admin/products">Products</Link>}                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/Admin/users">Users</Link>}                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/Admin/companies">Quotes</Link>}                                    
                                </li>              
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {!isAuthenticated &&
                                    <Link className="nav-link" to="/login">Login</Link> }
                            </li>
                            
                            <li className="nav-item">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default AdminHeaderComponent