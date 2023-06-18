import React from "react";
import { useSelector } from "react-redux";
import BlogReusable from "../../../../components/home/BlogReusable";
import NavigationComponent from "../../../../components/NavigationComponent";
import ReusableHeading from "../../../../components/ReusableHeading";
import { redirectToLogin } from "../../../../controllers/redirects";

function NodejsSyntax() {
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );
  console.log(token, refreshToken);
  // if user is not loged in  redirect him to log in page
  // if (token === "" || refreshToken === "") {
  //   redirectToLogin();
  // }
  return (
    <div>
      <NavigationComponent></NavigationComponent>
      <ReusableHeading heading="Nodejs Backend"></ReusableHeading>
      <BlogReusable api="http://localhost:8000/api/nodejs_tutorials" course="Node js"></BlogReusable>
    </div>
  );
}

export default NodejsSyntax;
