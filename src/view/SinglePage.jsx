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
            <h2>{arrangement.title}</h2>
            <p>{arrangement.info}</p>
        </div>
    )
}
