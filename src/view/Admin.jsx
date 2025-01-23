import React, { useEffect, useState } from 'react'
import '../Admin.css'
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../main.jsx";
import RichTextEditor from '../components/RichTextEditor.jsx';



export default function Admin({data, setData, getItems}) {


  const addItem = async (event) => {
    event.preventDefault()

    const categoriesArray = event.target.categories.value.split(',').map(item => item.trim()).filter(Boolean);
    const tagsArray = event.target.tags.value.split(',').map(item => item.trim()).filter(Boolean);

    try {
        const docRef = await addDoc(collection(db, "arrangements"), {
            title: event.target.title.value,
            categories: categoriesArray, // Store as an array
            tags: tagsArray,             // Store as an array
            excerpt: event.target.excerpt.value,
            info: event.target.info.value,
            // sampleIMG: sampleIMG,
            // audioTrack: audioTrack
        });
        getItems();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const removeItem = async (item) => {
    try {
      await deleteDoc(doc(db, "arrangements", item));
      getItems();
      console.log(`Item with key ${item} has been deleted`)
    } catch (e) {
      console.error(`Error deleting item with key ${item}`, e)
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='admin'>
      <h1 className='text-center'>Admin Page</h1>
      <form className='w-75 m-auto' onSubmit={addItem} name='title' >
        <h2 className='text-center'>Add New Arrangement</h2>
        <label for='title' className="form-label">Title</label>
        <input className='form-control' id='title' name='title' />
        <label for='categories' className="form-label">Categories</label>
        <input className='form-control' id='categories' name='categories' />
        <label for='tags' className="form-label">Tags</label>
        <input className='form-control' id='tags' name='tags' />
        <label for='excerpt' className="form-label">Excerpt</label>
        <input className='form-control' id='excerpt' name='excerpt' />
        <label for='info' className="form-label">Info</label>
        <input className='form-control' id='info' name='info' />
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
                  <button onClick={() => removeItem(key)} className='btn btn-sm btn-danger'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <RichTextEditor />



    </div>
  )
}
