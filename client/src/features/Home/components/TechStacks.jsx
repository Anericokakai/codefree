import React from "react";
import { styles } from "../../../utils";
import { BlueGem, Diamond, GreenDiamond } from "../../../images";
import {FaNodeJs, FaReact} from 'react-icons/fa6'
import { SiSpring } from "react-icons/si";
function TechStacks() {
  const stacks = [
    {
      title: "React",
      src: FaReact,
      description:
        " React is one of the most common and easy to setup frame work to build a web application. We take a deep dive into react and its ecosystem to help you build your next project.",
    },
    {
      title: "Node.js",
      src: FaNodeJs,
      description:
        "Node.js is a powerful open source JavaScript runtime environment for backend development. We will explore all that is there to master in node js",
    },
    {
        title:"Spring Boot",
        src:SiSpring,
        description:"Spring Boot is a framework that helps you to build web application. We will explore all that is there to master in Spring Boot",
    }
  ];

  return (
    <div className="px-2">
      <h1
        className={`sm:text-[40px] text-[30px] text-center text-white font-poppins font-bold`}
      >
        <i className="fa-solid fa-star-half-stroke"></i> Tech
        <span className="text-gradient-violet px-3">Stacks 🎉</span>
      </h1>
      <div className="flex  justify-center items-center py-7 z-[5]">
        <div
          className={`max-w-[500px] z-[5] sm:max-w-[700px] text-left bg-black-gradient-2 rounded-2xl px-4 py-2 min-h-[200px] ${styles.flexCenter}`}
        >
          <p className={`${styles.paragraph} `}>
            Codefree covers most the technologies that are used in{" "}
            <span className="text-white font-bold text-xl px-2">
              front end and back end development
            </span>
            . We take time to cover the complexity of most of the technologies
            and frame works
          </p>
        </div>
      </div>
      <div className=" grid  gap-3 xs:grid-cols-2 sm:grid-cols-3">
    
        {
            stacks.map((stack,index)=>(
                <div key={index} className="flex justify-center items-center py-7 z-[5]">
                <div
                  className={`max-w-[500px] z-[5]  text-left bg-black-gradient-2 rounded-2xl px-4 py-2  min-h-[350px] ${styles.flexCenter}`}
                >
                  <div className="flex flex-col items-center">
              {
                React.createElement(stack.src,{
                  className:"text-white text-7xl"
                })
              }
                    <h1 className="text-white font-bold text-xl px-2">{stack.title}</h1>
                    <p className={`${styles.paragraph} `}>{stack.description}</p>
                        
                        
                  </div>
                </div>
              </div>
                
                
                )
            )
        }
      </div>
    </div>
  );
}

export default TechStacks;
