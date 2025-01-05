import React from 'react'
import Logo from '../components/photos/HughesHarmoniesLogo.webp'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <div className='nav-logo'>
                <Link to={'/'}><img className='nav-logo' src={Logo} /></Link>
            </div>
            <div className='nav-links'>
                <Link className='nav-link' to={'/'}>Stock Arrangements</Link>
                <Link className='nav-link' to={'/about'}>About</Link>
            </div>
            <Link to={'/contact'} className='btn btn-warning'>Contact Us</Link>
        </nav>
    )
}
