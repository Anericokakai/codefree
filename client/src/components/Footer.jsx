import React from 'react'
import { NavLink } from 'react-router-dom'
import { Github ,Discord,Twitter,Whatsap, Linkedin } from '../icons/Icons'
function Footer() {
  return (
    <footer>
        <div className="footer-container">
        <div className='footer1'>
            <NavLink to={''}>contact us</NavLink>
            <NavLink to={''}>Terms and vondition</NavLink>
            <NavLink to={''}> join community</NavLink>
        </div>
        <div className="footer1">
        <Linkedin/>
        <Discord/>
        <Twitter/>
        <Whatsap/>
        <Github/>
        </div>

        </div>

    </footer>
  )
}

export default Footer