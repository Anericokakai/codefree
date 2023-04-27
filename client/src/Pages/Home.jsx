import React from "react";
import Navigation from "../components/Navigation";
import Reusablehome from "../components/Reusablehome";
import website from "../images/website.svg";
import question from "../images/question.svg";
import status500 from '../images/status500.svg'
import status200 from '../images/status200.svg'
import Footer from "../components/Footer";
function Home() {
  const infodetails = [
    {
      infoStart: "become the ",
      span: "Full Stuck Developer ",
      infoEnd: "you ever wished to be",
      src: website,
      reverse: false,
      key:1,
    },
    {
      infoStart: "Mastering ",
      span: " React,  Node.js, JavaScript  ",
      heading: "What is CodeFree all about ??",
      infoEnd: " in a simpler and efficient way ,Build real world projects",
      src: question,
      reverse: true,
      key:2,
    },
  
    {
      infoStart: "Start a free  plan ",
      heading: "New to Javascript ?",
      span: "Javascript",
      infoEnd:'    tutorial from  basics ',
      registerForm:true,
      key:3,
    },
    {
      infoStart: "Start your ",
      span: "  Node.js ",
      heading: "Ever wondered how node.js backend works ??",
      infoEnd: " free course today ",
      src: status500,
      reverse: true,
      redirect:true,
      key:4,
    },
    {
      infoStart: "Start your ",
      span: "React ",
      heading: " Still not figuring out how to create your first react app ??",
      infoEnd: " free course today ",
      src: status200,
      
      redirect:true,
      key:5,
    },
  ];
  return (
    <div>
      <Navigation></Navigation>
      {infodetails.map((child) => (
        <Reusablehome
          infoStart={child?.infoStart}
          span={child?.span}
          infoEnd={child?.infoEnd}
          src={child?.src}
          heading={child?.heading}
          reverse={child?.reverse}
          register={child?.registerForm}
          redirect={child?.redirect}
          key={child.key}
        ></Reusablehome>
      ))}
      <Footer></Footer>
    </div>
  );
}

export default Home;
