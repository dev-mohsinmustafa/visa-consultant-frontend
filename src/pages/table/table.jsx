import React, { useEffect, useState } from 'react';
import dataTable from "../data/data.json";
// tableStyling
import "./table.css";

function Table() {
    // Example for showing data:
    //     const dataTable = [{
    //         name: "1",
    //         phone: "2",
    //         email: "Email",
    //         address: "Address",
    // }];


    // State to hold the search text
    const [searchText, setSearchText] = useState("");
    // State to hold the selected property
    const [selectedProperty, setSelectedProperty] = useState("name");

    // Function to handle search input change
    const handleSearchChange = (e) => {
        // console.log("onChangehandleSearchChangeFunction();", e.target.value);
        setSearchText(e.target.value);
    };

    // Function to handle property selection change
    const handlePropertyChange = (e) => {
        // console.log("onChangehandlePropertyChangeFunction();", e.target.value);
        setSelectedProperty(e.target.value);
    }

    // Filter the data based on the search text and selectedProperty
    const filteredDataTable = dataTable.filter((item) => {
        // console.log("filterDataTabeITEMS()=>; is : ", item)
        // console.log("filterDataTabeITEMS(); ID is : ", item.id)
        // return item.name.toLowerCase().includes(searchText.toLowerCase());
        return item[selectedProperty].toString().toLowerCase().includes(searchText.toLowerCase());

        // Find By using ID:
        // return item.id.toString().includes(searchText);

    })

    return (
        <>
            <div className='searchbarContainer'>
                <div className='searchbar'>
                    <div>
                       Data Table : 
                    </div>
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
                            <option value="name">Name</option>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                            <option value="address">Address</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='tableContainer'>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredDataTable.length > 0 ? filteredDataTable.map((item, index) => {
                                // console.log("tableData==>():", item)
                                return (
                                    <tr key={index}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                    </tr>
                                )
                            })
                                :
                                <tr>
                                    <td colSpan="5">No Data Found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default Table;