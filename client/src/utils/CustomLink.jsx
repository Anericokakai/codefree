import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles";

function CustomLink(props) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "text-blue-500  font-medium text-xl hover:text-blue-500" : `${styles.paragraph} font-medium text-xl hover:text-blue-500`
      }
    {...props} end/>
  );
}

export default CustomLink;
