import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';
import { DataService } from '../config/dataService/dataService';

const Verification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDataVerification } = location.state;
    // console.log("userDataVerification from Signup and show in Verification page", userDataVerification[0]?.verificationCode);

    const [userCode, setUserCode] = useState("XXXX");
    // actual code from backend 
    const [actualCode, setActualCode] = useState(null);
    // const [loading, setLoading] = useState(false);
    // jese he page load hoga 
    useEffect(() => {
        if (userDataVerification && userDataVerification.length > 0) {
            console.log("userDataVerification in useEffect():", userDataVerification[0].verificationCode);
            setActualCode(userDataVerification[0]?.verificationCode);
        }
    }, [userDataVerification])

    const handleInputChange = (e) => {
        setUserCode(e.target.value);
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        sendToBackendVerification();
    }

    const sendToBackendVerification = async () => {
        // console.log("user code ", userCode);
        // console.log("actual code ", actualCode);
        if (userCode === "XXXX" || userCode === "") {
            toast.error("Please Enter the Code");
            return;
        }
        // if userCode and actualCode matched we fetch api
        else if (userCode == actualCode) {
            // setLoading(true);
            console.log("Correct Code");
            toast.success("Correct Code");
            // agr user ne sai code likha to ab me user ka data bhej don ga or usy save krwa donga
            const fdata = {
                fullName: userDataVerification[0].fullName,
                email: userDataVerification[0].email,
                password: userDataVerification[0].password,
                dob: userDataVerification[0].dob,
            }
            try {
                const response = await DataService.post("signup", fdata);
                console.log("Response from Signup API in Verification Page:", response);
                // toast.success(response.data.message);
                const data = response.data;
                console.log("Response from Signup API in Verififcation Page:", data);
                if (data.message) {
                    toast.success(data.message);
                    navigate("/login");
                } else {
                    toast.error(data.error || "Something went wrong !! Try Signing Up Again");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.error);
            }
            // finally {
            //     setLoading(false); 
            // }

        }

        // if user enter wrong code
        else if (userCode != actualCode) {
            console.log("Incorrect Code");
            toast.error("Incorrect Code");
            return;
        }
    }
    // 
    // if (loading) {
    //     return (
    //         <SpinnerLoader />
    //     );
    // }
    return (
        <section className='px-5 lg:px-0 flex justify-center text-center'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Welcome to <span className='text-primaryColor'>Verification</span> Page </h3>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Hello! <span className='text-primaryColor'>A Verification Code has been Sent to you on your</span> Email 🎉</h3>
                {/* {
                    toast.success("A Verification Code has been Sent to you on your Email 🎉")
                } */}
                <form action="" className='py-4 md:py-0' type="submit" onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input type="password" placeholder='Enter your 6 digit Verification Code' name="password" value={userCode} id=""
                            onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                         placeholder:text-textColor  cursor-pointer'
                        //  required 
                        />
                    </div>

                    <p className='mt-5 text-textColor text-right'>
                        <Link to="/register" className="text-primaryColor font-medium ml-1">Forget Password?</Link>
                    </p>

                    <div className='mt-7'>
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                        // onClick={() => sendToBackendVerification()}
                        >Verify</button>
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
export default Verification;