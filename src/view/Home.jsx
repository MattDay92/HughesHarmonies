import React from 'react'
import '../Home.css'
import HeroImage from '../components/photos/BD-Choir-1.webp'
import Logo from '../components/photos/HughesHarmoniesLogo.webp'
import HughesFam from '../components/photos/HughesFam.webp'
import Testimonial1 from '../components/photos/KCD.webp'
import Testimonial2 from '../components/photos/JD.png'

export default function Home() {
    return (
        <>
            <div className='home-hero-container'>
                <img className='hero-image' src={HeroImage} />
                <div className='hero-text'>
                    <img className='hero-logo' src={Logo} />
                    <h2>Stock and Custom Choir Arrangements</h2>
                    <p>Hughes Harmonies offers custom choral arrangements for all levels of ensembles.
                        At competitively low prices, choose from previously arranged music or custom charts
                        for your next competition or concert!</p>
                    <a className='btn btn-warning'>Shop</a>
                </div>
            </div>

            <div className='meet-jerico'>
                <div className='meet-jerico-img-div'>
                    <img src={HughesFam} />
                </div>
                <div className='meet-jerico-info'>
                    <h2>Meet Jerico</h2>
                    <p>Jerico Hughes is a dedicated arranger and music educator from Indianapolis, IN.
                        Jerico has been teaching and arranging for 10 years with many of his custom show
                        choir arrangements receiving award-winning commentary around the midwest. With over
                        100+ prearranged show choir arrangements, Jerico looks forward to meeting your needs
                        or creating a custom work for your next show choir performance!</p>
                    <p>If you can’t find what you’re looking for, or need a different voicing/ instrumentation
                        contact us for more info! </p>
                </div>
            </div>

            <div className='testimonials'>
                <div className='testimonial-box-1'>
                    <div className='testimonial-text'>Jerico's unique and creative arrangements are always a great way spice up my shows!
                        He focuses on the strengths of my singers, incorporates fantastic vocal leading,
                        and creates arrangements that make an impact on both audiences and judges.</div>
                    <div className='testimonial-title-card'>
                        <div>
                            <img src={Testimonial1} />
                        </div>
                        <div>
                            <h4>Kelly Cassady Day</h4>
                            <h5>Choir Director - Franklin Community High School</h5>
                        </div>
                    </div>
                </div>
                <div className='testimonial-box-2'>
                    <div className='testimonial-text'>Jerico creates phenomenal arrangements for my ensembles. He pays particularly great
                        attention to the voice leading for each of my ensembles to ensure my students will
                        be successful. His creativity and knowledge of the young singers voice are unmatched.
                        Jerico is also a wonderful human to work with and will strive to ensure you receive
                        exactly what you want in your arrangements!</div>
                    <div className='testimonial-title-card'>
                        <div>
                            <img src={Testimonial2} />
                        </div>
                        <div>
                            <h4>Jason David</h4>
                            <h5>Choir Director - Ben Davis High School</h5>
                        </div>
                    </div>
                </div>
                <div className='testimonial-box-3'>
                    <div className='testimonial-text'>Jerico is so lit</div>
                    <div className='testimonial-title-card'>
                        <div>
                            <img src={Testimonial1} />
                        </div>
                        <div>
                            <h4>Matt Day</h4>
                            <h5>Not a Choir Director - Franklin</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pricing'>
                <div className='pricing-box-1'>
                    <h3>Stock w/ Adjustments</h3>
                    <div>$300 -$500</div>
                    <div>Anything from our vast library of arrangements can be customized to fit your needs</div>
                    <button className='btn btn-warning'>Contact</button>
                </div>
                <div className='pricing-box-2'>
                    <h3>Stock w/ Adjustments</h3>
                    <div>$300 -$500</div>
                    <div>Anything from our vast library of arrangements can be customized to fit your needs</div>
                    <button className='btn btn-warning'>Contact</button>
                </div>
                <div className='pricing-box-3'>
                    <h3>Stock w/ Adjustments</h3>
                    <div>$300 -$500</div>
                    <div>Anything from our vast library of arrangements can be customized to fit your needs</div>
                    <button className='btn btn-warning'>Contact</button>
                </div>
            </div>
        </>
    )
}
