import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

function NavigationComponent() {
  const navLinks = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "#",
      title: "About",
    },
    {
      id: "/blogs/spring-boots",
      title: "Blogs",
    },
    {
      id: "#",
      title: "Contact",
    },
  ];
  // hold state to toggle login and out

  const [prevLocation, setPrevLocation] = useState(window.scrollY);
  const [showNav, setShowNav] = useState(false);
  const [showOnscroll, setShowOnScroll] = useState(false);
  const displayNav = () => {
    setShowNav(!showNav);
  };

  // hide and show on scroll
  const handleScrollY = () => {
    const currentPosition = window.scrollY;

    if (window.scrollY > 100) {
      setShowOnScroll(true);
    } else {
      setShowOnScroll(false);
    }
    setPrevLocation(currentPosition);
  };
  // logout the user

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [prevLocation]);
  return (
    <div className="bg-primary relative">
      <nav
        className={`navigation   relative  text-dimWhite font-poppins text-[1.2rem]  z-[10]  bg-opacity-50 backdrop-blur-sm  ${
          showOnscroll && "sticky topbar  bg-[#0f172a8f] top-0"
        }`}
      >
        <div className="logo">
          <div className="logoimage">
            <img src={logo} alt="" />
          </div>
        </div>
        <button onClick={displayNav} className="bars z-50 ">
          <FaBarsStaggered />
        </button>
        <ul>
          {navLinks.map((link, i) => (
            <li key={i} className="hidden sm:block">
              <Link to={`${link.id}`}>{link.title}</Link>
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
        {navLinks.map((link, i) => (
          <li key={i}>
            <Link to={`${link.id}`}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationComponent;
