import React, { useEffect } from "react";
import { concat, styles } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import { fetchBlogs } from "../../../lib";
import { useQuery } from "@tanstack/react-query";

function RelatedBlogs({ categories, blog_id, id, currentBlog }) {
  const navigate = useNavigate();
  let filters;
  if (categories?.length > 0) {
    filters = {
      $or: categories?.map((cat) => ({
        categories: {
          category_name: {
            $eq: cat?.attributes?.category_name,
          },
        },
      })),
    };
  } else {
    filters = {
      categories: {
        category_name: {
          $eq: "__non_existent_category__",
        },
      },
    };
  }

  const q = qs.stringify(
    {
      fields: [
        "Title",
        "author",
        "createdAt",
        "description",
        "slug",
        "updatedAt",
      ],

      filters: filters,
      populate: {
        image: {
          fields: ["formats"],
        },
        categories: {
          fields: ["category_name"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const { data } = useQuery({
    queryKey: ["blogs", blog_id, q],
    queryFn: () => fetchBlogs(blog_id, q),
  });

  useEffect(() => {
    fetchBlogs(blog_id, q);
  }, [blog_id, id, categories, q]);

  return (
    <section className="flex sm:gap-6 gap-4 overflow-x-auto   pb-10 px-3">
      {data?.data
        ?.filter((bl) => bl.id !== currentBlog)
        ?.map((blog, i) => (
          <div
            onClick={() => {
              return navigate(`/blogs/${blog_id}/${blog?.attributes?.slug}`, {
                replace: true,
              });
            }}
            key={i}
            className="  shrink-0 cursor-pointer   relative  bg-primary grid gap-4  rounded-xl border border-slate-700 w-[350px] "
          >
            <div className="relative ">
              <div className="bg-black-gradient rounded-t-xl   h-[250px] grid place-items-center">
                <img
                  src={
                    blog?.attributes?.image?.data?.attributes?.formats?.small
                      ?.url ||
                    blog?.attributes?.image?.data?.attributes?.formats?.small
                      ?.url
                  }
                  className="  h-[250px]    rounded-t-xl object-fit"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center px-2 pt-2 bg-primary rounded-b-xl ">
                <h1 className="text-2xl font-semibold  text-white">
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
                {/* <p className="text-dimWhite pb-3">
                  Author: {blog?.attributes?.author}
                </p> */}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default RelatedBlogs;
