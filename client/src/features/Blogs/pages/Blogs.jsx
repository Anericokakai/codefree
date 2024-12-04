import React, { useEffect, useState } from "react";

import { styles } from "../../../utils";
import { Outlet } from "react-router-dom";

function Blogs() {
    const [focus, setFocus] = useState(false);
    const [query, setQuery] = useState("");
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
        "How to meditate for beginners",
    ];

    //  ! handke change
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    const handleFocus = () => {
        if (query.length < 0) return
        setFocus(true);
    };
    const handleBlur = () => {
        setFocus(false);
    };
    useEffect(() => {

        window.scrollTo(0, 0);


    }, [])

    return (
        <div className={`bg-primary min-h-[100vh] grid font-poppins  justify-center px-2`}>
            <section className={`${styles.boxWidth} relative`}>
                <header className="mt-7 mb-20 grid place-items-center">
                    <section className="   bg-black-gradient text-dimWhite sm:min-h-[11rem] min-h-[9rem] rounded-xl  grid place-items-center max-w-[60rem] md:min-w-[60rem] sm:min-w-[45rem] relative w-full ">
                        <div className=" bg-gradient-to-r from-purple-600 to-pink-500  absolute -inset-0  rounded-2xl  blur-sm opacity-50 animate-tilt "></div>
                        <div className="bg-primary  relative h-full sm:px-4 px-2 grid  place-items-center rounded-2xl w-[100%]">
                            <h1 className="font-bold sm:text-5xl text-3xl text-white ">
                                <span className="text-gradient-blue">Code Free</span> developer
                                blogs
                            </h1>
                        </div>
                        <div className="absolute sm:-bottom-6 -bottom-7 w-[90%] bg-[#242c38]  flex rounded-xl ">
                            <div className="flex w-full rounded-xl border border-slate-700 relative">
                                <input
                                    onChange={handleChange}
                                    type="text "
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="w-full bg-transparent text-[1.4rem] px-5 focus:outline-none xs:py-[0.6rem]  py-2"
                                />
                                <button className="xs:text-2xl  font-medium xs:px-6 w-[10rem]  rounded-xl bg-blue-500 text-dimWhite">
                                    search
                                </button>
                                <div className={` ${focus ? "block" : "hidden"} absolute border w-full top-[4rem]  xs:top-[5rem] max-h-[20rem] overflow-y-scroll  min-h-[15rem] z-20 bg-[#242c38] rounded-xl border-slate-600`}>
                                    {searchResults.map((item, index) => {
                                        return (
                                            <div className="flex p-2 hover:bg-[#434a57] cursor-pointer " key={index}>
                                                <p className={`${styles.paragraph} text-[1.125rem] sm:text-[1.2rem] `}>{item}</p>
                                            </div>
                                        );
                                    })}
                                    <div></div>
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
