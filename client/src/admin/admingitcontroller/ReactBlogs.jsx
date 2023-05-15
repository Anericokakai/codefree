import React from 'react'
import AdminNav from '../Admincomponents/AdminNav'
import Tablecomponent from '../Admincomponents/Tablecomponent'

function ReactBlogs() {
  return (
    <div className='admin-container'>
    <AdminNav/>
    <Tablecomponent page="react"></Tablecomponent>
</div>
  )
}

export default ReactBlogs