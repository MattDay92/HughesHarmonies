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

function App() {

  const [data, setData] = useState({})
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const getItems = async () => {
    const q = query(collection(db, "arrangements"));

    let items = {}

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items[doc.id] = doc.data()
    });
    setData(items)
  }

  const getCategoriesAndTags = () => {
    let categoryList = []
    let tagList = []

    for (let key in data) {
      let categories = data[key].categories.includes(',')
        ? data[key].categories.split(',').map(item => item.trim()).filter(Boolean)
        : [data[key].categories];

      categories.forEach(category => {
        if (!categoryList.includes(category)) {
          categoryList.push(category)
        }
      });

      let tags = data[key].tags.includes(',')
        ? data[key].tags.split(',').map(item => item.trim()).filter(Boolean)
        : [data[key].tags];

      tags.forEach(tag => {
        if (!tagList.includes(tag)) {
          tagList.push(tag)
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
          <Route path='/admin' element={<Admin data={data} setData={setData} getItems={getItems} />} />
          <Route path='/stockarrangements' element={<StockArrangements data={data} categories={categories} tags={tags} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
