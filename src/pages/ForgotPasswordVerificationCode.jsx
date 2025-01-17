import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';

const ForgotPasswordVerificationCode = () => {
    const TAG = "ForgotPasswordVerificationCode:()=>";
    const navigate = useNavigate();
    const location = useLocation();
    // const { VerificationCode, email } = location.state;
    // console.log(TAG, "UserDeatils",VerificationCode, email);
    const { userEmail, userVerificationCode } = location.state || {};
    // console.log(TAG, "UserDeatils", userEmail, userVerificationCode);
    const [VerificationCode, setVerificationCode] = useState({password: ""});
    useEffect(() => {
        if (userEmail || userVerificationCode) {
            console.log(TAG, "UserDetails in useEffect():", userEmail, userVerificationCode);
            setVerificationCode({ ...VerificationCode, password: userVerificationCode });
        }
        else {
            console.log(TAG, "Location state is missing or undefined");
        }
    }, [userEmail, userVerificationCode])



    const handleInputChange = (e) => {
        setVerificationCode({ ...VerificationCode, [e.target.name]: e.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        sendToBackendVerificationCode();
    }


    const sendToBackendVerificationCode = async () => {
        if (VerificationCode.password === "") {
            toast.error("All fields are required");
            return;
        }
        if (VerificationCode.password != userVerificationCode) {
            toast.error("Invalid Verification Code");
        }
        else {
            toast.success("Verification Code Matched");
            setTimeout(() => {
                navigate("/forgotPassword_ChoosePassword", {
                    state: {
                        email: userEmail,
                        code: userVerificationCode
                    }
                });
            }, 1000);
        }
    }

    return (
        <section className='px-5 lg:px-0 flex justify-center text-center'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                {/* <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Welcome to <span className='text-primaryColor'>Forgot Password Verification Code</span> Page </h3> */}
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Hello! <span className='text-primaryColor'>A Verification Code has been sent to your</span> Email 🎉</h3>
                <form action="" className='py-4 md:py-0'
                    type="submit"
                    onSubmit={submitHandler}
                >
                    <div className='mb-5'>
                        <input type="password" placeholder='Enter 6 digits code here' name="password" id=""
                            className='w-full  py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor cursor-pointer'
                            //  required 
                            onChange={handleInputChange}
                            value={VerificationCode.password}
                        />
                    </div>

                    <div className='mt-7'>
                        {/* <Link to={"/forgotPassword_ChoosePassword"}> */}
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                        >Enter</button>
                        {/* </Link> */}
                    </div>

                    <p className='mt-5 text-textColor text-center'>Don&apos;t have an account?
                        <Link to="/register" className="text-primaryColor font-medium ml-1">Register</Link>
                    </p>

                </form>
            </div>
            <ToastContainerError />
        </section>
    )
}

export default ForgotPasswordVerificationCode;