import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../features/UsersSlice";
import { useDispatch } from "react-redux";
import { FaXmark } from "react-icons/fa6";
function NavigationComponent() {
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
  const dispatch = useDispatch();
  // hold state to toggle login and out

  const { token } = useSelector((store) => store.userInfo);
  const [prevLocation, setPrevLocation] = useState(window.scrollY);
  const [showNav, setShowNav] = useState(false);
  const [showOnscroll, setShowOnScroll] = useState(false);
  const displayNav = () => {
    setShowNav(!showNav)
  };

  // hide and show on scroll
  const handleScrollY = () => {
    const currentPosition = window.scrollY;
    
    if (window.scrollY > 100 && currentPosition > prevLocation) {
      setShowOnScroll(true);
    } else {
      setShowOnScroll(false);
    }
    setPrevLocation(currentPosition);
  };
  // logout the user
  const logout = () => {
    dispatch(Logout());
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [prevLocation]);
  return (
    <div className="bg-primary relative">
      <nav
        className={`navigation  relative  text-dimWhite font-poppins text-[1.2rem]  z-100 bg-opacity-50 backdrop-blur-sm  ${
          showOnscroll && "sticky bg-[#0f172a8f] top-0"
        }`}
      >
        <div className="logo">
          <div className="logoimage">
            <img src={logo} alt="" />
          </div>
        </div>
        <button onClick={displayNav} className="bars z-50 ">
          <i  className="fa-solid fa-bars "></i>
        </button>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <Link to={`/${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul
        className={` ${showNav ? "fixed" : "hidden"} sm:hidden  py-7  z-[50] text-white font-poppins text-[1.2rem] top-1 right-2 bg-black-gradient px-5 grid gap-5 rounded-xl w-[200px] place-items-center sidebar`}
      >
        <button className="absolute top-3 right-3 hover:text-blue-500">
          <FaXmark onClick={displayNav} />
        </button>
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link to={`/${link.id}`}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationComponent;
