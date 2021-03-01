import React, { useEffect, useContext } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AuthContext } from '../context/auth/AuthContext';

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
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
