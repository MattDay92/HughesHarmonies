import React, { useState } from 'react'
import Logo from '../components/photos/HughesHarmoniesLogo.webp'
import { Link } from 'react-router-dom'

export default function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const openNav = () => {
        setIsNavOpen(!isNavOpen);
        console.log('Ran')
    };


    const navClick = () => {
        const navSections = document.getElementsByClassName('mobile-nav-text');
        for (const nav of navSections) {
            nav.style.pointerEvents = "none";
        }
    };

    return (
        <div>
            <nav>
                <div className='nav-logo-div'>
                    <Link to={'/'}><img className='nav-logo' src={Logo} /></Link>
                </div>
                <div className='nav-links'>
                    <Link className='nav-link' to={'/stockarrangements'}>Stock Arrangements</Link>
                    <Link className='nav-link' to={'/about'}>About</Link>
                </div>
                <Link to={'/contact'} className='btn btn-warning'>Contact Us</Link>

                <btn onClick={openNav}><i className="fa-solid fa-bars"></i></btn>
            </nav>


            <div id="mobile-nav-section" className={`${isNavOpen ? "show-mobile-nav" : "hide-mobile-nav"}`}>
                <a onClick={navClick} className="mobile-nav-text" href="/stockarrangements">Stock Arrangements</a>
                <a onClick={navClick} className="mobile-nav-text" href="/about" > About</a >
                <a onClick={navClick} className="mobile-nav-text" href="/contact" > Contact Us</a >
            </div >
        </div>
    )
}
