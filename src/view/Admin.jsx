import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Admin.css'
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString, getDownloadURL } from 'firebase/storage'
import { db } from "../main.jsx";
import RichTextEditor from '../components/RichTextEditor.jsx';



export default function Admin({ data, setData, getItems, storage }) {
  const [fileUpload, setFileUpload] = useState('')
  const [fileUploadName, setFileUploadName] = useState('')
  const [fileDownload, setFileDownload] = useState('')



  const addItem = async (event) => {
    event.preventDefault()

    let audioDownloadURL = ""

    const audioInput = event.target.elements["AudioUpload"];
    const file = audioInput?.files[0]; if (file) {
      try {
        const metadata = {
          contentType: file.type || "audio/mpeg", // Fallback MIME type
        };

        const storageRef = ref(storage, `audio/${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
        audioDownloadURL = await getDownloadURL(uploadTask.ref);

        console.log("File uploaded successfully:", audioDownloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Stop execution if upload fails
      }
    }

    let photoDownloadURL = ""

    const photoInput = event.target.elements["PhotoUpload"];
    const photoFile = photoInput?.files[0]; if (photoFile) {
      try {
        

        const storageRef = ref(storage, `images/${photoFile.name}`);
        const uploadTask = await uploadBytes(storageRef, photoFile);
        photoDownloadURL = await getDownloadURL(uploadTask.ref);

        console.log("File uploaded successfully:", photoDownloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Stop execution if upload fails
      }
    }

    const voicingsArray = event.target.voicing.value.split(',').map(item => item.trim()).filter(Boolean);
    const tagsArray = event.target.tags.value.split(',').map(item => item.trim()).filter(Boolean);

    console.log(voicingsArray)

    try {
      const docRef = await addDoc(collection(db, "arrangements"), {
        title: event.target.title.value,
        voicing: voicingsArray, // Store as an array
        difficulty: event.target.difficulty.value,
        tags: tagsArray,             // Store as an array          
        excerpt: event.target.excerpt.value,
        description: event.target.description.value,
        accompaniment: event.target.accompaniment.value,
        price: event.target.price.value,
        audioURL: audioDownloadURL,
        photoURL: photoDownloadURL
      });
      getItems();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const uploadAudio = async (file) => {
    if (!file) return null;

    const metadata = {
      contentType: file.type,  // Automatically detect file type
    };

    try {
      const storageRef = ref(storage, `audio/${file.name}`);
      const snapshot = await uploadBytesResumable(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Audio uploaded:", downloadURL);
      return downloadURL;  // Return the URL so it can be used in addItem
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("File Name:", file.name);
      console.log("File Type:", file.type); // This contains the MIME type (e.g., "audio/mpeg")
      console.log("File Size:", file.size);
      uploadAudio(file);
    }
  };


  const removeItem = async (item) => {
    try {
      await deleteDoc(doc(db, "arrangements", item));
      getItems();
      console.log(`Item with key ${item} has been deleted`)
    } catch (e) {
      console.error(`Error deleting item with key ${item}`, e)
    }
  }

  const handleFileUpload = () => {
    const filesRef = ref(storage, `files/${fileUploadName}`)

    if (fileUpload) {
      uploadString(filesRef, fileUpload, 'data_url').then((snapshot) => {
        console.log('Uploaded a file!');
      })
    }

    if (fileUploadName) {
      downloadFile(fileUploadName)
    }
  }

  const downloadFile = (name) => {
    const gsReference = ref(storage, `gs://hughesharmonies.firebasestorage.app/files/${name}`)

    getDownloadURL(gsReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (event) => {
          const link = xhr.responseURL
          setFileDownload(link)
          console.log('Ran Download')
        };
        xhr.open('GET', url);
        xhr.send()
      })
      .catch((error) => {
        console.log('ERROR Downloading File')
      })
  }


  useEffect(() => {
    handleFileUpload()
  }, [fileUpload])

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='admin'>
      <h1 className='text-center'>Admin Page</h1>
      <form className='add-arrangement' onSubmit={addItem} name='title' >
        <h2 className='text-center'>Add New Arrangement</h2>
        <label for='title' className="form-label">Title</label>
        <input className='form-control' id='title' name='title' />
        <label for='voicing' className="form-label">Voicing</label>
        <input className='form-control' id='voicing' name='voicing' />
        <label for='difficulty' className="form-label">Difficulty</label>
        <input className='form-control' id='difficulty' name='difficulty' />
        <label for='tags' className="form-label">Tags (Separated by Commas)</label>
        <input className='form-control' id='tags' name='tags' />
        <label for='excerpt' className="form-label">Excerpt</label>
        <input className='form-control' id='excerpt' name='excerpt' />
        <label for='description' className="form-label">Description</label>
        <input className='form-control' id='description' name='description' />
        <label for='accompaniment' className="form-label">Accompaniment</label>
        <input className='form-control' id='accompaniment' name='accompaniment' />
        <label for='price' className="form-label">Price</label>
        <input className='form-control' id='price' name='price' />
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

      {data ? (
        <div className='admin-arrangements'>
          {Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <div class="card">
                <div class="card-body">
                  <h2>{value.title}</h2>
                  <p>{value.excerpt}</p>
                  <div className='d-flex justify-content-around'>
                    <button onClick={() => removeItem(value.id)} className='btn btn-sm btn-danger'>Delete</button>
                    <Link to={`/arrangement/edit/${value.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

    </div>
  )
}
