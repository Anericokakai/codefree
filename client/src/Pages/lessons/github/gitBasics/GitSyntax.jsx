import React from 'react'
import BlogReusable from '../../../../components/home/BlogReusable'
import NavigationComponent from '../../../../components/NavigationComponent'
function GitSyntax() {
  return (
    <div>
      <NavigationComponent></NavigationComponent>
     <BlogReusable api='http://localhost:8000/api/git_tutorials'></BlogReusable>
    </div>
  )
}

export default GitSyntax