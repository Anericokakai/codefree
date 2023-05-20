import React from 'react'
import BlogReusable from '../../../../components/home/BlogReusable'

function NodejsSyntax() {
  return (
    <div>
      <h1>Nodejs for Backend</h1>
      <BlogReusable api='http://localhost:8000/api/nodejs_tutorials'></BlogReusable>

    </div>
  )
}

export default NodejsSyntax