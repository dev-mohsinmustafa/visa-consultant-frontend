import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';
import { DataService } from '../config/dataService/dataService';

const ForgotPassword = () => {
    const TAG = "ForgotPassword:()=>";
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    const [forgotFormData, setForgotFormData] = useState({
        email: "",
    })
    const handleInputChange = (e) => {
        setForgotFormData({ ...forgotFormData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        sendToBackendForgotPassword();
    }
    const sendToBackendForgotPassword = async () => {
        if (forgotFormData.email === "") {
            toast.error("All fields are required");
            return;
        }
        else {
            // setLoading(true);
            try {
                const response = await DataService.post("verifyForgotPassword", forgotFormData);
                console.log(TAG, "Response Fetched Successfully", response);
                // toast.success(response.data.message);
                const data = response.data;
                console.log(TAG, 'API Response details: ', data);
                // if (data.error === "Invalid Credentials") {
                if (data.error) {
                    toast.error(data.error);
                    // setLoading(false);
                    // } else if (data.message === "Verification Code Sent to your Email Successfully") {
                } else {
                    toast.success(data.message);
                    // setLoading(false);
                    setTimeout(() => {
                        navigate("/forgotPasswordVerificationCode", {
                            state: {
                                userEmail: data.email,
                                userVerificationCode: data.VerificationCode
                            }
                        });
                    }, 1000);
                }
            }
            catch (error) {
                // setLoading(false);
                console.log(TAG, "Response error Fetching api", error);
                toast.error(error.response.data.error);
            }
        }

    }

    // if (loading) {
    //     return (
    //         <SpinnerLoader />
    //     );
    // }
    return (
        <section className='px-5 lg:px-0 flex justify-center text-center'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Welcome to <span className='text-primaryColor'>Forgot Password</span> Page </h3>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Hello! <span className='text-primaryColor'>Please Verify your</span> Email 🎉</h3>
                <form action="" className='py-4 md:py-0'
                    type="submit"
                    onSubmit={submitHandler}
                >
                    <div className='mb-5'>
                        <input type="email" placeholder='Enter your Email' name="email" id=""
                            className='w-full  py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor cursor-pointer'
                            //  required 
                            onChange={handleInputChange}
                            value={forgotFormData.email}
                        />
                    </div>

                    <div className='mt-7'>
                        {/* <Link to={"/forgotPasswordVerificationCode"}> */}
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                        >Next</button>
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

export default ForgotPassword;