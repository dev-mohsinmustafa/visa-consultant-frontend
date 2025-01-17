import React from 'react'
import { ToastContainer } from 'react-toastify';

const ToastContainerError = () => {
  return (
    <div>
          <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="colored" 
            />
    </div>
  )
}

export default ToastContainerError;