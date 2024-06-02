import React, { useEffect } from "react";
import { imageA, imageB, imageC } from "../../../images";
import styles from "../../../utils/styles";
import { concat } from "../../../utils";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import PreloaderCard from "../../Blogs/Components/PreloaderCard";
import { fetchBlogs } from "../../../lib";
import { useQuery } from "@tanstack/react-query";
import qs from 'qs'
function RecentBlogs() {
  const blog_id="spring-boots"
  const q = qs.stringify(
    {
      fields: ["title", "description", "slug", "createdAt", "author"],
      populate: {
        image: {
          fields: ["url", "formats"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const {
    data: blogsData,
    isLoading: loadingBlogs,
    error: blogError,
  } = useQuery({
    queryKey: ["blogs", blog_id, q],
    queryFn: () => fetchBlogs(blog_id, q),
  retry:2 });

  useEffect(() => {
    console.log("effect is runnign");
    fetchBlogs(blog_id, q);
  }, []);

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
      {blogsData && !loadingBlogs && (
        <article className="grid   relative z-[5] xs:grid-cols-2 sm:grid-cols-3   gap-4">
          {blogsData?.data?.map((blog, index) => (
            <div
              onClick={() => {
                navigate(`/blogs/${blog_id}/${blog?.attributes?.slug}`, {
                  replace: false,
                });
              }}
              key={index}
              className="  cursor-pointer  relative  bg-primary grid gap-4  rounded-xl border border-slate-700"
            >
              <div className="relative">
                <div className="bg-black-gradient rounded-t-xl   h-[250px] grid place-items-center">
                  <img
                    src={
                      blog?.attributes?.image?.data?.attributes?.formats?.small
                        ?.url
                    }
                    className="  h-[250px]    rounded-t-xl object-fit"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center px-2 pt-2 bg-primary rounded-b-xl">
                  <h1 className="text-2xl font-bold text-white">
                    {blog?.attributes?.Title}
                  </h1>
                  <p className={`${styles.paragraph} pt-3`}>
                    {concat(blog?.attributes?.description, 100)}
                  </p>
                  <Link
                    to={`/blogs/${blog_id}/${blog?.attributes?.slug}`}
                    className=" text-blue-600 font-medium  hover:text-purple-400  "
                  >
                    {" "}
                    Read More
                  </Link>
                  <p className="text-dimWhite pb-3">
                    Author: {blog?.attributes?.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </article>
      )}
      {loadingBlogs && <PreloaderCard />}

      <div className=" grid place-items-end py-10 pr-10 relative">
        <button className=" flex items-center  justify-center gap-3     rounded-xl relative group">
          <div className="absolute bg-gradient-to-r from-purple-600  animate-tilt blur-sm to-pink-600 inset-0 rounded-xl opacity-70 duration-1000 group-hover:duration-200 group-hover:opacity-100">
            
          </div>
          <Link to={'/blogs/nodejs-blogs'} className="relative bg-primary py-2 px-7 rounded-xl w-full h-full flex items-center justify-center divide-x-2 divide-dimWhite">
            <span className=" text-blue-600 font-semibold text-[1.1rem] px-2">Read More</span>
            <SlArrowRight className="text-[#7f4ca5] size-6 mx-2" />
          </Link>
        </button>
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
  );
}

export default RecentBlogs;
