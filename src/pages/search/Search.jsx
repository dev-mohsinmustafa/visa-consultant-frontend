import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./search.css";

const Searchbar = () => {
  const TAG = "Search:()=>";
  const location = useLocation();
  const { usersCreatedData } = location.state || {};
  // { state: { usersCreatedData: data.usersData } };

  // search functionality 
  // set data in storage
  const [savedData, setSavedData] = useState(null);

  // jese he page load hoga 
  useEffect(() => {
    // console.log(TAG, "Location state:", location.state);
    if (usersCreatedData) {
      localStorage.setItem("usersCreatedData", JSON.stringify(usersCreatedData));
      console.log(TAG, "usersCreatedData in useEffect():", usersCreatedData);
    } else {
      const storedData = localStorage.getItem('usersCreatedData');
      if (storedData) {
        setSavedData(JSON.parse(storedData));
        console.log(TAG, 'usersCreatedData loaded from localStorage:', JSON.parse(storedData));
      }
      else {
        console.log(TAG, "usersCreatedData is empty or undefined");
      }
    }
  }, [usersCreatedData])
  // const savedData = JSON.parse(localStorage.getItem("usersCreatedData"));
  // if (savedData) {
  //   console.log("Retrieved data from localStorage:", savedData);
  // }
  // useEffect(() => {
  // }, [savedData])


  // const { category, clientName, dob, email, usTravelDocsEmail, dsApplicationNumber, maritalStatus,
  //   placeOfBirth,
  //   fatherNameDOB,
  //   motherNameDOB,
  //   spouseNameDOB,
  //   contactNumber1,
  //   contactNumber2,
  //   currentAddress,
  //   jobType,
  //   businessName,
  //   businessAddress,
  //   businessContact,
  //   joiningDate,
  //   monthlyIncome,
  //   jobDuties,
  //   educationDetails,
  //   travelHistory,
  //   visaRefusal,
  //   passportIssues,
  //   reference1,
  //   reference2,
  //   postalCode,
  //   interviewLocation,
  //   visaDocumentLocation,
  // } = savedData;

  // State to hold the search text
  const [searchText, setSearchText] = useState("");
  // State to hold the selected property
  const [selectedProperty, setSelectedProperty] = useState("clientName");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // const newText = e.target.value;
    // setSearchText(newText);
    // localStorage.setItem("userSearchText", newText);
  };

  // useEffect(() => {
  //   const storedSearchText = localStorage.getItem("userSearchText");
  //   if (storedSearchText) {
  //     setSearchText(storedSearchText);
  //     console.log("TAG,", storedSearchText);

  //   }
  // }, []);


  // Function to handle property selection change
  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  }

  // Filter the data based on the search text and selectedProperty
  // const isSearchMatch = usersCreatedData[selectedProperty]?.toString().toLowerCase().includes(searchText.toLowerCase());
  const isSearchMatch = savedData && savedData[selectedProperty]?.toString().toLowerCase().includes(searchText.toLowerCase());

  return (
    <>
      {/* <div className='searchbarContainer'>
        <div className='searchbar'>
          <div>
            <input type="text" name="" id="" className='inputField'
              // placeholder='search by name'
              placeholder={`search by ${selectedProperty}`}
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <select value={selectedProperty} onChange={handlePropertyChange}>
              <option value="category">Category</option>
              <option value="clientName">Client Name</option>
              <option value="dob">Date of Birth</option>
              <option value="email">Email</option>
              <option value="usTravelDocsEmail">Us Travel Docs Email</option>
              <option value="dsApplicationNumber">DS Application Number</option>
              <option value="maritalStatus">Marital Status</option>
              <option value="placeOfBirth">Place of Birth</option>
              <option value="fatherNameDOB">Father Name DOB</option>
              <option value="motherNameDOB">Mother Name DOB</option>
              <option value="spouseNameDOB">Spouse Name DOB</option>
              <option value="contactNumber1">Contact Number 1</option>
              <option value="contactNumber2">Contact Number 2</option>
              <option value="currentAddress">Current Address</option>
              <option value="jobType">Job Type</option>
              <option value="businessName">Business Name</option>
              <option value="businessAddress">Business Address</option>
              <option value="businessContact">Business Contact</option>
              <option value="joiningDate">Joining Date</option>
              <option value="monthlyIncome">Monthly Income</option>
              <option value="jobDuties">Job Duties</option>
              <option value="educationDetails">Education Details</option>
              <option value="travelHistory">Travel History</option>
              <option value="visaRefusal">Visa Refusal</option>
              <option value="passportIssues">Passport Issues</option>
              <option value="reference1">Reference 1</option>
              <option value="reference2">Reference 2</option>
              <option value="postalCode">Postal Code</option>
              <option value="interviewLocation">Interview Location</option>
              <option value="visaDocumentLocation">Visa Documentation Loaction</option>

            </select>
          </div>
        </div>
      </div> */}

      {/* <div className='tableContainer'>
        <table border="1">
          <thead>
            <tr>
              <th>Category</th>
              <th>Client Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>usTravelDocsEmail</th>
              <th>dsApplicationNumber</th>
              <th>Marital Status</th>
              <th>Place Of Birth</th>
              <th>Father Name DOB</th>
              <th>Mother Name DOB</th>
              <th>Spouse Name DOB</th>
              <th>Contact Number 1</th>
              <th>Contact Number 2</th>
              <th>Current Address</th>
              <th>Job Type</th>
              <th>Business Name</th>
              <th>Business Address</th>
              <th>Business Contact</th>
              <th>Joining Date</th>
              <th>Monthly Income</th>
              <th>Job Duties</th>
              <th>Education Details</th>
              <th>Travel History</th>
              <th>Visa Refusal</th>
              <th>Passport Issues</th>
              <th>Reference 1</th>
              <th>Reference 2</th>
              <th>Postal Code</th>
              <th>Interview Location</th>
              <th>Visa Documentation Loaction</th>
            </tr>
          </thead>
          <tbody>

            {isSearchMatch ? (
              <tr>
                <td>{usersCreatedData.category}</td>
                <td>{usersCreatedData.clientName}</td>
                <td>{usersCreatedData.dob}</td>
                <td>{usersCreatedData.email}</td>
                <td>{usersCreatedData.usTravelDocsEmail}</td>
                <td>{usersCreatedData.dsApplicationNumber}</td>
                <td>{usersCreatedData.maritalStatus}</td>
                <td>{usersCreatedData.placeOfBirth}</td>
                <td>{usersCreatedData.fatherNameDOB}</td>
                <td>{usersCreatedData.motherNameDOB}</td>
                <td>{usersCreatedData.spouseNameDOB}</td>
                <td>{usersCreatedData.contactNumber1}</td>
                <td>{usersCreatedData.contactNumber2}</td>
                <td>{usersCreatedData.currentAddress}</td>
                <td>{usersCreatedData.jobType}</td>
                <td>{usersCreatedData.businessName}</td>
                <td>{usersCreatedData.businessAddress}</td>
                <td>{usersCreatedData.businessContact}</td>
                <td>{usersCreatedData.joiningDate}</td>
                <td>{usersCreatedData.monthlyIncome}</td>
                <td>{usersCreatedData.jobDuties}</td>
                <td>{usersCreatedData.educationDetails}</td>
                <td>{usersCreatedData.travelHistory}</td>
                <td>{usersCreatedData.visaRefusal}</td>
                <td>{usersCreatedData.passportIssues}</td>
                <td>{usersCreatedData.reference1}</td>
                <td>{usersCreatedData.reference2}</td>
                <td>{usersCreatedData.postalCode}</td>
                <td>{usersCreatedData.interviewLocation}</td>
                <td>{usersCreatedData.visaDocumentLocation}</td>
                <td>{usersCreatedData.currentAddress}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div > */}

      {/* Search Bar 2 */}
      <div className="">
        <form class="max-w-md mx-auto">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              placeholder={`search by ${selectedProperty}`}
              value={searchText}
              onChange={handleSearchChange}
            />
            {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
        </form>

        <form class="max-w-sm mx-auto">
          <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
          <select id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedProperty} onChange={handlePropertyChange}
          >
            {/* <option selected>Search...</option> */}
            <option value="category">Category</option>
            <option value="clientName">Client Name</option>
            <option value="dob">Date of Birth</option>
            <option value="email">Email</option>
            <option value="usTravelDocsEmail">Us Travel Docs Email</option>
            <option value="dsApplicationNumber">DS Application Number</option>
            <option value="maritalStatus">Marital Status</option>
            <option value="placeOfBirth">Place of Birth</option>
            <option value="fatherNameDOB">Father Name DOB</option>
            <option value="motherNameDOB">Mother Name DOB</option>
            <option value="spouseNameDOB">Spouse Name DOB</option>
            <option value="contactNumber1">Contact Number 1</option>
            <option value="contactNumber2">Contact Number 2</option>
            <option value="currentAddress">Current Address</option>
            <option value="jobType">Job Type</option>
            <option value="businessName">Business Name</option>
            <option value="businessAddress">Business Address</option>
            <option value="businessContact">Business Contact</option>
            <option value="joiningDate">Joining Date</option>
            <option value="monthlyIncome">Monthly Income</option>
            <option value="jobDuties">Job Duties</option>
            <option value="educationDetails">Education Details</option>
            <option value="travelHistory">Travel History</option>
            <option value="visaRefusal">Visa Refusal</option>
            <option value="passportIssues">Passport Issues</option>
            <option value="reference1">Reference 1</option>
            <option value="reference2">Reference 2</option>
            <option value="postalCode">Postal Code</option>
            <option value="interviewLocation">Interview Location</option>
            <option value="visaDocumentLocation">Visa Documentation Loaction</option>
          </select>
        </form>

      </div>
      {/*  */}

      <div className="">
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">Applicant Information</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
        </div>

        {isSearchMatch ? (

          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Category</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.category}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Client Name</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.clientName}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Date of Birth</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.dob}</dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Us Travel Docs Email</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.usTravelDocsEmail}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Ds Application Number</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.dsApplicationNumber}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Marital Status</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.maritalStatus}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Place Of Birth</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.placeOfBirth}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Father Name DOB</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.fatherNameDOB}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Mother Name DOB</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.motherNameDOB}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Spoue Name DOB</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.spouseNameDOB}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Contact Number 1</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.contactNumber1}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Contact Number 2</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.contactNumber2}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Current Address</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.currentAddress}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Job Type</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.jobType}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Business Name</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.businessName}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Business Address</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.businessAddress}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Business Contact</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.businessContact}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Joining Date</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.joiningDate}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Monthly Income</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.monthlyIncome}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Job Duties</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.jobDuties}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Education Details</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.educationDetails}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Travel History</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.travelHistory}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Visa Refusal</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.visaRefusal}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Passport Issues</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.passportIssues}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Reference 1</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.reference1}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Reference 2</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.reference2}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Postal Code</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.postalCode}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Interview Location</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.interviewLocation}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Visa Document Location</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{savedData.visaDocumentLocation}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                  qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                  pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
              </div>

            </dl>
          </div>

        ) : (
          <tr>
            <td colSpan="3">No Data Found</td>
          </tr>
        )}

      </div>

    </>
  )
}

export default Searchbar;