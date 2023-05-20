import React from 'react'
import BlogReusable from '../../../../components/home/BlogReusable'

function ReactBasics() {
  return (
    <div>
      <h1>react</h1>
      <BlogReusable api='http://localhost:8000/api/react_tutorials'></BlogReusable>
    </div>
  )
}

export default ReactBasics