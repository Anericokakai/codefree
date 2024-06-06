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
import { LiaReadme } from "react-icons/lia";
import dayjs from "dayjs";
import RelatedBlogs from "../Components/RelatedBlogs";
import LoginPrompt from "../../authentication/components/LoginPrompt";
import NavigationComponent from "../../../components/NavigationComponent";
function ReadBlog() {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSticky, setIsSticky] = useState(true);
  const [stateMessage, setStateMessage] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [prevLocation, setPrevLocation] = useState(window.screenY);
  const [showLogin, setShowLogin] = useState(false);
  const { blog_id, id } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const banner = queryParam.get("banner");
  //  initial fetch

  const q = qs.stringify(
    {
      populate: ["categories", "image"],
      filters: {
        slug: {
          $eq: `${id}`,
        },
      },
    },

    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: [`blog-${id}`],
    queryFn: () => fetchSingleBlog(blog_id, q),
  });

  useEffect(() => {
    fetchSingleBlog(blog_id, q);
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
      let dynamic_height;
      if (window.innerWidth < 768) {
        dynamic_height = 475;
      } else {
        dynamic_height = 520;
      }

      if (window.scrollY < containerRef.current.clientHeight - dynamic_height) {
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

  // ! handle mouse enter
  const handleMouseEnter = (state) => {
    switch (state) {
      case "like":
        setStateMessage("Like article");
        setCurrentState("like");
        break;
      case "comment":
        setStateMessage("Comment on article");
        setCurrentState("comment");
        break;
      case "share":
        setStateMessage("Share article");
        setCurrentState("share");
        break;
      case "bookmark":
        setStateMessage("Bookmark article");
        setCurrentState("bookmark");
        break;
    }
  };
  // ! handle mouse leave
  const handleMouseLeave = () => {
    setStateMessage(null);
  };
 

  if (isLoading) {
    return (
      <section className="bg-primary h-screen  grid place-content-center">
        <Preloader />
      </section>
    );
  }
  // handle weather to show login or not
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <section className="">
      {/* <NavigationComponent /> */}

      <div className="bg-primary  min-h-[100vh] flex  justify-center text-dimWhite ">
        {showLogin && <LoginPrompt setShowLogin={setShowLogin} />}
        <article
          className={`${styles.boxWidth} ${styles.paragraph}  px-3  flex flex-col items-center`}
        >
          <div className="   max-h-[25rem] flex flex-col  mt-16 sm:mt-24 place-items-center w-full px-2">
            <div>
              <h1 className=" font-bold text-[30px] text-white font-publicSans py-3 sm:text-[48px]">
                {data?.data[0]?.attributes?.Title}
              </h1>
              <div className="flex  justify-center    py-4 ">
                
                
                <div className="grid place-items-center  sm:text-base text-sm">
                  <p>
                    {" "}
                    {dayjs(data?.data[0]?.attributes?.createdAt).format(
                      "DD MMM , YYYY"
                    )}
                  </p>
                </div>
                <div className="grid place-content-center ">
                  <LuDot className="font-bold size-8 text-slate-400" />
                </div>
                <div className=" flex items-center gap-2">
                  <LiaReadme />
                  <p className="text-sm">2 min</p>
                </div>
              </div>
            </div>
            <div className="sm:h-[70%]  min-h-[50%] bg-black-gradient w-full max-w-[40rem] flex items-center justify-center rounded-xl">
              <img
                src={data?.data[0]?.attributes?.image?.data?.attributes.formats?.small?.url}
                alt=""
                className="w-full h-full object-cover  rounded-xl"
              />
            </div>
          </div>
          <div
            ref={containerRef}
            className={`${styles.articleWidth}    prose-strong: prose-strong:px-2 prose-strong:py-[.2rem] prose-strong:bg-[#11151c] prose-strong:text-dimWhite prose-strong:font-medium prose-strong:text-base prose-strong:rounded prose-strong:mx-1     prose mx-auto  prose-a:text-blue-500   prose-ol:text-dimWhite prose-ol:text-[1.125rem] relative prose-p:text-dimWhite prose-p:text-xl prose-headings:text-white prose-headings:font-publicSans    prose-ul:text-dimWhite prose-blockquote:bg-[#11151c] prose-blockquote:text-white sm:prose-ul:text-[1.25rem] prose-ul:text-[1.125rem] sm:prose-p:text-[1.25rem] sm:prose-p:leading-[2.3rem] prose-p:leading-[2rem] prose-p:text-[1.1rem]   `}
          >
            <div className="relative ">
              {data?.data[0]?.attributes !== null &&
                data?.data[0]?.attributes?.Content.map((block, index) => {
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
                }  bottom-3  left-0  w-full place-items-center transition-all `}
              >
                <div className="bg-[#0f172ab3] text-white shadow-2xl divide-x divide-slate-700 justify-center  text white rounded-[1.7rem] border flex text-[1.4rem] items-center gap-3 px-3 py-2 border-slate-700">
                  <button className="px-2  relative">
                    {currentState === "like" && (
                      <small className="absolute  -top-[3.4rem] text-blue-500 left-0 text-[0.8rem]">
                        {stateMessage}
                      </small>
                    )}
                    <GoHeart
                      onClick={handleShowLogin}
                      onMouseEnter={() => handleMouseEnter("like")}
                      onMouseLeave={handleMouseLeave}
                      className=" p-1 size-9 rounded-full hover:bg-slate-800"
                    />
                  </button>
                  <button className="px-2 relative">
                    {currentState === "comment" && (
                      <small className="absolute -top-[3.4rem] text-blue-500 left-0 text-[0.8rem]">
                        {stateMessage}
                      </small>
                    )}
                    <TfiCommentsSmiley
                      onClick={handleShowLogin}
                      onMouseEnter={() => handleMouseEnter("comment")}
                      onMouseLeave={handleMouseLeave}
                      className="  hover:bg-slate-800 p-1 size-9 rounded-full"
                    />
                  </button>
                  <button className="px-2 relative">
                    {currentState === "share" && (
                      <small className="absolute -top-[3.4rem] text-blue-500 left-0 text-[0.8rem]">
                        {stateMessage}
                      </small>
                    )}
                    <IoMdShareAlt
                      onClick={handleShowLogin}
                      onMouseEnter={() => handleMouseEnter("share")}
                      onMouseLeave={handleMouseLeave}
                      className=" hover:bg-slate-800 p-1 size-9 rounded-full"
                    />
                  </button>
                  <button className="px-2 relative">
                    {currentState === "bookmark" && (
                      <small className="absolute -top-[3.4rem] text-blue-500 left-0 text-[0.8rem]">
                        {stateMessage}
                      </small>
                    )}
                    <CiBookmark
                      onClick={handleShowLogin}
                      onMouseEnter={() => handleMouseEnter("bookmark")}
                      onMouseLeave={handleMouseLeave}
                      className="hover:bg-slate-800 p-1 size-9 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.articleWidth} pt-3 mb-7  px-4 justify-between  my-3 items-baseline flex border-b border-slate-700`}
          >
            <p>Article by</p>
            <div className="flex items-center gap-3 ">

            
            <img
                    src={userIcon}
                    className=" size-9 bg-lightGray rounded-full"
                    alt=""
                  />
            <p className="text-white">{data?.data[0]?.attributes?.author}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {data?.data[0]?.attributes?.categories?.data?.map((cat, id) => (
              <button
                className=" border px-3 py-1 rounded-3xl bg-slate-900 border-slate-800"
                key={id}
              >
                {cat?.attributes?.category_name}{" "}
              </button>
            ))}
          </div>

          {data?.data[0]?.attributes?.categories?.data?.length > 0 && (
            <section className="w-full ">
              <h1 className="sm:text-[30px] text-[20px] py-6 font-semibold uppercase">
                Related Blogs
              </h1>
              <RelatedBlogs
              currentBlog={data?.data[0].id}
                blog_id={blog_id}
                id={id}
                categories={data?.data[0]?.attributes?.categories?.data}
              />
            </section>
          )}
        </article>
      </div>
    </section>
  );
}

export default ReadBlog;
