import React, { lazy, useContext, useEffect } from 'react'
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

import MainChartExample from '../charts/MainChartExample.js'
import { AuthContext } from '../../context/auth/AuthContext';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

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
