import React from "react";
import RegisterForm from "./RegisterForm";
function Reusablehome({ infoStart, infoEnd, span, src, heading, reverse,register,redirect }) {
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
          {redirect && <button className="submit"> start  here </button>}
        </div>
        <div className="illastrator">{src && <img src={src} alt="" />}
        { register && <RegisterForm/>}
        </div>
      </div>
    </div>
  );
}

export default Reusablehome;
