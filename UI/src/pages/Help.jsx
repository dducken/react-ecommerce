import React from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import PrevFooter from '../components/PrevFooter'
import Navbar from '../components/Navbar'
import NavMenu from '../components/NavMenu'
import HelpInfo from '../components/HelpInfo'

const Help = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <NavMenu/>
        <HelpInfo/>
        <PrevFooter/>
        <Footer/>
    </div>
  )
}

export default Help