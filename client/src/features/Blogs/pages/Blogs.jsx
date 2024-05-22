import React, { useEffect, useState } from "react";

import {  styles } from "../../../utils";
import {  Outlet } from "react-router-dom";
import qs from 'qs'
import CustomLink from "../../../utils/CustomLink";
import { FaArrowDownShortWide } from "react-icons/fa6"

function Blogs() {
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState('')
  const searchResults = [
    "How to learn JavaScript quickly",
    "How to bake a cake",
    "How to improve your public speaking skills",
    "How to fix a leaking faucet",
    "How to train a puppy",
    "How to write a resume",
    "How to lose weight healthily",
    "How to build a website",
    "How to save money effectively",
    "How to meditate for beginners"
  ];
  
 
  return (
    <div className={`bg-primary min-h-[100vh] grid  justify-center px-2`}>
      <section className={`${styles.boxWidth} relative`}>
        <header className="mt-7 mb-20 grid place-content-center">
          <section className="  bg-black-gradient text-dimWhite sm:min-h-[11rem] min-h-[9rem] rounded-xl  grid place-items-center max-w-[60rem] md:min-w-[60rem] sm:min-w-[45rem] relative ">
            <div className=" bg-gradient-to-r from-purple-600 to-pink-500 absolute -inset-0  rounded-2xl  blur-sm opacity-50 animate-tilt "></div>
            <div className="bg-primary relative h-full sm:px-4 px-2 grid place-content-center rounded-2xl w-full">
              <h1 className="font-bold sm:text-5xl text-3xl ">
                <span className="text-gradient-blue">Code Free</span> developer
                blogs
              </h1>
            </div>
            <div className="absolute sm:-bottom-6 -bottom-7 w-[90%] bg-[#242c38]  flex rounded-xl ">
             <div className="flex w-full rounded-xl border border-slate-700 relative">
             <input
                type="text "
                className="w-full bg-transparent text-[1.4rem] px-5 xs:py-4  py-2"
              />
              <button className="xs:text-2xl  font-medium xs:px-6 w-[10rem]  rounded-xl bg-blue-500 text-dimWhite">
                search
              </button>
              <div className="absolute border w-full  xs:top-[5rem] max-h-[20rem] overflow-y-scroll  min-h-[15rem] z-20 bg-[#242c38] rounded-xl border-slate-600">
{
  searchResults.map((item,index)=>{
    return(
      <div className="flex p-2" key={index}>  

      <p>{item}</p> 

      </div>
    )
  })
}
<div>

</div>
              </div>
             </div>
            </div>
          </section>
        </header>
        {/* category filters */}
       
       
        <div className=" mt-10 ">
        <Outlet />
        </div>
      </section>
    </div>
  );
}

export default Blogs;
