import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';
import { useLocation } from 'react-router-dom';
import { DataService } from '../config/dataService/dataService';

const ForgotPassword_ChoosePassword = () => {
    const TAG = "ForgotPassword_ChoosePassword:()=>";
    const navigate = useNavigate();
    const location = useLocation();
    const { email, code } = location.state || {};
    useEffect(() => {
        if (email || code) {
            console.log(TAG, "email and code", email, code);
        } else {
            console.log(TAG, "Location state is missing or undefined");
        }
    }, [email, code]);

    const [choosePasswordFormData, setChoosePasswordFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const handleInputChange = (e) => {
        setChoosePasswordFormData({ ...choosePasswordFormData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        sendToBackendChoosePassword();
    }

    const sendToBackendChoosePassword = async () => {
        if (choosePasswordFormData.password === "" || choosePasswordFormData.confirmPassword === "") {
            toast.error("All fields are required");
            return;
        }
        else if (choosePasswordFormData.password !== choosePasswordFormData.confirmPassword) {
            toast.error("Password and Confirm Password must be same");
            // toast.error("Passwords do not match");
            return;
        }
        else {
            try {
                const payload = {
                    email: email,
                    password: choosePasswordFormData.password
                }
                console.log(TAG, "Payload being sent:", payload);
                const response = await DataService.post("resetPassword", payload);
                console.log(TAG, "Response Fetched Successfully", response);
                const data = response.data;
                console.log(TAG, 'API Response details: ', data);
                if (data.error) {
                    toast.error(data.error);
                } else {
                    toast.success(data.message);
                    setTimeout(() => {
                        navigate("/login", {
                            state: {
                                userSignupData: data.usersData,
                            }
                        });
                    }, 1000);
                }
                // Second Method
                // if (data.message === "Password Changed Successfully") {
                //     toast.success(data.message);
                //     setTimeout(() => {
                //         navigate("/login", {
                //             state: {
                //                 userSignupData: data.usersData,
                //             }
                //         });
                //     }, 1000);
                // } else {
                //     toast.error(data.error);
                // }
            } catch (error) {
                console.log(TAG, "Response error Fetching api", error);
                toast.error(error.response.data.error);
            }
        }
    }

    return (
        <section className='px-5 lg:px-0 flex justify-center text-center'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Welcome to <span className='text-primaryColor'>ChoosePassword </span> Page </h3>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Hello! <span className='text-primaryColor'>Choose a Strong</span> Password 🎉</h3>
                <form action="" className='py-4 md:py-0'
                    type="submit"
                    onSubmit={submitHandler}
                >
                    <div className='mb-5'>
                        <input type="password" placeholder='Enter password' name="password"
                            className='w-full  py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor cursor-pointer'
                            //  required 
                            value={choosePasswordFormData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-5'>
                        <input type="password" placeholder='Confirm password' name="confirmPassword"
                            className='w-full  py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor cursor-pointer'
                            //  required 
                            value={choosePasswordFormData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mt-7'>
                        {/* Account Recovered Successfully */}
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                        >Next</button>
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

export default ForgotPassword_ChoosePassword;