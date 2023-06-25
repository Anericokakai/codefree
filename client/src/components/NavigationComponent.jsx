import React, { useEffect, useState } from "react";
import logo from '../images/logo.png'
import {  Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../features/UsersSlice";
import { useDispatch } from "react-redux";
function NavigationComponent() {
  const dispatch = useDispatch();
  // hold state to toggle login and out
  
  const { token,  } = useSelector(
    (store) => store.userInfo
  );

  const [shownav, setshownav] = useState(false);
  const [showOnscroll, setshowonscroll] = useState(false);
  const displayNav = () => {
    shownav ? setshownav(false) : setshownav(true);
  };


  // hide and show on scroll
  const handleScrollY = () => {
    if (window.scrollY > 100) {
     
      setshowonscroll(true);
     
    } else {
      setshowonscroll(false);
    }
  };
  // logout the user
  const logout=()=>{
    dispatch(Logout())
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);
  return (
    <div>
      <nav className={`navigation ${showOnscroll && "sticky"}`}>
        <div className="logo">
          <div className="logoimage">
            <img src={logo} alt="" />
          </div>
          
        </div>
        <div className="bars">
          <i onClick={displayNav} class="fa-solid fa-bars"></i>
        </div>
        <ul>
          <li>
            <Link to={"/login/lessonsHome"}>Home </Link>{" "}
          </li>
          <li>
            <Link to={"/login/lessonsHome"}>Lessons </Link>{" "}
          </li>
          <li>
            <Link>premium </Link>
          </li>
          {token === "" && (
          <li>
            <Link to={'/login'}>Login </Link>
          </li>
        )}
              <li>{token !== "" && <Link onClick={logout}>Logout </Link>}</li>
        </ul>
      </nav>
      <ul className={`smallnav ${shownav && "show"} `}>
        <i onClick={displayNav} class="fa-solid fa-xmark"></i>

        <li>
          <Link to={"/login/lessonsHome"}>Home </Link>{" "}
        </li>
        <li>
          <Link to={"/login/lessonsHome"}>Lessons </Link>{" "}
        </li>
        <li>
          <Link>premium </Link>{" "}
        </li>
        {token === "" && (
          <li>
            <Link to={'/login'}>Login </Link>
          </li>
        )}
        <li>{token !== "" && <Link onClick={logout}>Logout </Link>}</li>
      </ul>
    </div>
  );
}

export default NavigationComponent;
