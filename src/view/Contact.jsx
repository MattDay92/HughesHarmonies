import React, {useState} from 'react'
import HeroImage from '../components/photos/BD-Choir-1.webp'
import '../About.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('An error occurred while sending the email.');
        }
    };

    
    return (
        <div className='contact'>
            <div className='about-hero-container'>
                <img className='hero-image' src={HeroImage} />
                <div className='hero-text'>
                    <h1>Contact</h1>
                </div>
            </div>

            <h2>Contact Us</h2>
            <form className='contact-form' onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" className='form-control' name="name" value={formData.name} onChange={handleChange} required />
                </label><br />

                <label>
                    Email:
                    <input type="email" className='form-control' name="email" value={formData.email} onChange={handleChange} required />
                </label><br />

                <label>
                    Inquiry Type:
                    <div>
                        <input type="checkbox" id="option1" name="inquiryType" value={formData.inquiryType} />
                            <label for="option1">Custom Arrangement</label>
                    </div>

                    <div>
                        <input type="checkbox" id="option2" name="inquiryType" value={formData.inquiryType} />
                            <label for="option2">Stock Arrangements</label>
                    </div>

                    <div>
                        <input type="checkbox" id="option3" name="inquiryType" value={formData.inquiryType} />
                            <label for="option3">General</label>
                    </div>
                </label><br />

                <label>
                    Message:
                    <textarea name="message" className='form-control' value={formData.message} onChange={handleChange} required />
                </label><br />

                <button type="submit" className='btn btn-primary'>Send</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
