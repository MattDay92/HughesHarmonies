import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

  const getItems = async () => {
    const q = query(collection(db, "arrangements"));

    let items = {}

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items[doc.id] = doc.data()
    });
    setData(items)
  }

  useEffect(() => {
    getItems()
    console.log(data)
  }, [])

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin data={data} setData={setData} getItems={getItems}  />} />
          <Route path='/stockarrangements' element={<StockArrangements data={data} setData={setData} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
