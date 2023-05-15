import React from 'react'
import avator from './homeimages/avator2.png'
function Firstpage({userName}) {
  return (
    <div className='userinfo'>
      <div className="avatorimage">
      <img src={avator} alt="" />
      </div>
      <div className="info">
        <h1>welcome back </h1>
        <h4>{userName}</h4>
      </div>
     

    </div>
  )
}

export default Firstpage