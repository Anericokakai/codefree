import React from 'react'
import AdminNav from '../Admincomponents/AdminNav'
import Tablecomponent from '../Admincomponents/Tablecomponent'

function NodejsBlogs() {
  return (
    <div className='admin-container'>
        <AdminNav/>
        <Tablecomponent page="Node js"></Tablecomponent>
    </div>
  )
}

export default NodejsBlogs