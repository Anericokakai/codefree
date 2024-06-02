import React from 'react'
import styles from '../../../utils/styles'
import { FaCode } from 'react-icons/fa6'
import { BsChatQuote } from 'react-icons/bs'
import { SlSocialGithub } from "react-icons/sl";

function IntroToCodeFree() {
    const reasons=[
        {
            title:"Deep Software Development understating",
            description:"You will learn how to build real world projects using Node,React,JavaScript,HTML ,CSS, SpringBoot . All this in a simpler and efficient way.",
            icon:FaCode
        },{
            title:"Free Source code for every blog ",
            description:"Access to free source code available on my github account",
            icon:SlSocialGithub
        },{
          title:" Free Community" ,
          description:"There is a free community of like minded developers that will help you when stack" ,
          icon:BsChatQuote
        }
    ]
  return (
    <div className=' py-10 px-2'>
      <header className=' py-3 grid place-items-center'>
      <h1 className={`text-3xl sm:text-5xl font-extrabold  text-white`}>Why <span className='text-gradient'>Codefree</span></h1>
      <p className={`text-xl pb-7   text-dimWhite`}>Master the art of code,taking a deeper dive</p>
      </header>
      <section>
        
        <article className='grid xs:grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-4 py-12'>
            {
                reasons.map((reason,index)=>(
                    <div key={index} className='relative  border-dimWhite  bg-black-gradient rounded-xl p-3 min-h-[170px]'>
                        <div className={`absolute -top-7   left-[45%] rounded-full bg-primary grid place-items-center    h-14 w-14  ${index===0?"bg-[#EAA505]":index===1 ?"bg-[#945CEA]":index===2 ?"bg-[#E62A17]":""} `}>
                            <div className={`absolute blur-2xl  -inset-2 rounded-full ${index===0?"bg-[#EAA505]":index===1 ?"bg-[#945CEA]":index===2 ?"bg-[#E62A17]":""}`}></div>
                           <div className={ ` ${index===0?"bg-[#EAA505]":index===1 ?"bg-[#945CEA]":index===2 ?"bg-[#E62A17]":""} w-full h-full relative grid place-items-center rounded-full `}>
                           {
                            React.createElement(reason.icon,{
                                className:" size-7 text-white relative"
                            })
                           }</div> 
                        </div>
                        <h1 className='text-white text-center font-bold text-2xl py-3 pb-7 '>{reason.title}</h1>
                        <p className={`${styles.paragraph} w-full `}>{reason.description}</p>
                    </div>
                ))
            }
        </article>
      </section>
      
    </div>
  )
}

export default IntroToCodeFree
