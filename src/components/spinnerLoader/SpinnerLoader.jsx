import React from 'react'
import { Vortex } from "react-loader-spinner";

const SpinnerLoader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: "100%" }}>
            <Vortex
                visible={true}
                height="150"
                width="150"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    )
}

export default SpinnerLoader;