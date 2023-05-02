import React from 'react'
import monk from "../../images/monk.png"
import "./Navbar.css"


const Navbar = () => {
  return (
    <div className='nav_bar'>
      <img src={monk} className="nav_image" />
      <h4 className="nav_text">
        Monk Upsell & crosssell
      </h4>
    </div>
  )
}

export default Navbar
