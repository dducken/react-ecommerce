import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NavMenu from '../components/NavMenu'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <NavMenu/>
        <Slider/>
        <Categories/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default Home