import React, { useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { logo } from "../../../images";
import styles from "../../../utils/styles";
function Nav() {
  const [IsNavOpen, setIsNavOpen] = useState(false);
  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  const toggleMenu = () => {
    setIsNavOpen(!IsNavOpen);
  };
  return (
    <nav className="w-full flex  relative z-[30] justify-between items-center navbar px-4 ">
      <h1 className="font-extrabold text-3xl text-gradient">CodeFree</h1>

      <ul className=" list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((item, idx) => {
          return (
            <li
              key={item.id}
              className={`font-poppins font-normal text-[19px]  cursor-pointer hover:text-red-600 text-white  ${
                idx === navLinks.length - 1 ? "mr-0" : "mr-10"
              }`}
            >
              <a href={`#${item.id}`} className="text-dimWhite hover:text-[#7f4ca5] cursor-pointer "> {item.title}</a>
            </li>
          );
        })}
      </ul>

      {/* small screen navigation */}
      <div className=" flex flex-1 justify-end items-center sm:hidden">
        {IsNavOpen ? (
          <button onClick={toggleMenu}>
            <FaXmark className="text-[#7f4ca5] size-7" />
          </button>
        ) : (
          <button onClick={toggleMenu}>
            <FaBarsStaggered className="text-[#7f4ca5]  size-7" />
          </button>
        )}

        {/* <img

        src={IsNavOpen ? close : menu}
        className={`w-[20px] h-[20px] object-contain cursor-pointer `}

      /> */}
        {/*
      ! small screen navigation  */}
        <div
          className={`${
            IsNavOpen ? "flex" : "hidden"
          } p-6 absolute bg-black-gradient top-20 right-3  min-w-[200px]  text-center rounded-xl sidebar z-[15] `}
        >
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            {navLinks.map((item, index) => (
              <li key={index} className="font-poppins py-5  px-5 t">
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`${styles.paragraph} hover:text-[#7f4ca5]`}
                >
                  {" "}
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
