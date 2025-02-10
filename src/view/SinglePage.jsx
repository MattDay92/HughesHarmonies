import React, { useEffect, useState } from 'react'
import '../SinglePage.css'
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";


export default function SinglePage({ data, getItems }) {
    const { id } = useParams();
    const [arrangement, setArrangement] = useState(null)

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
            <div className='d-flex justify-content-around'>
                <div className='singlepage-left'>
                    <img className='singlepageIMG' src='https://firebasestorage.googleapis.com/v0/b/triangleasphalt-4b0f2.firebasestorage.app/o/files%2FTestPhoto1?alt=media&token=a3149957-4888-4276-806f-209c6da406a5' />
                    <audio controls>
                        <source src={arrangement.audioURL} type="audio/mpeg" />
                            Your browser does not support the audio element.
                    </audio>

                </div>
                <div className='singlepage-right'>
                    <p>{arrangement.description}</p>
                    <h2>Voicing</h2>
                    <p>{arrangement.voicing}</p>
                    <h2>Accompaniment</h2>
                    <p>{arrangement.accompaniment}</p>
                    <h2>Difficulty</h2>
                    <p>{arrangement.difficulty}</p>
                    <h2>Price</h2>
                    <p>{arrangement.price}</p>
                </div>
            </div>
            <p>{arrangement.info}</p>
        </div>
    )
}
