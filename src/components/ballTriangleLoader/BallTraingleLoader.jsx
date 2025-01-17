import React from 'react'
import { BallTriangle, Vortex } from "react-loader-spinner";

const BallTriangleLoader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: "100%" }}>
            {/* <Vortex
                visible={true}
                height="150"
                width="150"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            /> */}
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default BallTriangleLoader;