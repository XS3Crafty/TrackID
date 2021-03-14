import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Token} from '../Token'
import './Search.css'

function Search() {
    const [input, setInput] = useState('');
    const {setToken} = useContext(Token);
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        getToken();
        history.push('/' + input);
    }

    const clientId = 'cca8e5b55a654477a2b6ff32cc6a6c15';
    const clientSecret = '27f43a0fb5f542d8b8bdecc16bb6c9cf';

    const getToken = () => {
        fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
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
                    setToken(result);
                })
                .catch(error => 
                    console.log('API failure' + error));
    }

    return (
        <>
            <form className='search-root'>
                <input onChange={(e) => (setInput(e.target.value))} className='search' placeholder='please enter your favorite song'/>
                <button onClick={(e) => {submit(e)}} className='submit'>search</button>
            </form>
        </>
    )
}

export default Search
