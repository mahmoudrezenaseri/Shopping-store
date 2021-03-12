import React, { useEffect, useContext } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AuthContext } from '../context/auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import '../assets/css/main.css'

const TheLayout = (props) => {

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: 'check', payload: props });
  }, []);


  const signOut = () => {
    console.log("sign out")
    dispatch({ type: 'sign_out', payload: props });
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader onSignOut={signOut} />
        <div className="c-body">

          <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
