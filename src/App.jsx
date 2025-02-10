import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./main.jsx";
import './App.css'
import Home from './view/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './view/About'
import Contact from './view/Contact'
import Admin from './view/Admin'
import StockArrangements from './view/StockArrangements'
import SinglePage from './view/SinglePage.jsx';

function App({storage}) {

  const [data, setData] = useState({})
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const getItems = async () => {
    const q = query(collection(db, "arrangements"));

    let items = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setData(items)
  }

  const getCategoriesAndTags = () => {
    let categoryList = []
    let tagList = []

    console.log(data)

    for (let key in data) {
      let categories = Array.isArray(data[key].categories) ? data[key].categories : [data[key].categories];

      categories.forEach(category => {
        if (!categoryList.includes(category)) {
          categoryList.push(category);
        }
      });

      let tags = Array.isArray(data[key].tags) ? data[key].tags : [data[key].tags];

      tags.forEach(tag => {
        if (!tagList.includes(tag)) {
          tagList.push(tag);
        }
      });
    }

    setCategories(categoryList)
    setTags(tagList)
  }

  useEffect(() => {
    getItems()
    console.log(data)
  }, [])

  useEffect(() => {
    getCategoriesAndTags()
  }, [data])

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin data={data} setData={setData} getItems={getItems} storage={storage} />} />
          <Route path='/stockarrangements' element={<StockArrangements data={data} categories={categories} tags={tags} />} />
          <Route path='/arrangement/:id' element={<SinglePage data={data} getItems={getItems} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
