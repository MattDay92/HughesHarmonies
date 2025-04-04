import { useState, useEffect } from 'react'
import ScrollToTop from './ScrollToTop.js';
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
import SinglePageEdit from './view/SinglePageEdit.jsx';

function App({storage}) {

  const [data, setData] = useState({})
  const [voicings, setVoicings] = useState([])
  const [tags, setTags] = useState([])
  const [showFunctions, setShowFunctions] = useState([])

  const getItems = async () => {
    const q = query(collection(db, "arrangements"));

    let items = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setData(items)
  }

  const getVoicingsAndTags = () => {
    let voicingList = []
    let tagList = []
    let functionList = []

    console.log(data)

    for (let key in data) {
      let voicings = Array.isArray(data[key].voicing) ? data[key].voicing : [data[key].voicing];

      voicings.forEach(voicing => {
        if (!voicingList.includes(voicing)) {
          voicingList.push(voicing);
        }
      });

      let tags = Array.isArray(data[key].tags) ? data[key].tags : [data[key].tags];

      tags.forEach(tag => {
        if (!tagList.includes(tag)) {
          tagList.push(tag);
        }
      });

      let functions = Array.isArray(data[key].showFunction) ? data[key].showFunction : [data[key].showFunction];

      functions.forEach(eachFunction => {
        if (!functionList.includes(eachFunction)) {
          functionList.push(eachFunction);
        }
      });
    }

    setVoicings(voicingList)
    setTags(tagList)
    setShowFunctions(functionList)
  }

  useEffect(() => {
    getItems()
    console.log(data)
  }, [])

  useEffect(() => {
    getVoicingsAndTags()
  }, [data])

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin data={data} setData={setData} getItems={getItems} storage={storage} />} />
          <Route path='/stockarrangements' element={<StockArrangements data={data} voicings={voicings} tags={tags} showFunctions={showFunctions} />} />
          <Route path='/arrangement/:id' element={<SinglePage data={data} getItems={getItems} />} />
          <Route path='/arrangement/edit/:id' element={<SinglePageEdit data={data} getItems={getItems} storage={storage} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
