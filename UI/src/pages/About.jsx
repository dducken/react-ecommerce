import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import PrevFooter from '../components/PrevFooter'
import Navbar from '../components/Navbar'
import NavMenu from '../components/NavMenu'
import Slider from '../components/Slider'
import HomeProducts from '../components/HomeProducts'
import AboutInfo from '../components/AboutInfo'

const About = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <NavMenu/>
        <AboutInfo/>
        <PrevFooter/>
        <Footer/>
    </div>
  )
}

export default About