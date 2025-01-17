import React, { useEffect, useRef } from 'react';
import logo from "../../assets/images/logo.png";
import bsConsultantLogo from "../../assets/images/bsConsultantLogo.png";
import bsConsultantLogo2 from "../../assets/images/bsConsultantLogo2.png";
import { NavLink, Link } from 'react-router-dom';

import userImg from "../../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; 


const navLinks = [
    {
        path: "/",
        // label: 'home',
        // exact: true,
        // component: () => <Link to="/" className="link">createUser</Link>
        display: "Home"
    },
    {
        path: "/createUser",
        // label: 'createUser',
        // exact: true,
        // component: () => <Link to="/" className="link">createUser</Link>
        display: "CreateUser"
    },
    {
        path: "/search",
        display: "Search"
    },
    {
        path: "/about",
        display: "About"
    },
    // {
    //     path: "/services",
    //     display: "Services"
    // },
    // {
    //     path: "/patients",
    //     display: "Patients"
    // },
    
    {
        path: "/contact",
        display: "Contact"
    },
]






const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    
    
const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header');
        }
        else{
            headerRef.current.classList.remove('sticky__header');
        }
    })
}

useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
})

const toggleMenu=()=> {
    console.log("Menu toggled");

    menuRef.current.classList.toggle('show__menu');
}

    return (
        <>
            <header className='header flex items-center' ref={headerRef}>
                <div className="container">
                    <div className='flex items-center justify-between'>
                        {/* ======== logo====== */}
                        <div style={{ width:180, height:100}}>
                            {/* <img src={logo} alt="" /> */}
                            {/* <img src={bsConsultantLogo} alt="" width={100} height={50} /> */}
                            <img src={bsConsultantLogo} alt=""  />
                            {/* <img src={bsConsultantLogo2} alt="" /> */}
                        </div>


                        {/* ========= menu====== */}
                        <div className='navigation' ref={menuRef} >
                        <button className="close__btn md:hidden" onClick={toggleMenu}>
                                <AiOutlineClose className="w-6 h-6" /> {/* Close icon */}
                            </button>
                            <ul className='menu flex items-center gap-[2.7rem]'>
                                {
                                    navLinks.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <NavLink to={link.path} className={navClass => navClass.isActive ?
                                                    "text-primaryColor text-[16px] leading-7 font-[600]" :
                                                    "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"}>
                                                    {link.display}
                                                </NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>


                        {/* ========= navRight ======= */}
                        <div className='flex items-center gap-4'>
                            <div className='hidden '>
                                <Link to="/">
                                    <figure className='w-[35px] h-[35px] rounded-full'>
                                        <img src={userImg} className='w-full rounded-full' alt="" />
                                    </figure>
                                </Link>
                            </div>

                            <Link to="/login">
                                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex
                                items-center justify-center rounded-[50px]'>
                                    Login
                                </button>
                            </Link>

                            <span className='md:hidden' onClick={toggleMenu}>
                                <BiMenu className='w-6 h-6 cursor-pointer'  />
                            </span>
                        </div>


                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;