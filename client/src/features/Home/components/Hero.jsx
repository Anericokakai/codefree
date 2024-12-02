import React from 'react'
import styles from '../../../utils/styles'
import { blog } from '../../../images'
import { BsVectorPen } from "react-icons/bs";
function Hero() {
  return (
    <section
    id="home"
    className={` px-1 sm:grid-cols-2 grid ${styles.boxWidth} gap-3 `}
  >
    <div
      className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16  px-2 `}
    >
      <div className='relative bg-primary group  w-full my-5'>
        <div className='absolute bg-gradient-to-r from-purple-600 to-pink-600 -inset-0 rounded-[10px]  blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
      <div className="flex px-3 gap-2 py-3   relative  flex-row items-center  w-full  bg-primary rounded-[10px] ">

<button className='relative  py-2 h-full'>
  <BsVectorPen className=' text-[#7f4ca5] size-8'/>
</button>
<p className={`${styles.paragraph} text-2xl space-x-2 bg-d`}>
  Welcome to
  <span className="text-white font-bold px-2 text-2xl">C.O.D.E</span>
  <span className=" text-gradient font-bold  text-2xl ">Free</span>
  <span className=" text-white font-bold  ">Blog</span>
</p>
</div>
      </div>
      <div>
        <h1 className="flex-1 font-semibold font font-poppins text-white  ">
          <span className={` font-bold sm:text-[60px] text-[40px]`}>
            
            <span className="text-gradient sm:text-[70px] ">
              
              C.O.D.E
            </span>
            <br className="sm:block hidden  " /> Free blogs
          </span>
        </h1>
        <div className="ss:flex "></div>
        <p className="text-white sm:text-2xl text-[17px] font-poppins pt-3 ">
         Discover Nice blogs here to learn more about coding and web development
        </p>
        <div className="ss:flex  md:mr-4 mr-0">
          {/* <GetStarted /> */}
        </div>
      </div>
    </div>
    <div className={`heroImage   flex-1 flex ${styles.flexCenter} relative px-2 py-5`}>

      
      <img src={blog} className="   w-[100%] h-full object-cover rounded-xl opacity-80 z-[1] relative" alt="" />
      
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 violet__gradient" />
    </div>
  </section>
  )
}

export default Hero
