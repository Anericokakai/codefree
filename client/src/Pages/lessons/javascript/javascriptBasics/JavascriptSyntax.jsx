import React from 'react'
import BlogReusable from '../../../../components/home/BlogReusable'

function JavascriptSyntax() {
  return (
    <div>
      <h1>Javascript</h1>
      <BlogReusable api='http://localhost:8000/api/javascript_tutorials'></BlogReusable>
    </div>
  )
}

export default JavascriptSyntax