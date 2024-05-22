import React, { useEffect, useRef, useState } from "react";
import { styles } from "../../../utils";
import { imageA } from "../../../images";
import Prism from "prismjs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import axios from "axios";
import { IoCheckmarkSharp, IoCopyOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSingleBlog } from "../../../lib";
import Preloader from "../../../components/Preloader";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { TfiCommentsSmiley } from "react-icons/tfi";
import qs from "qs";
import { IoMdShareAlt } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { userIcon } from "../../../icons";
import { LuDot } from "react-icons/lu";
import dayjs from "dayjs";
function ReadBlog() {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSticky, setIsSticky] = useState(true);
  const [notScrolling, setNotScrolling] = useState(null);
  const [prevLocation, setPrevLocation] = useState(window.screenY);
  const { blog_id, id } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const banner = queryParam.get("banner");
  //  initial fetch
  const q = qs.stringify(
    {
      fields: [
        "title",
        "description",
        "slug",
        "createdAt",
        "author",
        "content",
      ],
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

  const { data, isError, isLoading } = useQuery({
    queryKey: [`blog-${id}`],
    queryFn: () => fetchSingleBlog(blog_id, id, q),
  });

  
  useEffect(() => {
    fetchSingleBlog(blog_id, id, q);
  }, [blog_id, id]);

  useEffect(() => {
    // Call Prism.highlightAll() to apply syntax highlighting to all code blocks
    Prism.highlightAll();
  }, [data]);

  // handle copying code
  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error, "> failed to copy code");
      });
  };
  // handle article scroll

  const handleScroll = () => {
    if (containerRef.current) {
      console.log(window.scrollY);
      console.log(containerRef.current.clientHeight);


      if (
        window.scrollY < containerRef.current.clientHeight - 520 
      ) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setPrevLocation(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevLocation]);
  

 
  if (isLoading) {
    return (
      <section className="bg-primary h-screen  grid place-content-center">
        <Preloader />
      </section>
    );
  }

  return (
    <div className="bg-primary min-h-[100vh] flex justify-center text-dimWhite ">
      <article
        className={`${styles.boxWidth} ${styles.paragraph}  px-3  flex flex-col items-center`}
      >
        <button
          onClick={() => navigate(-1)}
          className="  absolute left-2 top-5 bg-[#242c38] flex items-center gap-2 px-2 rounded py-1 text-[16px] hover:text-blue-500 "
        >
          {" "}
          <MdKeyboardDoubleArrowLeft /> Back{" "}
        </button>
        <div className="  max-h-[25rem] flex flex-col  mt-16 sm:mt-24 place-items-center w-full px-2">
          <div>
            <h1 className=" font-bold text-[30px] text-white font-publicSans py-3 sm:text-[48px]">
              {data?.data?.attributes?.Title}
            </h1>
            <div className="flex  py-4 ">
              <div className="flex sm:gap-2 items-center ">
                <img
                  src={userIcon}
                  className="size-12 mr-2 bg-lightGray rounded-full"
                  alt=""
                />
                <p className="py-2 text-sm sm:text-base">
                  {data?.data?.attributes?.author}
                </p>
              </div>
              <div className="grid place-content-center ">
                <LuDot className="font-bold size-8 text-slate-400" />
              </div>
              <div className="grid place-items-center sm:text-base text-sm">
                <p>
                  {" "}
                  {dayjs(data?.data?.attributes?.createdAt).format(
                    "DD MMM , YYYY"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="sm:h-[70%]  min-h-[50%] bg-black-gradient w-full max-w-[40rem] flex items-center justify-center rounded-xl">
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover  rounded-xl"
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className={`${styles.articleWidth}    prose mx-auto  prose-a:text-blue-500 prose-a:text-sm  relative prose-p:text-dimWhite prose-p:text-xl prose-headings:text-white prose-headings:font-publicSans  prose-h4:text-[2rem] prose-ul:text-dimWhite prose-blockquote:text-white sm:prose-ul:text-[1.25rem] prose-ul:text-[1.125rem] sm:prose-p:text-[1.25rem] sm:prose-p:leading-[2.3rem] prose-p:leading-[2.2rem] prose-p:text-[1.125rem] `}
        >
          <div className="relative z-10">
            {data?.data?.attributes !== null &&
              data?.data?.attributes?.Content.map((block, index) => {
                if (block.type === "code") {
                  return (
                    <pre key={index} className="language-javascript">
                      <button
                        disabled={copiedId === index && copied}
                        onClick={() => {
                          setCopiedId(index);
                          handleCopy(block.children[0].text);
                        }}
                        className="absolute right-7  p-2 rounded text-white bg-[#131721]"
                      >
                        {copiedId === index && copied ? (
                          <IoCheckmarkSharp className="text-[#7fd962]" />
                        ) : (
                          <IoCopyOutline />
                        )}
                      </button>
                      <code className="language-javascript ">
                        {block.children[0].text}
                      </code>
                    </pre>
                  );
                } else {
                  return <BlocksRenderer key={index} content={[block]} />;
                }
              })}
            <div
              className={` grid ${
                isSticky ? "fixed" : "relative"
              }  bottom-3  left-0  w-full place-items-center`}
            >
              <div className="bg-[#0f172ab3] shadow-2xl divide-x justify-center  text white rounded-3xl border flex text-[1.4rem] items-center gap-3 px-3 py-3 border-slate-700">
                <button className="px-2">
                  <GoHeart />
                </button>
                <button className="px-2">
                  <TfiCommentsSmiley />
                </button>
                <button className="px-2">
                  <IoMdShareAlt />
                </button>
                <button className="px-2">
                  <CiBookmark />
                </button>
              </div>
            </div>
          </div>
          {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-80" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-60" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-85" /> */}
        </div>
        <div className=" pt-3  px-4 justify-between w-full my-3 items-baseline flex border-b border-slate-700">
          <p>Article by</p>
          <p className="text-white">{data?.data?.attributes?.author}</p>
        </div>
      </article>
    </div>
  );
}

export default ReadBlog;
