
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ToastContainerError from '../components/toastContainerError/ToastContainerError'
import { useNavigate } from 'react-router-dom'
import { DataService } from '../config/dataService/dataService'

const CreateUser = () => {
  const TAG = "CreateUser:()=>";
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({
    category: "",
    clientName: "",
    dob: "",
    email: "",
    usTravelDocsEmail: "",
    dsApplicationNumber: "",
    maritalStatus: "",
    placeOfBirth: "",
    fatherNameDOB: "",
    motherNameDOB: "",
    spouseNameDOB: "",
    contactNumber1: "",
    contactNumber2: "",
    currentAddress: "",
    jobType: "",
    businessName: "",
    businessAddress: "",
    businessContact: "",
    joiningDate: "",
    monthlyIncome: "",
    jobDuties: "",
    educationDetails: "",
    travelHistory: "",
    visaRefusal: "",
    passportIssues: "",
    reference1: "",
    reference2: "",
    postalCode: "",
    interviewLocation: "",
    visaDocumentLocation: "",
    // role: "patient",
  })

  const handleInputChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    sendToBackendCreateUser();
  }


  const sendToBackendCreateUser = async () => {
    if (userFormData.category === "" ||
      userFormData.clientName === "" ||
      userFormData.dob === "" ||
      userFormData.email === "" ||
      userFormData.usTravelDocsEmail === "" ||
      userFormData.dsApplicationNumber === "" ||
      userFormData.maritalStatus === "" ||
      userFormData.placeOfBirth === "" ||
      userFormData.fatherNameDOB === "" ||
      userFormData.motherNameDOB === "" ||
      userFormData.spouseNameDOB === "" ||
      userFormData.contactNumber1 === "" ||
      userFormData.contactNumber2 === "" ||
      userFormData.currentAddress === "" ||
      userFormData.jobType === "" ||
      userFormData.businessName === "" ||
      userFormData.businessAddress === "" ||
      userFormData.businessContact === "" ||
      userFormData.joiningDate === "" ||
      userFormData.monthlyIncome === "" ||
      userFormData.jobDuties === "" ||
      userFormData.educationDetails === "" ||
      userFormData.travelHistory === "" ||
      userFormData.visaRefusal === "" ||
      userFormData.passportIssues === "" ||
      userFormData.reference1 === "" ||
      userFormData.reference2 === "" ||
      userFormData.postalCode === "" ||
      userFormData.interviewLocation === "" ||
      userFormData.visaDocumentLocation === "") {
      toast.error("All fields are required");
      return;
    }
    else {
      // if password matched we fetch api
      console.log("createUser post data", {
        category: userFormData.category,
        clientName: userFormData.clientName,
        dob: userFormData.dob,
        email: userFormData.email,
        usTravelDocsEmail: userFormData.usTravelDocsEmail,
        dsApplicationNumber: userFormData.dsApplicationNumber,
        maritalStatus: userFormData.maritalStatus,
        placeOfBirth: userFormData.placeOfBirth,
        fatherNameDOB: userFormData.fatherNameDOB,
        motherNameDOB: userFormData.motherNameDOB,
        spouseNameDOB: userFormData.spouseNameDOB,
        contactNumber1: userFormData.contactNumber1,
        contactNumber2: userFormData.contactNumber2,
        currentAddress: userFormData.currentAddress,
        jobType: userFormData.jobType,
        businessName: userFormData.businessName,
        businessAddress: userFormData.businessAddress,
        businessContact: userFormData.businessContact,
        joiningDate: userFormData.joiningDate,
        monthlyIncome: userFormData.monthlyIncome,
        jobDuties: userFormData.jobDuties,
        educationDetails: userFormData.educationDetails,
        travelHistory: userFormData.travelHistory,
        visaRefusal: userFormData.visaRefusal,
        passportIssues: userFormData.passportIssues,
        reference1: userFormData.reference1,
        reference2: userFormData.reference2,
        postalCode: userFormData.postalCode,
        interviewLocation: userFormData.interviewLocation,
        visaDocumentLocation: userFormData.visaDocumentLocation,
      })

      try {
        const response = await DataService.post("createUser", userFormData);
        console.log(TAG, "Response Fetched Successfully", response);
        const data = response.data;
        console.log(TAG, 'API Response details: ', data);
        if (data.error === "Invalid Credentials") {
          toast.error("Invalid Credentials");
        }
        else if (data.message === "User Saved Successfully") {
          toast.success(data.message);
          setTimeout(() => {
            navigate("/search", { state: { usersCreatedData: data.usersData } });
          }, 1000)
          // setUserFormData({
          //   category: "",
          //   clientName: "",
          //   dob: "",
          //   email: "",
          //   usTravelDocsEmail: "",
          //   dsApplicationNumber: "",
          //   maritalStatus: "",
          //   placeOfBirth: "",
          //   fatherNameDOB: "",
          //   motherNameDOB: "",
          //   spouseNameDOB: "",
          //   contactNumber1: "",
          //   contactNumber2: "",
          //   currentAddress: "",
          //   jobType: "",
          //   businessName: "",
          //   businessAddress: "",
          //   businessContact: "",
          //   joiningDate: "",
          //   monthlyIncome: "",
          //   jobDuties: "",
          //   educationDetails: "",
          //   travelHistory: "",
          //   visaRefusal: "",
          //   passportIssues: "",
          //   reference1: "",
          //   reference2: "",
          //   postalCode: "",
          //   interviewLocation: "",
          //   visaDocumentLocation: "",
          // });
        }
      } catch (error) {
        console.log(TAG, "Response error Fetching api", error);
        toast.error(error.response.data.error);
      }
    }

  }
  return (
    <section className='px-4 mx-auto max-w-screen-md'>
      <div className='heading text-center'>Start Your Visa Application</div>
      {/* <p className='mb-8 lg:mb-16 font-light text-center text__para'>Got a technical issue? Want to send
        feedback about a beta feature? Let us know.</p> */}
      <p className='mb-8 lg:mb-16 font-light text-center text__para'>Need help with the visa application process or want to share your experience? Feel free to reach out</p>

      <form
        action='#'
        className='space-y-8'
        onSubmit={submitHandler}
      >

        <div>
          <label htmlFor="text" className='form__label'>Category</label>
          <input type="text" name="category"
            placeholder='Select Category'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.category}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Client Name</label>
          <input type="text" name="clientName"
            placeholder='Enter Client Name'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.clientName}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Date of Birth</label>
          <input type="date" name="dob"
            placeholder='Enter Date of Birth'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.dob}
          />
        </div>


        <div>
          <label htmlFor="email" className='form__label'>Your Email</label>
          <input type="email" name="email"
            placeholder='example@gmail.com'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </div>
        <div>
          <label htmlFor="email" className='form__label'>Us Travel Docs Email</label>
          <input type="email" name="usTravelDocsEmail"
            placeholder='example@gmail.com'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.usTravelDocsEmail}
          />
        </div>

        <div>
          <label htmlFor="text" className='form__label'>Ds Application Number</label>
          <input type="text" name="dsApplicationNumber"
            placeholder='Enter your Ds Application Number'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.dsApplicationNumber}
          />
        </div>

        {/* <div>
          <label htmlFor="text" className='form__label'>Marital Status</label>
          <input type="text" name="maritalStatus"
            placeholder='Enter Marital Status'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.maritalStatus}
          />
        </div> */}
        <label className='text-headingColor font-bold text-[16px] leading-7'
          onChange={handleInputChange}
          value={userFormData.maritalStatus}
        >
          Marital Status
          <select
            name="maritalStatus"
            className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
          // onChange={handleInputChange}
          // value={userFormData.maritalStatus}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="other">Other</option>
          </select>
        </label>


        <div>
          <label htmlFor="placeOfBirth" className='form__label'>Place Of Birth</label>
          <input type="text" name="placeOfBirth"
            placeholder='Enter Place Of Birth'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.placeOfBirth}
          />
        </div>



        <div>
          <label htmlFor="text" className='form__label'>Father Name DOB</label>
          <input type="date" name="fatherNameDOB"
            placeholder='Enter Father Name DOB'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.fatherNameDOB}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Mother Name DOB</label>
          <input type="date" name="motherNameDOB"
            placeholder='Enter Mother Name DOB'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.motherNameDOB}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Spouse Name DOB</label>
          <input type="date" name="spouseNameDOB"
            placeholder='Enter Spouse Name DOB'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.spouseNameDOB}
          />
        </div>

        <div>
          <label htmlFor="number" className='form__label'>Contact Number 1</label>
          <input type="number" name="contactNumber1"
            placeholder='Enter your Contact Number 1'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.contactNumber1}
          />
        </div>
        <div>
          <label htmlFor="number" className='form__label'>Contact Number 2</label>
          <input type="number" name="contactNumber2"
            placeholder='Enter your Contact Number 2'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.contactNumber2}
          />
        </div>

        <div>
          <label htmlFor="currentAddress" className='form__label'>Current Address</label>
          <input type="text" name="currentAddress"
            placeholder='Enter your Current Address'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.currentAddress}
          />
        </div>


        <div>
          <label htmlFor="text" className='form__label'>Job Type</label>
          <input type="text" name="jobType"
            placeholder='Enter Job Type'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.jobType}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Business Name</label>
          <input type="text" name="businessName"
            placeholder='Enter Business Name'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.businessName}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Business Address</label>
          <input type="text" name="businessAddress"
            placeholder='Enter Business Address'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.businessAddress}
          />
        </div>


        <div>
          <label htmlFor="number" className='form__label'>Business Contact</label>
          <input type="number" name="businessContact"
            placeholder='Enter your Business Contact'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.businessContact}
          />
        </div>



        <div>
          <label htmlFor="text" className='form__label'>Joining Date</label>
          <input type="date" name="joiningDate"
            placeholder='Enter Joining Date'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.joiningDate}
          />
        </div>


        <div>
          <label htmlFor="number" className='form__label'>Monthly Income</label>
          <input type="number" name="monthlyIncome"
            placeholder='Enter your Monthly Income'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.monthlyIncome}
          />
        </div>

        <div>
          <label htmlFor="text" className='form__label'>Job Duties</label>
          <input type="text" name="jobDuties"
            placeholder='Enter Job Duties'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.jobDuties}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Education Details</label>
          <input type="text" name="educationDetails"
            placeholder='Enter Education Details'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.educationDetails}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Travel History</label>
          <input type="text" name="travelHistory"
            placeholder='Enter Travel History'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.travelHistory}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Visa Refusal</label>
          <input type="text" name="visaRefusal"
            placeholder='Enter Visa Refusal'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.visaRefusal}
          />
        </div>

        <div>
          <label htmlFor="text" className='form__label'>Passport Issues</label>
          <input type="text" name="passportIssues"
            placeholder='Enter Passport Issues'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.passportIssues}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Reference 1</label>
          <input type="text" name="reference1"
            placeholder='Enter Reference 1'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.reference1}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Reference 2</label>
          <input type="text" name="reference2"
            placeholder='Enter Reference 2'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.reference2}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Postal Code</label>
          <input type="text" name="postalCode"
            placeholder='Enter Postal Code'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.postalCode}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Interview Location</label>
          <input type="text" name="interviewLocation"
            placeholder='Enter Interview Location'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.interviewLocation}
          />
        </div>
        <div>
          <label htmlFor="text" className='form__label'>Visa Document Location</label>
          <input type="text" name="visaDocumentLocation"
            placeholder='Enter Visa Document Location'
            className='form__input mt-1'
            onChange={handleInputChange}
            value={userFormData.visaDocumentLocation}
          />
        </div>

        <button type='submit' className='btn rounded sm:w-fit'>Submit</button>
      </form>

      <ToastContainerError />

    </section>
  )
}

export default CreateUser;