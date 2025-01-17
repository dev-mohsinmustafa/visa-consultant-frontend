import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';
import { DataService } from '../config/dataService/dataService';

const Login = () => {
    const TAG = "Signin:()=>";
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    const [signinFormData, setSigninFormData] = useState({
        email: "",
        password: "",
    })
    const handleInputChange = (e) => {
        setSigninFormData({ ...signinFormData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        sendToBackendSignin();
    }
    const sendToBackendSignin = async () => {
        // console.log("signinFormData from user:", signinFormData);
        // console.log("backend", signinFormData);

        if (signinFormData.email === "" || signinFormData.password === "") {
            // return setErrorMsg("Please fill all the fields")
            // setLoading(false);
            toast.error("All fields are required");
            return;
        }
        // if password and email matched we fetch api
        else {
            console.log("User signin post data", {
                email: signinFormData.email,
                password: signinFormData.password,
            })
            // setLoading(true);
            try {
                const response = await DataService.post("signin", signinFormData);
                console.log(TAG, "Response Fetched Successfully", response);
                // toast.success(response.data.message);
                const data = response.data;
                console.log(TAG, 'API Response details: ', data);
                if (data.error) {
                    toast.error(data.error);
                } else {
                    toast.success(data.message);
                    // alert("Loggedin successfull")
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                }
            } catch (error) {
                console.log(TAG, "Response error Fetching api", error);
                toast.error(error.response.data.error);
            }
            // finally {
            //     setLoading(false);
            // }
        }
    }
    // 
    // if (loading) {
    //     return (
    //         <SpinnerLoader />
    //     );
    // }
    return (
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Hello! <span className='text-primaryColor'>Welcome</span> Back 🎉</h3>

                <form action="" className='py-4 md:py-0'
                    type="submit"
                    onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input type="email" placeholder='Enter your Email' name="email" value={signinFormData.email} id=""
                            onChange={handleInputChange} className='w-full  py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor cursor-pointer'
                        //  required 
                        />
                    </div>

                    <div className='mb-5'>
                        <input type="password" placeholder='Enter your Password' name="password" value={signinFormData.password} id=""
                            onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor  cursor-pointer'
                        //  required 
                        />
                    </div>

                    <p className='mt-5 text-textColor text-right'>
                        <Link to="/forgotPassword" className="text-primaryColor font-medium ml-1">Forget Password?</Link>
                    </p>

                    <div className='mt-7'>
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                        // onClick={() => sendToBackendSignin()}
                        >Login</button>
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

export default Login;