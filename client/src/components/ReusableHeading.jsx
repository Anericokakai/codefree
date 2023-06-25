
import React, { useEffect } from 'react'
import { useState } from 'react'

function ReusableHeading({heading,topics,fetchOnClick,admin}) {
const[inputvalue,setvalue]=useState('')
const[blur,setblur]=useState()
const[topic_array,settopic_array]=useState([{}])

// !handle focus





console.log(blur)
console.log(admin)


  // !handle submit 
  const handlesubmit=(e)=>{
    e.preventDefault()


  }
  // ! handle change
  const handlechange=(e)=>{
    // !convert input to lower case
    const val=e.target.value.toLowerCase()
    setvalue(val)
    // !filter the topics  adn reurn vealue
    const result=topics.filter((item)=>{
const topic_cont=item.topic
      return val && topic_cont.toLowerCase().includes(val)
    })
    
    settopic_array(result)
    console.log(topic_array)


  }
  // !handleclick
  const handleclick=(topic)=>{
    console.log(topic)
     fetchOnClick(topic)
     settopic_array([{}])
     setblur(true)

    }
  

  return (
    <div className={`headingbg ${admin && 'hiden'}`}>
<h1 className="center">{heading}</h1>
<form action="" className="searchbar" onSubmit={handlesubmit}>
 <div className="searchContainer">
  <input id='search' placeholder='Search for blog'  onFocus={()=>setblur(false)} type="text" value={inputvalue} autoComplete="off" onChange={(e)=>{
    handlechange(e)
  }} /> <button className='searchbtn'placeholder='Search for topic' type='submit'> <i className='fa-solid fa-search'></i></button>
  <div className={`suggest ${ blur && 'blur'}`}>
    <ul>
{
  topic_array.map(item=>{
    return <li onClick={()=>handleclick(item.topic)}> {item.topic}</li>
  })
}
    </ul>
  </div>
 </div>
</form>
</div>
  )
}

export default ReusableHeading