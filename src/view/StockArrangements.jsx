import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroImage from '../components/photos/BD-Choir-1.webp'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../main';
import '../StockArrangements.css'

export default function StockArrangements({ data, voicings, tags, showFunctions }) {

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

    const filterItemsByVoicing = async (filter) => {
        if (!filter) {
            console.error("No filter provided");
            return;
        }

        setFilteredName(filter)

        console.log(filter)

        const itemRef = collection(db, "arrangements");

        try {
            const q = query(itemRef, where("voicing", "array-contains", filter));

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

    const filterItemsByShowFunction = async (filter) => {
        if (!filter) {
            console.error("No filter provided");
            return;
        }

        setFilteredName(filter)

        console.log(filter)

        const itemRef = collection(db, "arrangements");

        try {
            const q = query(itemRef, where("showFunction", "array-contains", filter));

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

            <div class="accordion mobile-arrangements-accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Filters
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <h2>Voicings</h2>
                            <div className='mobile-arrangements-filters-div'>
                                {voicings ? (
                                    <div className='stockarrangements-categories'>
                                        <h2>Voicing</h2>
                                        {voicings.map((x, index) => {
                                            let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                            return (
                                                <div key={index}>
                                                    <button
                                                        className={`btn btn-xs ${btnClass}`}
                                                        onClick={() => {
                                                            filterItemsByVoicing(x);
                                                            const collapseElement = document.getElementById('collapseOne');
                                                            const bsCollapse = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);
                                                            bsCollapse.hide();
                                                        }}
                                                    >
                                                        {x}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}
                                <h2>Genre</h2>


                                {tags ? (
                                    <div className='stockarrangements-tags'>
                                        <h2>Genre</h2>

                                        {tags.map((x, index) => {
                                            let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                            return (
                                                <div key={index}>
                                                    <button
                                                        className={`btn btn-xs ${btnClass}`}
                                                        onClick={() => {
                                                            filterItemsByTag(x);
                                                            const collapseElement = document.getElementById('collapseOne');
                                                            const bsCollapse = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);
                                                            bsCollapse.hide();
                                                        }}
                                                    >
                                                        {x}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}

                                <h2>Show Function</h2>


                                {showFunctions ? (
                                    <div className='stockarrangements-functions'>
                                        <h2>Show Function</h2>
                                        {showFunctions.filter(Boolean).map((x, index) => {
                                            let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                            return (
                                                <div key={index}>
                                                    <button
                                                        className={`btn btn-xs ${btnClass}`}
                                                        onClick={() => {
                                                            filterItemsByShowFunction(x);
                                                            const collapseElement = document.getElementById('collapseOne');
                                                            const bsCollapse = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);
                                                            bsCollapse.hide();
                                                        }}
                                                    >
                                                        {x}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {filtered ? (
                <div className='stockarrangements-showall'>
                    <div>
                        <button className='btn btn-xs btn-primary' onClick={() => { setFiltered(null); setFilteredName(null) }}>Show All</button>
                    </div>
                </div>
            )
                : null
            }

            <div className='arrangements-maindiv'>
                <div className='arrangements-filters-div'>
                    <h2>Voicing</h2>
                    {voicings ? (
                        <div className='stockarrangements-categories'>
                            {voicings.map((x, index) => {
                                let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                return (
                                    <div key={index}>
                                        <button className={`btn btn-xs ${btnClass}`} onClick={() => filterItemsByVoicing(x)}>
                                            {x}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    {tags ? (
                        <div className='stockarrangements-tags'>
                            <h2>Genre</h2>

                            {tags.map((x, index) => {
                                let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                return (
                                    <div key={index}>
                                        <button className={`btn btn-xs ${btnClass}`} onClick={() => filterItemsByTag(x)}>
                                            {x}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    {showFunctions ? (
                        <div className='stockarrangements-functions'>
                            <h2>Show Function</h2>
                            {showFunctions.filter(Boolean).map((x, index) => {
                                let btnClass = x === filteredName ? 'btn-primary-darker' : 'btn-primary';
                                return (
                                    <div key={index}>
                                        <button className={`btn btn-xs ${btnClass}`} onClick={() => filterItemsByShowFunction(x)}>
                                            {x}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                </div>

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

