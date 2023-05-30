import React from "react";
import { useSelector } from "react-redux";
import BlogReusable from "../../../../components/home/BlogReusable";
import { redirectToLogin } from "../../../../controllers/redirects";

function JavascriptSyntax() {
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );
  console.log(token, refreshToken);
  // if user is not loged in  redirect him to log in page
  if (token === "" || refreshToken === "") {
    redirectToLogin();
  }
  return (
    <div>
      <h1>Javascript</h1>
      <BlogReusable api="https://codefreeblogs.onrender.com/api/javascript_tutorials"></BlogReusable>
    </div>
  );
}

export default JavascriptSyntax;
