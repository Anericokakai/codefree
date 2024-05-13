import React from "react";
import { imageA, imageB, imageC } from "../../../images";
import styles from "../../../utils/styles";
import { concat } from "../../../utils";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

function RecentBlogs() {
  const blogs = [
    {
      title: "How to master the art of coding",
      description:
        "Becoming a developer and becoming a good developer are two different things. To become good at software development, you need to understand the basic of the language you are going to use",
      image: imageA,
    },
    {
      title: "How to master the art of coding",
      description:
        "Becoming a developer and becoming a good developer are two different things. To become good at software development, you need to understand the basic of the language you are going to use",
      image: imageB,
    },
    {
      title: "How to master the art of coding",
      description:
        "Becoming a developer and becoming a good developer are two different things. To become good at software development, you need to understand the basic of the language you are going to use",
      image: imageC,
    },
  ];

  return (
    <div className="relative px-2">
      <header className=" grid  place-items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white">
          Recent <span className="text-gradient-blue">Blogs </span>
        </h1>
        <p className="text-xl text-dimWhite py-3">
          Most Read blogs on codefree
        </p>
      </header>

      <article className="grid   relative z-[100] xs:grid-cols-2 sm:grid-cols-3  gap-4">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="   relative bg-primary grid gap-4  rounded-xl"
          >
            {/* <div className="absolute bg-gradient-to-b  blur-sm  from-purple-600 to-pink-600 inset-0 opacity-40 animate-tilt rounded-xl"></div> */}
            <div className="relative">
              <div className="bg-black-gradient rounded-t-xl   h-[250px] grid place-items-center">
                <img
                  src={blog.image}
                  className="  h-[250px] aspect-square rounded-xl"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center px-2 pt-2 bg-primary rounded-b-xl">
                <h1 className="text-2xl font-bold text-white">{blog.title}</h1>
                <p className={`${styles.paragraph} pt-3`}>
                  {concat(blog.description, 100)}
                </p>
                <Link className=" text-blue-600 font-medium pb-4 hover:text-purple-400  "> Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </article>

      <div className=" grid place-items-end py-10 pr-10 relative">
        <button className=" flex items-center  justify-center gap-3     rounded-xl relative group">
          <div className="absolute bg-gradient-to-r from-purple-600  animate-tilt blur-sm to-pink-600 inset-0 rounded-xl opacity-70 duration-1000 group-hover:duration-200 group-hover:opacity-100">
            
          </div>
          <div className="relative bg-primary py-2 px-7 rounded-xl w-full h-full flex items-center justify-center divide-x-2 divide-dimWhite">
            <span className=" text-blue-600 font-semibold text-[1.1rem] px-2">Read More</span>
            <SlArrowRight className="text-[#7f4ca5] size-6 mx-2" />
          </div>
        </button>
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
  );
}

export default RecentBlogs;
