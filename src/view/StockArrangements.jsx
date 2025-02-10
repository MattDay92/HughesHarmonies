import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroImage from '../components/photos/BD-Choir-1.webp'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../main';
import '../StockArrangements.css'

export default function StockArrangements({ data, categories, tags }) {

    const [filtered, setFiltered] = useState(null)
    const [filteredName, setFilteredName] = useState(null)

    const filterItemsByTag = async (filter) => {
        if (!filter) {
            console.error("No filter provided");
            return;
        }

        setFilteredName(filter)

        console.log(filter)

        const itemRef = collection(db, "arrangements");

        try {
            const q = query(itemRef, where("tags", "array-contains", filter));

            let filteredList = []

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching documents found.");
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    filteredList.push({ id: doc.id, ...doc.data() })
                });

                setFiltered(filteredList)
            }
        } catch (e) {
            console.error("Error filtering items: ", e);
        }
    }

    const filterItemsByCategory = async (filter) => {
        if (!filter) {
            console.error("No filter provided");
            return;
        }

        setFilteredName(filter)

        console.log(filter)

        const itemRef = collection(db, "arrangements");

        try {
            const q = query(itemRef, where("categories", "array-contains", filter));

            let filteredList = []

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No matching documents found.");
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    filteredList.push({ id: doc.id, ...doc.data() })
                });

                setFiltered(filteredList)
            }
        } catch (e) {
            console.error("Error filtering items: ", e);
        }
    }

    useEffect(() => {
        console.log(filtered)
    })

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
                        {categories.map((x, index) => {
                            let btnClass = x === filteredName ? 'btn-warning-darker' : 'btn-warning';
                            return (
                                <div key={index}>
                                    <button className={`btn btn-sm ${btnClass}`} onClick={() => filterItemsByCategory(x)}>
                                        {x}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                {tags ? (
                    <div className='stockarrangements-tags'>
                        {tags.map((x, index) => {
                            let btnClass = x === filteredName ? 'btn-warning-darker' : 'btn-warning';
                            return (
                                <div key={index}>
                                    <button className={`btn btn-sm ${btnClass}`} onClick={() => filterItemsByTag(x)}>
                                        {x}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                {filtered ? (
                    <div className='stockarrangements-showall'>
                        <div>
                            <button className='btn btn-sm btn-warning' onClick={() => { setFiltered(null); setFilteredName(null) }}>Show All</button>
                        </div>
                    </div>
                )
                    : null
                }

                {filtered ? (
                    <div className='arrangements-list'>
                        {Object.entries(filtered).map(([key, value], index) => (
                            <Link to={`/arrangement/${value.id}`} className='arrangement-card-link'>
                                <div key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h2>{value.title}</h2>
                                            <p>{value.excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : <div className='arrangements-list'>
                    {Object.entries(data).map(([key, value], index) => (
                        <Link to={`/arrangement/${value.id}`} className='arrangement-card-link'>
                            <div key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h2>{value.title}</h2>
                                        <p>{value.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>}
            </div>
        </div>
    );
}

