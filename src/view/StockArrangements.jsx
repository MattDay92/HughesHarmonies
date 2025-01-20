import React from 'react'
import HeroImage from '../components/photos/BD-Choir-1.webp'
import '../StockArrangements.css'

export default function StockArrangements() {
  return (
    <div className='stockarrangements'>
            <div className='arrangements-hero-container'>
                <img className='hero-image' src={HeroImage} />
                <div className='hero-text'>
                    <h1>Stock Arrangements</h1>
                </div>
            </div>

            
        </div>
  )
}
