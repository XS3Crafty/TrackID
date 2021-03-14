import React from 'react'
import './Home.css'
import Header from '../components/Header'
import Search from '../components/Search'

function Home() {
    return (
        <>  
            <Header />
            <div className='home-root'>
                <div className='home-text'>
                    <h1 className='home-title'>TrackID</h1>
                    <h2 className='home-greeting'>Get Song Key & BPM</h2>
                </div>
                <Search />
            </div>
        </>
        
    )
}

export default Home
