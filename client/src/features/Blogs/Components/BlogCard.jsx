import React, { useEffect, useState } from "react";
import { concat, styles } from "../../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { imageA, imageB, imageC } from "../../../images";
import axios from "axios";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../../lib";
import CustomLink from "../../../utils/CustomLink";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { fetchTopics } from "../../../lib/GlobalApiCalls";
import { con, pipe, thumb, wave } from "../../../icons";
import { VscArrowSmallRight, VscMail } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import PreloaderCard from "./PreloaderCard";
import { VscChromeClose } from "react-icons/vsc";
function BlogCard({}) {
  const [blogs, setBlogs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  //  search params to extract the id

  let { blog_id } = useParams();

  // fetch topics

  const {
    isLoading: loadingTopics,
    data: topicsData,
    error: topicsError,
  } = useQuery({ queryKey: ["fetch_topics"], queryFn: fetchTopics });
  useEffect(() => {
    fetchTopics();
  }, []);


  // fetch blogs
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
  }, [blog_id]);
  const navigate = useNavigate();

  // handle filter open
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };
  console.log(loadingBlogs);

  return (
    <div className="relative ">
      <section className="relative z-10 pb-10">
        <h1 className="text-white hidden sm:grid text-3xl font-semibold text-center">
          Filters
        </h1>
        <div
          className={` ${styles.paragraph} relative  hidden  sm:flex justify-center gap  gap-x-10 `}
        >
          {topicsData?.data?.map((topic) => {
            return (
              <CustomLink key={topic.id} to={`/blogs/${topic.attributes.slug}`}>
                {" "}
                {topic.attributes.slug}
              </CustomLink>
            );
          })}
        </div>
        {/* small screen filter */}
        <button
          onClick={handleFilterOpen}
          className="text-dimWhite border text-xl flex place-items-center gap-3 sm:hidden px-2 py-1 rounded-2xl border-dimWhite cursor-pointer hover:text-blue-500 hover:border-blue-400 transition-colors"
        >
          <FaArrowDownShortWide />
          <p>filter</p>
        </button>
        <div
          className={`sm:hidden ${
            filterOpen ? "grid text-center " : "hidden"
          } absolute z-[20] bg-black-gradient sidebar rounded-xl top-12 px-3 py-5 w-[200px] min-h-[200px] `}
        >
          <button className="absolute top-2 right-2 size-7 cursor-pointer text-dimWhite " onClick={()=>setFilterOpen(!filterOpen)}><VscChromeClose /></button>
          {topicsData?.data?.map((topic) => (
            <CustomLink key={topic.id} to={`/blogs/${topic.attributes.slug}`} onClick={()=>setFilterOpen(false)}>
              {" "}
              {topic.attributes.topic}
            </CustomLink>
          ))}
        </div>
      </section>

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
                    className="  h-[250px]  w-full  rounded-t-xl object-fit"
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
      {!blogsData && !loadingBlogs && (
        <section className=" w-full min-h-[60vh] z-[5] relative  pb-20">
          <div className="grid place-items-center text-dimWhite gap-4 pt-10">
            <img src={thumb} alt="" className="h-[80px]" />
            <h1 className="uppercase text-xl sm:text-2xl">WE're Still</h1>
          </div>
          <div className="text-dimWhite grid place-items-center pt-10 font-poppins gap-4">
            <h1 className="sm:text-6xl font-bold text-4xl text-center text-blue-500">
              Cooking Our Website
            </h1>
            <p className={`${styles.paragraph}`}>
              The selected article will be available as soon very soon.
            </p>
            <p className={`${styles.paragraph}`}>Stay Tune</p>
            <button className=" relative flex shadow-2xl   shadow-blue-900  text-[20px] bg-blue-700  sm:py-2 py-1 px-5 cursor-pointer rounded-[2.4rem] items-center gap-7 ">
              {" "}
              <div className="border rounded-full p-2 ">
                <VscMail className="size-7" />
              </div>{" "}
              notify Me <VscArrowSmallRight className="size-7" />
            </button>
          </div>
          <div className="absolute top-[50%] -z-10 opacity-40 left-0">
            <img className=" w-[14rem]" src={wave} alt="" />
          </div>
          <div className="opacity-30 absolute right-0 -z-10 top-9">
            <img src={pipe} alt="" className="h-[4rem]" />
          </div>
          <div className="opacity-30 absolute left-0 -z-10 top-20">
            <img src={con} alt="" className="h-[4rem]" />
          </div>
        </section>
      )}
      {blogsData && (
        <div>
          {" "}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-80" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-60" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-85" />
        </div>
      )}
    </div>
  );
}

export default BlogCard;
