import React from "react";
import { useSelector } from "react-redux";
import BlogReusable from "../../../../components/home/BlogReusable";
import NavigationComponent from "../../../../components/NavigationComponent";
import ReusableHeading from "../../../../components/ReusableHeading";
import { redirectToLogin } from "../../../../controllers/redirects";
function GitSyntax() {
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
      <NavigationComponent />
      <ReusableHeading heading="Git And GitHub" />
      <BlogReusable course="github"/>
    </div>
  );
}

export default GitSyntax;
