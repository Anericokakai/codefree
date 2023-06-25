import React from 'react'
import { Link} from 'react-router-dom'
import { Github ,Discord,Twitter,Whatsap, Linkedin } from '../icons/Icons'
function Footer() {
  return (
    <footer>
        <div className="footer-container">
        <div className='footer1'>
            <Link to={''}>contact us</Link>

            <Link to={''}> join community</Link>
        </div>
        <div className="footer1">
       <Link to={'https://www.linkedin.com/in/anerico-kakai-600b80258/'} target='blank'><Linkedin/></Link> 
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