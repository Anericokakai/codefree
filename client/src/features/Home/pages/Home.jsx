
import React from "react";


import { question, status200, status500, website } from "../../../images";
import styles from "../../../utils/styles";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import IntroToCodeFree from "../components/IntroToCodeFree";
import RecentBlogs from "../components/RecentBlogs";
import TechStacks from "../components/TechStacks";
import NavigationComponent from "../../../components/NavigationComponent";
function Home() {
 

  return (
    <div className="bg-primary overflow-hidden w-full font-poppins  min-h-screen ">
      <NavigationComponent />
      
      <div className={`bg-primary  ${styles.flexStart}`}>
        
        <div className={` ${styles.boxWidth} py-9`}>
         
          <Hero />
          <IntroToCodeFree />
          <RecentBlogs/>
          <TechStacks/>
        </div>
      </div>
      {/* <NavigationComponent></NavigationComponent> */}

      {/* <Footer></Footer> */}
    </div>
  );
}

export default Home;
