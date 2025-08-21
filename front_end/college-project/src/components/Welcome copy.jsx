import { useParams, Link, useNavigate } from 'react-router-dom'
import SearchMap from './SearchMap'
import { useState } from 'react'
import { searchProduct } from './api/ProductForSellApiService';

function Welcome() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('');
    const { username } = useParams()
    const [results, setResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false)
    const handleSearch = async () => {

        searchProduct(query).then((response) => {
            console.log(response.data)
            setResults(response.data);
            setShowSearch(true)

        })
    };

    const handleQueryInput = (e) =>{
        setQuery(e.target.value);
        //setShowSearch(false)
    };

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>


                <input
                    type="text"
                    value={query}
                    onChange={handleQueryInput}
                />
                <div className="btn btn-success m-5" onClick={handleSearch}>Search</div>
                {
                    showSearch &&

                    <SearchMap results={results} />


                }

            </div>


        </div>
    )
}

export default Welcome