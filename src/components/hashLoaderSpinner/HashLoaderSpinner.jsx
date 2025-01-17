import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const HashLoaderSpinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: "100%" }}>
            <HashLoader
                color="#0066ff"  // Loader color
                size={50}         // Size of the loader
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default HashLoaderSpinner;