import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Search from '../components/Search'
import SearchResult from '../components/SearchResult'
import {Token} from '../Token'
import './SearchResults.css'

function SearchResults() {
    const pathname = window.location.pathname;
    let query = pathname.substring(1);
    query = query.split('%20').join(' ')

    const {token} = useContext(Token);
    const [data, setData] = useState([]);

    
    const search = () => {
        fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track', {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token.access_token}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(result => {
                setData(result.tracks.items);
            })
            .catch(error => console.log('API failure' + error));
    }

    useEffect(() => {
        token && search();
    }, [token])
    
    return (
        <>
            <Header/>
            <div className='results-root'>
                <Search/>
                <div className='results-content'>
                    {data && data.map((item) => {
                        return <Link key={item.id} to={pathname + '/' + item.id}><SearchResult title={item.name} artist={item.artists[0].name} /></Link> 
                    })}
                </div>
            </div>
        </>
    )
}

export default SearchResults
