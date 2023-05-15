import React from 'react'
import AdminNav from '../Admincomponents/AdminNav'
import Tablecomponent from '../Admincomponents/Tablecomponent'

function JsBlogs() {
  return (
   
    <div className='admin-container'>
        <AdminNav/>
        <Tablecomponent page="javascript"></Tablecomponent>
    </div>
  )
}

export default JsBlogs