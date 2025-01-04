import React from 'react'
import Logo from '../components/photos/HughesHarmoniesLogo.webp'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <img src={Logo} />
            <div className='nav-links'>
                <Link className='nav-link' to={'/'}>Stock Arrangements</Link>
                <Link className='nav-link' to={'/about'}>About</Link>
            </div>
            <a className='btn btn-warning'>Contact Us</a>
        </nav>
    )
}
