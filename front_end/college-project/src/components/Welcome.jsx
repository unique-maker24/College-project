import {useParams, Link, useNavigate} from 'react-router-dom'
import SearchMap from './SearchMap'

function Welcome() {
    const navigate = useNavigate()
    const {username } = useParams()

    function search(){
        navigate('/search')
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
               

                Click to search product!

                <div className="btn btn-success m-5" onClick={search}>Search</div>
                
            </div>
           

        </div>
    )
}

export default Welcome