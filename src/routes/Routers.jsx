import React from 'react';
import CreateUser from '../pages/CreateUser';
import Search from '../pages/search/Search';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Patients from '../pages/patients/Patients';
import PatientsDetails from '../pages/patients/PatientsDetails';
import Home from "../pages/Home";

import { Routes, Route } from "react-router-dom";
import Verification from '../pages/Verification';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordVerificationCode from '../pages/ForgotPasswordVerificationCode';
import ForgotPassword_ChoosePassword from '../pages/ForgotPassword_ChoosePassword';
import Table from '../pages/table/table';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import UserAccout from '../pages/userAccount/UserAccout';

const Routers = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<CreateUser />} /> */}
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/createUser' element={<CreateUser />} />
      <Route path='/about' element={<AboutUs />} />
      {/* <Route path='/services' element={<Services />} /> */}
      {/* <Route path='/patients' element={<Patients />} /> */}
      <Route path='/patients/:id' element={<PatientsDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/verification' element={<Verification />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/forgotPasswordVerificationCode' element={<ForgotPasswordVerificationCode />} />
      <Route path='/forgotPassword_ChoosePassword' element={<ForgotPassword_ChoosePassword />} />
      {/* Route path means which page show */}
      <Route path='/contact' element={<Contact />} />
      <Route path='/search' element={<Search />} />
      <Route path='/table' element={<Table />} />
      <Route path='/useraccount' element={<UserAccout />} />
    </Routes>
  )
}

export default Routers;