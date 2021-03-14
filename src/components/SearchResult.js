import React from 'react'
import './SearchResult.css'

function SearchResult(props) {
    return (
        <div className="result-root">
            <div className="result-title">{props.title}</div>
            <div className="result-artist">By: {props.artist}</div>
        </div>
    )
}

export default SearchResult
