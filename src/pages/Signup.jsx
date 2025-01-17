import React, { useEffect, useState } from 'react';
import signup from "../assets/images/signup.gif";

import avatar from "../assets/images/avatar-icon.png";
import { data, Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from 'axios';
import ToastContainerError from '../components/toastContainerError/ToastContainerError';
// import HashLoaderSpinner from '../components/hashLoaderSpinner/HashLoaderSpinner';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DataService } from '../config/dataService/dataService';
import uploadImageToCloudinary from '../config/uploadCloudinary';


// const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/api/`;
// console.log('API_ENDPOINT: ', API_ENDPOINT);


const Signup = () => {
  const TAG = "Signup:()=>";
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  //  ======Thapa Technical======
  // const [userFormData, setUserFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // })
  // let name, value
  // const handleUserInputChange = (e) => {
  //   name = event.target.name;
  //   value = event.target.value;
  //   setUserFormData({ ...userFormData, [name]: [value] });
  //
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    role: "patient",
    gender: "male",
    photo: selectedFile,
  })

  // Error messages
  // const [errormsg, setErrorMsg] = useState(null);
  const handleInputChange = (e) => {
    // Clear error for email or password as the user starts typing
    if (e.target.name === 'email') {
      setEmailError('');
    }
    if (e.target.name === 'password') {
      setPasswordError('');
    }

    // console.log("handleFileIputchange", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // console.log("updated state()=>", formData); // To check the updated state
  }


  //


  //
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);

    // image upload functionality 
    const data = await uploadImageToCloudinary(file);
    console.log("images data ", data);
    // we only need url recieved from cloudinary
    setPreviewURL(data.url);
    // before submission
    setSelectedFile(data.url);
    // also update photo state 
    setFormData({ ...formData, photo: data.url })
    console.log("updated state picture()=>", formData.photo);

    // later we will use cloudinary for upload images
    // console.log(file);
    // console.log("My file name is =>", file.name);
  }
  //

  // 

  // Add a state variable to track the email validation error:
  const [emailError, setEmailError] = useState('');
  // Create a function to validate the email using a regular expression:
  const validateEmail = (email) => {
    // Regular expression for email validation
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    else {
      setEmailError('');
      return true;
    }
  };

  // 
  //
  const [passwordError, setPasswordError] = useState('');

  // Function to validate password length
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  //


  const submitHandler = async (event) => {
    event.preventDefault();
    sendToBackendSignup();
    // setFormData({ fullName: "", email: "", password: "", confirmPassword: "", dob: "" });
  }
  //

  const sendToBackendSignup = async () => {
    // console.log("formData from user:", formData);
    console.log("backend", formData); // Check if all the fields are properly populated before sending to backend

    if (formData.fullName === "" || formData.email === ""
      || formData.password === "" || formData.dob === ""
    ) {
      // return setErrorMsg("Please fill all the fields")
      // setLoading(false);
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(formData.email)) {
      return; // Stop execution if email is invalid
    }

    // Password length validation
    if (!validatePassword(formData.password)) {
      return; // Stop execution if password is invalid
    }

    else {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password must be same");
        return;
      }
      // if password matched we fetch api
      else {
        console.log("User signup post data", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          role: formData.role,
          gender: formData.gender,
          photo: formData.photo
        })

        //
        // fetch("http://192.168.1.15:8998/signup", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(formData)
        // })

        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log("USER SIGNUP", data);
        //     toast.success("Signup Successfull");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     toast.error("Something went wrong. Please try again.");
        //   })

        // setLoading(true);
        try {
          // 1st way
          // const response = await axios.post("http://192.168.1.22:8999/signup", fdata, {
          //     headers: {
          //         "Content-Type": "application/json"
          //     }
          // });
          // 2nd way 
          // const response = await axios.post(`${API_ENDPOINT}verify`, formData, {
          // 3rd way
          const response = await DataService.post("verify", formData);
          console.log(TAG, "Response Fetched Successfully", response);
          // toast.success("User Signup Successfull");
          const data = response.data;
          console.log(TAG, 'API Response details: ', data);
          // if (data.error) {
          //   // setLoading(false);
          //   toast.error(data.error);
          // } else {
          //   toast.success(data.message);
          //   // setLoading(false);
          //   // toast.success("Account Created Successfully");
          //   setTimeout(() => {
          //     navigate("/login");
          //   }, 2000)
          // }

          if (data.error === "Invalid Credentials") {
            toast.error("Invalid Credentials");
          }
          else if (data.message === "Verification Code Sent to your Email") {
            // console.log("userData from Backend", data.usersData);
            toast.success(data.message);
            // setLoading(false);
            setTimeout(() => {
              navigate("/verification", { state: { userDataVerification: data.usersData } });
            }, 1000)
            setFormData({ fullName: "", email: "", password: "", confirmPassword: "", dob: "", role: "", gender: "", photo:"" });
          }
        } catch (error) {
          // setLoading(false);
          console.log(TAG, "Response error Fetching api", error);
          toast.error(error.response.data.error);
          // toast.error("Something went wrong. Please try again.");
        }

        // Create FormData to handle file uploads
        // const formData = new FormData();
        // formData.append("fullName", formData.fullName);
        // formData.append("email", formData.email);
        // formData.append("password", formData.password);
        // formData.append("dob", formData.dob);
        // // If a file is selected, append it to the FormData
        // if (selectedFile) {
        //   formData.append("photo", selectedFile);
        // }
        // try {
        //   const response = await axios.post("http://192.168.1.15:8998/signup", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data", // Important for file uploads
        //     },
        //   });
        //   console.log("Response from signup API:", response);
        //   toast.success("User Signup Successfull");
        // } catch (error) {
        //   console.error("Error during signup:", error);
        //   toast.error("Something went wrong. Please try again.");
        // }
      }
    }

  }
  // 
  // if (loading) {
  //   return (
  //     <HashLoaderSpinner />
  //   );
  // }
  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto'>

        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* ====img box==== */}
          <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
            <figure className='rounded-l-lg'>
              <img src={signup} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>

          {/* ====signup form==== */}
          <div className='rounded-l-lg lg:pl-16 py-10'>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Create an <span className='text-primaryColor'>account</span></h3>
            <form action="" type="submit"
              onSubmit={submitHandler}
            // onSubmit={()=>console.log("<Mohsin>")}
            >
              <div className='mb-5'>
                <input
                  type="text"
                  placeholder='Full Name'
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor  cursor-pointer'
                // required
                />
              </div>


              <div className='mb-5'>
                <input type="email"
                  placeholder='Enter your email'
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor  cursor-pointer'
                // required
                />
              </div>
              {/* Display email validation error */}
              {emailError ? (
                <div style={{
                  width: "70%",
                  color: "red",
                  fontSize: 15
                }}>{emailError}</div>
              ) : null}
              <div className='mb-5 relative'>
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor  cursor-pointer'
                // required
                />
                {/* Password visibility toggle icon */}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
              {/* Display password validation error */}
              {passwordError ? (
                <div style={{
                  width: "70%",
                  color: "red",
                  fontSize: 15
                }}>{passwordError}</div>
              ) : null}
              <div className='mb-5'>
                <input type="password"
                  placeholder='Confirm Password'
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor  cursor-pointer'
                // required
                />
              </div>
              {passwordError ? (
                <div style={{
                  width: "70%",
                  color: "red",
                  fontSize: 15
                }}>{passwordError}</div>
              ) : null}

              <div className='mb-5'>
                <input type="date"
                  placeholder='Date of Birth'
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor  cursor-pointer'
                // required
                />
              </div>

              <div className='mb-5 flex items-center justify-between'>
                <label className='text-headingColor font-bold text-[16px] leading-7'
                >
                  Are you a
                  <select
                    name="role"
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className='text-headingColor font-bold text-[16px] leading-7'>
                  Gender
                  <select
                    name="gender"
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className='mb-5 flex items-center gap-3'>
              {selectedFile &&
                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center'>
                  <img src={previewURL} alt="" className='w-full rounded-full' />
                </figure>}

                <div className='relative w-[130px] h-[50px]'>
                  <input type="file"
                    name="photo"
                    id="customFile"
                    accept='.jgp, .png'
                    className='absolute top-0 left-0  w-full h-full opacity-0 cursor-pointer'
                    // value={formData.photo}
                    onChange={handleFileInputChange}
                  />
                  <label htmlFor="customFile"
                    className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                    text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold
                    rounded-lg truncate cursor-pointer'
                  >
                    Upload Photo
                  </label>
                </div>

              </div>
              {/* {
                errormsg ? <div className='bg-primaryColor'>{errormsg}</div> : null
              } */}
              <div className='mt-7'>
                <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px]
                 rounded-lg px-4 py-3'
                // onClick={() => { sendToBackendSignup() }}
                >Signup</button>
              </div>
              <p className='mt-5 text-textColor text-center'>Already have an account?
                <Link to="/login" className="text-primaryColor font-medium ml-1">Login</Link>
              </p>
            </form>
          </div>

        </div>

      </div>
      <ToastContainerError />

    </section>
  )

}
export default Signup;