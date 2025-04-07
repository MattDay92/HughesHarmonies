import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../SinglePage.css'
import { useParams } from 'react-router-dom'
import BackupIMG from '../components/photos/BD-Choir-3.webp'
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";


export default function SinglePage({ data, getItems }) {
    const { id } = useParams();
    const [arrangement, setArrangement] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const growIMG = () => {
        const IMG = document.getElementById('singlepageIMG')
        const parent = IMG.parentNode

        if (isOpen === true) {
            parent.className = 'singlepageIMG-div-grow'
            setIsOpen(false)
        }

        if (parent.className === 'singlepageIMG-div') {
            parent.className = 'singlepageIMG-div-grow'
            setIsOpen(true)
        } else {
            parent.className = 'singlepageIMG-div'
        }

    }

    const findById = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                setArrangement(data[i]);
                return;
            }
        }
        setArrangement(null)
    };

    useEffect(() => {
        getItems();
    }, [id])

    useEffect(() => {
        findById();
    }, [data])

    if (!arrangement) {
        return <div className='singlepage-fullpage'>Loading...</div>;
    }


    return (
        <div className='singlepage-fullpage'>
            <h1>{arrangement.title}</h1>
            <div className='d-flex justify-content-around flex-wrap'>
                <div className='singlepage-left'>
                    {arrangement.photoURL ? (
                        <div>
                            <div onClick={growIMG} className='singlepageIMG-div'>
                                <img id='singlepageIMG' src={arrangement.photoURL} />
                            </div>
                        </div>
                    ) :
                        <div className='singlepageIMG-div'>
                            <img className='singlepageIMG' src={BackupIMG} />
                        </div>
                    }
                    <audio controls>
                        <source src={arrangement.audioURL} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                </div>
                <div className='singlepage-right'>
                    <p>{arrangement.description}</p>
                    <h2>Voicing</h2>
                    <p>{arrangement.voicing}</p>
                    <h2>Show Function</h2>
                    <p>{arrangement.showFunction ? arrangement.showFunction.join(', ') : 'No show functions available'}</p>
                    <h2>Accompaniment</h2>
                    <p>{arrangement.accompaniment}</p>
                    <h2>Difficulty</h2>
                    <p>{arrangement.difficulty}</p>
                    <h2>Price</h2>
                    <p>{arrangement.price}</p>
                </div>
            </div>
            
            <Link to={'https://buy.stripe.com/test_5kA8y03w5cbj8qk28b'} className='btn btn-warning' target='_blank'>Purchase Arrangement</Link>
        </div>
    )
}
