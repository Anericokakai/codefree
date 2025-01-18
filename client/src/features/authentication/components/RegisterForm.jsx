import React, { useState } from "react";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import { styles } from "../../../utils";
import { VscAccount, VscLock, VscMail } from "react-icons/vsc";
import { useQuery } from "@tanstack/react-query";
function RegisterForm({ setShowLogin, login, changeLoginState }) {
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  // ! handle focus and blur functions
  const handleFocus = (e) => {
    setFocus({
      ...focus,
      [e.target.name]: true,
    });
  };
  // ! handle blur
  const handleBlur = (e) => {
    setFocus({
      ...focus,
      [e.target.name]: false,
    });
  };
  console.log(formInputs);

  //   ! handle form changes
  const handleInputChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    setFormInputs({
      ...formInputs,
      [name]: val,
    });
  };
  //   submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login) {
      const submit = useQuery({ queryKey: "regitster" });
      console.log(submit);
    }
  };

  handleSubmit();

  return (
    <article className="border relative border-slate-900 w-[100%] bg-[#020617] max-w-[488px] rounded-xl py-10 grid gap-7  px-4">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-3 right-3 p-1 rounded-full  hover:bg-slate-800"
      >
        <HiXMark className="size-7" />
      </button>

      <h1 className="font-semibold  text-left text-white   text-[24px] ">
        {login ? "Sing in" : "Sing up"}
      </h1>
      <p className={`text-[1.125rem]`}>
        Sign up to code free for a better experience
      </p>

      {/*  input forms */}
      <form action="" className="grid gap-5">
        {!login && (
          <div
            className={` ${
              focus.name ? "border-blue-500" : "border-slate-700"
            } flex border items-center gap-2  rounded-xl px-3 py-1`}
          >
            <label htmlFor="name">
              {" "}
              <VscAccount className="size-6" />
            </label>
            <input
              onFocus={handleFocus}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full outline-none bg-transparent py-2 ${styles.paragraph}`}
              type="text"
              id="name"
              placeholder="John Doe"
              name="name"
            />
          </div>
        )}
        <div
          className={` ${
            focus.email ? "border-blue-500" : "border-slate-700"
          } flex border items-center gap-2  rounded-xl px-3 py-1`}
        >
          <label htmlFor="email">
            {" "}
            <VscMail className="size-6" />
          </label>
          <input
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full outline-none bg-transparent py-2 ${styles.paragraph}`}
            type="text"
            id="email"
            placeholder="John Doe"
            name="email"
          />
        </div>
        <div
          className={` ${
            focus.password ? "border-blue-500" : "border-slate-700"
          } flex border items-center gap-2  rounded-xl px-3 py-1`}
        >
          <label htmlFor="password">
            {" "}
            <VscLock className="size-6" />
          </label>
          <input
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full outline-none bg-transparent py-2 ${styles.paragraph}`}
            type="text"
            id="password"
            placeholder="John Doe"
            name="password"
          />
        </div>
      </form>
      <button className=" grid items-center    text-[20px] rounded-2xl mt-5  relative">
        <div className=" absolute  bg-gradient-to-tr from-violet-700 to-pink-600 -inset-0 rounded-3xl h-full  blur-sm opacity-75 animate-tilt"></div>
        <div className="relative  flex justify-center gap-5  items-center w-full rounded-3xl h-full bg-[#0d37f1] py-2 ">
          {login ? "Login" : "sign up"} to code free{" "}
          <FaPersonWalkingArrowRight className="size-6" />
        </div>
      </button>
      <p className="text-[1.12rem]">
        {!login ? "Already " : " Don't "}have an account ?{" "}
        <button
          onClick={() => changeLoginState(!login)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {!login ? "Login here" : "Sing up here"}
        </button>
      </p>
      <div>
        <p className="text-[1.12rem]">
          Login to <span className="text-blue-500">code free</span> to like
          bookmark and keep track of your progress{" "}
        </p>
      </div>
    </article>
  );
}

export default RegisterForm;
