import React from 'react'
import AdminNav from './Admincomponents/AdminNav'
import Tablecomponent from './Admincomponents/Tablecomponent'
function AdminHome() {
  return (
    <div className='admin-container'>
        <AdminNav/>
        <Tablecomponent page="github"/>
    </div>
  )
}

export default AdminHome