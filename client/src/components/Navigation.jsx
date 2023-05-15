import React, { useEffect, useState } from 'react'
import { Bars } from '../icons/Icons'

function Navigation() {
  const[shownav,setshownav]=useState(false)
  const [showOnscroll,setshowonscroll]=useState(false)
  const displayNav=()=>{
shownav?setshownav(false):setshownav(true)
  }
  console.log(shownav)

  // hide and show on scroll
 const handleScrollY=()=>{
  if(window.scrollY>100){
    console.log(window.scrollY)
    setshowonscroll(true)
    console.log(showOnscroll)
  }
  else{
    setshowonscroll(false)
  }
 }
 
  useEffect(()=>{

    document.addEventListener('scroll',handleScrollY)
  
  
    return ()=>{
      window.removeEventListener('scroll',handleScrollY)
    }
  },[])
  return (
    <div >

    
    <nav className={`navigation ${showOnscroll &&'sticky'}`}>
        <div className="logo"> <h1>Code<span className='logosapn'>Free</span></h1></div>
       <div className='bars'>
       <i onClick={displayNav} class="fa-solid fa-bars"></i>
        </div> 
        <ul>
            <li> Home </li>
            <li>Lessons</li>
            <li>  premium</li>
            <li> login</li>
        </ul>
    </nav>
    <ul className={`smallnav ${shownav && 'show' } `}>
    <i onClick={displayNav} class="fa-solid fa-xmark"></i>

    
            <li> Home </li>
            <li>Lessons</li>
            <li>  premium</li>
            <li> login</li>
        </ul>
    </div>
  )
}

export default Navigation