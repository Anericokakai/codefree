import React from "react";
import RegisterForm from "./RegisterForm";
import { useSelector } from "react-redux";

function Reusablehome({
  infoStart,
  infoEnd,
  span,
  src,
  heading,
  reverse,
  register,
  redirect,
}) {
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );

  const handleredirect = () => {
   if(userName===''&&(token===''||refreshToken==='')){
    return  window.location.href='/login'
   }
   return window.location.href='/login/lessonsHome'
  };
  return (
    <div className="general-container">
      <h1>{heading}</h1>
      <div className={`container  ${reverse === true ? "reverse " : ""}`}>
        <div className="information">
          <h1>
            {infoStart}
            {span !== "" && <span className="stack-span">{span}</span>}
            {infoEnd}
          </h1>
          {redirect && (
            <button className="submit" onClick={handleredirect}>
              
              start here
            </button>
          )}
        </div>
        <div className="illastrator">
          {src && <img src={src} alt="" />}
          {register && <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default Reusablehome;
