import React, { useEffect, useState } from 'react'
import '../SinglePage.css'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from "../main.jsx";
import BackupIMG from '../components/photos/BD-Choir-3.webp'
import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";


export default function SinglePageEdit({ data, getItems, storage }) {
    const { id } = useParams();
    const [arrangement, setArrangement] = useState(null)
    const navigate = useNavigate()

    const updateItem = async (event) => {
        event.preventDefault()

        const tagsArray = event.target.tags.value.split(',').map(item => item.trim()).filter(Boolean);
        const voicingsArray = event.target.voicing.value.split(',').map(item => item.trim()).filter(Boolean);
        const showFunctionArray = event.target.showFunction.value.split(',').map(item => item.trim()).filter(Boolean);


        let updatedData = {
            title: event.target.title.value,
            voicing: voicingsArray, // Store as an array
            difficulty: event.target.difficulty.value,
            showFunction: showFunctionArray,      
            tags: tagsArray,             // Store as an array          
            excerpt: event.target.excerpt.value,
            description: event.target.description.value,
            accompaniment: event.target.accompaniment.value,
            price: event.target.price.value,
        }

        try {

            const AudioInput = event.target.elements["AudioUpload"];
            const newAudioFile = AudioInput?.files[0];
            const PhotoInput = event.target.elements["PhotoUpload"];
            const newPhotoFile = PhotoInput?.files[0];
            const docRef = doc(db, "arrangements", id);

            if (newAudioFile) {
                // Step 1: Delete old file if it exists
                if (arrangement.audioURL) {
                    const oldFileRef = ref(storage, arrangement.audioURL);
                    await deleteObject(oldFileRef).catch((error) => {
                        console.warn("Old file deletion failed (may not exist):", error);
                    });
                }

                // Step 2: Upload new file
                const newFileRef = ref(storage, `audio/${newAudioFile.name}`);
                const uploadTask = await uploadBytesResumable(newFileRef, newAudioFile, { contentType: newAudioFile.type });
                const newDownloadURL = await getDownloadURL(uploadTask.ref);

                updatedData.audioURL = newDownloadURL; // Store new file URL in Firestore
            }
            if (newPhotoFile) {
                // Step 1: Delete old file if it exists
                if (arrangement.photoURL) {
                    const oldFileRef = ref(storage, arrangement.photoURL);
                    await deleteObject(oldFileRef).catch((error) => {
                        console.warn("Old file deletion failed (may not exist):", error);
                    });
                }

                // Step 2: Upload new file
                const newFileRef = ref(storage, `audio/${newPhotoFile.name}`);
                const uploadTask = await uploadBytesResumable(newFileRef, newPhotoFile, { contentType: newPhotoFile.type });
                const newDownloadURL = await getDownloadURL(uploadTask.ref);

                updatedData.photoURL = newDownloadURL; // Store new file URL in Firestore
            }

            await updateDoc(docRef, updatedData); // Update the document
            console.log("Document updated successfully!");

            navigate('/admin')
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const findById = () => {
        if (!data || !Array.isArray(data)) {
            setArrangement(null);
            return;
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                setArrangement(data[i]);
                console.log('hi')
                return;
            }
        }
        setArrangement(null)
    };

    useEffect(() => {
        if (data.length > 0 && arrangement?.id !== id) {
            findById();
        }
    }, [data, id]);

    if (!arrangement) {
        return <div className='singlepage-fullpage'>Loading...</div>;
    }


    return (
        <div className='singlepage-fullpage'>
            <div className='d-flex justify-content-around flex-wrap'>
                <div className='singlepage-left'>
                    {arrangement.photoURL ? (
                        <div className='singlepageIMG-div'>
                            <embed src={arrangement.photoURL} />
                        </div>
                    ) :
                    <div className='singlepageIMG-div'>
                        <img className='singlepageIMG' src={BackupIMG} />
                    </div>
                    }                    <audio controls>
                        <source src={arrangement.audioURL} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                </div>
                <form className='w-75 m-auto singlepage-right' onSubmit={updateItem} name='title' >
                    <h2 className='text-center'>Edit {arrangement.title}</h2>
                    <label for='title' className="form-label">Title</label>
                    <input defaultValue={arrangement.title} className='form-control' id='title' name='title' />
                    <label for='voicing' className="form-label">Voicing</label>
                    <input defaultValue={arrangement.voicing} className='form-control' id='voicing' name='voicing' />
                    <label for='difficulty' className="form-label">Difficulty</label>
                    <input defaultValue={arrangement.difficulty} className='form-control' id='difficulty' name='difficulty' />
                    <label for='tags' className="form-label">Tags (Separated by Commas)</label>
                    <input defaultValue={arrangement.tags} className='form-control' id='tags' name='tags' />
                    <label for='showFunction' className='form-label'>Show Function (Separated by Commas)</label>
                    <input defaultValue={arrangement.showFunction} className='form-control' id='showFunction' name='showFunction' />
                    <label for='excerpt' className="form-label">Excerpt</label>
                    <input defaultValue={arrangement.excerpt} className='form-control' id='excerpt' name='excerpt' />
                    <label for='description' className="form-label">Description</label>
                    <input defaultValue={arrangement.description} className='form-control' id='description' name='description' />
                    <label for='accompaniment' className="form-label">Accompaniment</label>
                    <input defaultValue={arrangement.accompaniment} className='form-control' id='accompaniment' name='accompaniment' />
                    <label for='price' className="form-label">Price</label>
                    <input defaultValue={arrangement.price} className='form-control' id='price' name='price' />
                    <label for='AudioUpload' className='form-label'>Audio Upload</label>
                    <br />
                    <input type='file' name='AudioUpload' id='AudioUpload' />
                    <br />
                    <label for='PhotoUpload' className='form-label'>PDF Upload</label>
                    <br />
                    <input type='file' name='PhotoUpload' id='PhotoUpload' />
                    <br />
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
            <p>{arrangement.info}</p>
        </div>
    )
}
