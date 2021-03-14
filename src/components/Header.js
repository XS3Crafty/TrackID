import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div className='navbar-root'>
            <div className='navbar-home'>
                <Link to='/'>
                    HOME
                </Link>
            </div>
            <div className='navbar-about'>
                <a href='https://github.com'>
                    ABOUT
                </a>
            </div>
        </div>
    )
}

export default Header
