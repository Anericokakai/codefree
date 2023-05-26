import React from 'react'
import { useSelector } from 'react-redux';
import BlogReusable from '../../../../components/home/BlogReusable'
import { redirectToLogin } from '../../../../controllers/redirects';

function ReactBasics() {
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );
  console.log(token,refreshToken)
  // if user is not loged in  redirect him to log in page
  if (token === "" || refreshToken === "") {
    redirectToLogin();
  }
  return (
    <div>
      <h1>react</h1>
      <BlogReusable api='https://codefreeblogs.onrender.com/api/react_tutorials'></BlogReusable>
    </div>
  )
}

export default ReactBasics