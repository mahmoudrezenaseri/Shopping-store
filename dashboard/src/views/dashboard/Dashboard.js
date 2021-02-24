import React, { lazy, useState, useContext, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AuthContext } from '../../context/auth/AuthContext';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = (props) => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: 'check', payload: props })
  }, [])

  return (
    <>
      <WidgetsDropdown />

    </>
  )
}

export default Dashboard
