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
function BlogCard({}) {
  const [blogs, setBlogs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  //  search params to extract the id

  let { blog_id } = useParams();

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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs(blog_id, q),
  });
  

  useEffect(() => {
  
    fetchBlogs(blog_id, q);
  }, [blog_id]);
  const navigate = useNavigate();

  const categories = [
    {
      cat: "Front end",
      id: 1,
    },
    {
      cat: "Backend",
      id: 2,
    },
    {
      cat: "Spring Boot",
      id: 3,
    },
    {
      cat: "Microservices",
      id: 4,
    },
    {
      cat: "Js Tricks",
      id: 5,
    },
  ];

  // handle filter open
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };
  
  return (
    <div className="relative ">
      <section className="relative z-10 pb-10">
        <h1 className="text-white hidden sm:grid text-3xl font-semibold text-center">
          Filters
        </h1>
        <div
          className={` ${styles.paragraph} relative  hidden  sm:flex justify-center gap  gap-x-10 `}
        >
          {categories?.map((cat, i) => (
            <CustomLink key={i} to={`/blogs/${cat.id}`}>
              {" "}
              {cat.cat}
            </CustomLink>
          ))}
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
          } absolute z-[20] bg-black-gradient sidebar rounded-xl top-12 px-3 py-5 `}
        >
          {categories?.map((cat, i) => (
            <CustomLink key={i} to={`/blogs/${cat.id}`}>
              {" "}
              {cat.cat}
            </CustomLink>
          ))}
        </div>
      </section>
      <article className="grid   relative z-[5] xs:grid-cols-2 sm:grid-cols-3  gap-4">
        {data?.data?.map((blog, index) => (
          <div
            onClick={() => {
              navigate(
                `/blogs/${blog_id}/${blog?.attributes?.slug}`,
                {
                  replace: false,
                }
              );
            }}
            key={index}
            className="  cursor-pointer  relative  bg-primary grid gap-4  rounded-xl border border-slate-700"
          >
            <div className="relative">
              <div className="bg-black-gradient rounded-t-xl   h-[250px] grid place-items-center">
                <img
                  src={blog?.attributes?.image?.data?.attributes?.formats?.small?.url}
                  className="  h-[250px]  w-full  rounded-t-xl object-cover"
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
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-80" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-60" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-85" />
    </div>
  );
}

export default BlogCard;
