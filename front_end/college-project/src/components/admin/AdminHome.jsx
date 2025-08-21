import {Link} from 'react-router-dom'
import { useAuth } from '../security/AuthContext'

function Welcome() {


    const authContext = useAuth()

    


    return (
        <div className="Welcome">
            <h1>Welcome Admin {authContext.username}</h1>
            <div>
                Manage Companies - <Link to="/Admin/companies">Manage Compnies</Link>
            </div>
           
            
        </div>
    )
}

export default Welcome