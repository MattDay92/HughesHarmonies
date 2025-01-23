import React, { useEffect, useState } from 'react'
import HeroImage from '../components/photos/BD-Choir-1.webp'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../main';
import '../StockArrangements.css'

export default function StockArrangements({ data, categories, tags }) {

    const [filtered, setFiltered] = useState(null)

    const filterItems = async (filter) => {
        if (!filter) {
            console.error("No filter provided");
            return;
        }

        const itemRef = collection(db, "arrangements");

        try {
            const q = query(itemRef, where("tags", "array-contains", filter[0]));

            let filteredList = []

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching documents found.");
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    filteredList.push(doc.data())
                });

                setFiltered(filteredList)
            }
        } catch (e) {
            console.error("Error filtering items: ", e);
        }
    }

    return (
        <div className='stockarrangements'>
            <div className='arrangements-hero-container'>
                <img className='hero-image' src={HeroImage} />
                <div className='hero-text'>
                    <h1>Stock Arrangements</h1>
                </div>
            </div>

            <div>
                {categories ? (
                    <div className='stockarrangements-categories'>
                        {categories.map((x, index) => (
                            <div key={index}>
                                {x}
                            </div>
                        ))}
                    </div>
                ) : null}

                {tags ? (
                    <div className='stockarrangements-tags'>
                        {tags.map((x, index) => (
                            <div key={index}>
                                <button onClick={() => { filterItems(x) }}>{x}</button>
                            </div>
                        ))}
                    </div>
                ) : null}

                {filtered ? (
                    <div className='arrangements-list'>
                        {Object.entries(filtered).map(([key, value], index) => (
                            <div key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h2>{value.title}</h2>
                                        <p>{value.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className='arrangements-list'>
                    {Object.entries(data).map(([key, value], index) => (
                        <div key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h2>{value.title}</h2>
                                    <p>{value.excerpt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    );
}

