import React from "react";

import Reusablehome from "../../../components/Reusablehome";

import Footer from "../../../components/Footer";
import NavigationComponent from "../../../components/NavigationComponent";
import { question, status200, status500, website } from "../../../images";
import styles from "../../../utils/styles";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import IntroToCodeFree from "../components/IntroToCodeFree";
import RecentBlogs from "../components/RecentBlogs";
import TechStacks from "../components/TechStacks";
function Home() {
  const infodetails = [
    {
      infoStart: "become the ",
      span: "Full Stuck Developer ",
      infoEnd: "you ever wished to be",
      src: website,
      reverse: false,
      key: 1,
    },
    {
      infoStart: "Mastering ",
      span: " React,  Node.js, JavaScript  ",
      heading: "What is CodeFree all about ??",
      infoEnd: " in a simpler and efficient way ,Build real world projects",
      src: question,
      reverse: true,
      key: 2,
    },

    {
      infoStart: "Start a free  plan ",
      heading: "New to Javascript ?",
      span: "Javascript",
      infoEnd: "    tutorial from  basics ",
      registerForm: true,
      key: 3,
    },
    {
      infoStart: "Start your ",
      span: "  Node.js ",
      heading: "Ever wondered how node.js backend works ??",
      infoEnd: " free course today ",
      src: status500,
      reverse: true,
      redirect: true,
      key: 4,
    },
    {
      infoStart: "Start your ",
      span: "React ",
      heading: " Still not figuring out how to create your first react app ??",
      infoEnd: " free course today ",
      src: status200,

      redirect: true,
      key: 5,
    },
  ];
  // {infodetails.map((child) => (
  //   <Reusablehome
  //     infoStart={child?.infoStart}
  //     span={child?.span}
  //     infoEnd={child?.infoEnd}
  //     src={child?.src}
  //     heading={child?.heading}
  //     reverse={child?.reverse}
  //     register={child?.registerForm}
  //     redirect={child?.redirect}
  //     key={child.key}
  //   ></Reusablehome>
  // ))}
  return (
    <div className="bg-primary overflow-hidden w-full  min-h-screen">
      <div className=" grid place-items-center">
      <div className={`${styles.boxWidth} flex items-center'`}>
        <Nav />
        </div>
      </div>
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
