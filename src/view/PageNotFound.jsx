import React, { useState } from 'react'
import HeroImage from '../components/photos/BD-Choir-1.webp'
import '../About.css'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
   
    return (
        <div className='pagenotfound'>
            <div className='pagenotfound-hero-container'>
                <div className='pagenotfound-text'>
                    <h1>Page Not Found</h1>
                </div>
            </div>
            <div className='my-5 text-center'>
                <h2>The page you are looking for does not exist.</h2>
                <Link className='btn btn-warning my-5' to={'/'}>Return Home</Link>
            </div>
        </div>
    );
}
