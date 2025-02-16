import React from 'react'
import Facebook from '../components/photos/Facebook.png'
import Instagram from '../components/photos/Instagram.png'
import TikTok from '../components/photos/TikTok.png'

export default function Footer() {
    return (
        <footer>
            <div>
                Hughes Harmonies offers custom choral arrangements for all levels of ensembles. 
                At competitively low prices, choose from previously arranged music or custom charts 
                for your next competition or concert!
            </div>
            <div className='text-center'>
                <button className='btn btn-warning'>Contact Hughes Harmonies</button>
            </div>
            <div className='social-icons text-center'>
                <a href='https://www.facebook.com' target='_blank' className='btn facebook'><img src={Facebook} /></a>
                <a href='https://www.instagram.com' target='_blank' className='btn instagram'><img src={Instagram} /></a>
                <a href='https://www.tiktok.com' target='_blank' className='btn tiktok'><img src={TikTok} /></a>
            </div>
        </footer>
    )
}
