import React from 'react'
import '../About.css'
import HeroImage from '../components/photos/BD-Choir-3.webp'
import Jerico from '../components/photos/Jerico-Headshot.webp'

export default function About() {
    return (
        <div className='about-page'>
            <div className='about-hero-container'>
                <img className='hero-image' src={HeroImage} />
                <div className='hero-text'>
                    <h1>About</h1>
                </div>
            </div>

            <div className='about-jerico'>
                <img src={Jerico} />
                <h2>Jerico Hughes</h2>
                <div>Jerico Hughes is a dedicated arranger and music educator from Indianapolis, IN.
                    Jerico has been teaching and arranging for 10 years with many of his custom show
                    choir arrangements receiving award-winning commentary around the midwest.
                    With over 100+ prearranged show choir arrangements, Jerico looks forward to meeting
                    your needs or creating a custom work for your next show choir performance!
                </div>
                <div>
                    If you can’t find what you’re looking for, or need a different voicing/
                    instrumentation contact us for more info!
                </div>
                <div>
                    jericohughes@gmail.com
                </div>
            </div>

            <div className='about-FAQ'>
                <h2>Frequently Asked Questions</h2>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                <strong>   How can I pay for my arrangements?
                                </strong>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                We are still in the process of setting up online payments.  At this time, when you are ready to purchase an arrangement, you will contact Jerico directly and arrange payment through a variety of services.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button  className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <strong>   Can I adjust the orchestration from what is listed?
                                </strong>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Yes!  For a small additional fee, Jerico will adjust the orchestrations of any arrangement to fit the needs of your ensemble.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>   Can I get a different voicing than what is listed?
                                </strong>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Potentially!  Pricing for voicing changes is determined on a case-by-case.  Please fill out a contact form and we will get back to you as soon as possible!
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
