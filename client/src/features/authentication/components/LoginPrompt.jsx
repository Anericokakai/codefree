import React, { useState } from "react";
import { userIcon } from "../../../icons";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import RegisterForm from "./RegisterForm";
function LoginPrompt({ setShowLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const [login, changeLoginState] = useState(false);
  return (
    <div className="fixed inset-0 grid place-items-center  font-poppins  bg-[#0f172a8f]  z-[20] backdrop-blur-sm sm:px-[13px] px-[9px]">
      {showRegister ? (
        <RegisterForm
          setShowLogin={setShowLogin}
          changeLoginState={changeLoginState}
          login={login}
        />
      ) : (
        <article className="border relative border-slate-900 w-[100%] bg-[#020617] max-w-[488px] rounded-xl py-10 grid gap-7  px-4">
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-3 right-3 p-1 rounded-full  hover:bg-slate-800"
          >
            <HiXMark className="size-7" />
          </button>
          <div className="grid place-items-center sm:pt-12 ">
            <img
              src={userIcon}
              alt=""
              className="sm:w-[130px] w-[120px] bg-slate-700 rounded-full"
            />
          </div>
          <h1 className="font-semibold  text-white  text-center text-[24px] ">
            {" "}
            hello, Please Login to interact{" "}
          </h1>

          <button onClick={()=>setShowRegister(true)} className=" grid items-center    text-[20px] rounded-2xl mt-5  relative">
            <div className=" absolute  bg-gradient-to-tr from-violet-700 to-pink-600 -inset-0 rounded-3xl h-full  blur-sm opacity-75 animate-tilt"></div>
            <div className="relative  flex justify-center gap-5  items-center w-full rounded-3xl h-full bg-[#0d37f1] py-2 ">
              sign in to code free{" "}
              <FaPersonWalkingArrowRight className="size-8" />
            </div>
          </button>
          <div>
            <p className="text-[1.2rem]">
              Login to <span className="text-blue-500">code free</span> to like
              bookmark and keep track of your progress{" "}
            </p>
          </div>
        </article>
      )}
    </div>
  );
}

export default LoginPrompt;
