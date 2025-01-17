import React from 'react';

import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import bsConsultantLogo from "../../assets/images/bsConsultantLogo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";




const socialLinks = [
  // {
  //   path: "https://youtube.com/c/dev",
  //   icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  //   // text: "Youtube"
  // },
  {
    path: "https://github.com/dev-mohsinmustafa",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    // text: "Github"
  },
  {
    path: "https://www.instagram.com/devmohsinmustafa",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    // text: "Instagram"
  },
  {
    path: "https://linkedin.com/in/dev-mohsinmustafa",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
    // text: "LinkedIn"
  },
]

const quickLinks01 = [
  {
    path: "/createUser",
    display: "createUser",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
]



const quickLinks02 = [
  // {
  //   path: "/patients",
  //   display: "Patients",
  // },
  {
    path: "/",
    display: "Request an Appointment Report",
  },
  {
    path: "/",
    display: "Find a location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
]

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
]


const Footer = () => {

  const year = new Date().getFullYear();
  return (
    <footer className='pb-16 pt-10'>
      <div className="container">

        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            {/* <img src={logo} alt="" className='text-[16px] leading-7 font-[400] text-textColor mt-4 ' /> */}
            <div style={{ width: 180, height: 100 }}>
              <img src={bsConsultantLogo} alt="" />
            </div>
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>Copyright @ {year} developed by Mohsin Mustafa. All rights reserved.</p>

            <div className='flex items-center gap-3 mt-4'>
              {
                socialLinks.map((link, index) => {
                  return (
                    <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center 
                  justify-center group hover:bg-primaryColor hover:border-none'>{link.icon}</Link>
                  )
                })
              }
            </div>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor '>Quick Links</h2>
            <ul>
              {
                quickLinks01.map((item, index) => {
                  return (
                    <li key={index} className='mb-4'><Link to={item.path}>{item.display}</Link></li>

                  )
                })
              }
            </ul>
          </div>



          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>I want to </h2>
            <ul>
              {
                quickLinks02.map((item, index) => {
                  return (
                    <li key={index} className='mb-4'><Link to={item.path}>{item.display}</Link></li>

                  )
                })
              }
            </ul>
          </div>




          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Support</h2>
            <ul>
              {
                quickLinks03.map((item, index) => {
                  return (
                    <li key={index} className='mb-4'><Link to={item.path}>{item.display}</Link></li>

                  )
                })
              }
            </ul>
          </div>


        </div>
      </div>
    </footer>
  )
}

export default Footer;