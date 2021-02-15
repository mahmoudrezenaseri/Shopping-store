import React, { Component, useContext, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CSpinner,
    CAlert,
    CProgress
} from '@coreui/react';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';

const AddMedia = (props) => {
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        dispatch({ type: 'check', payload: props })
    }, [])

    return (
        <div className="animated fadeIn">
            <CCard>
                <CCardHeader>
                    <h6>افزودن پرونده چندرسانه ای</h6>
                </CCardHeader>

                <CCardBody>
                    <CRow>
                        hello world
                </CRow>
                </CCardBody>
                <CCardFooter>

                </CCardFooter>
            </CCard>
        </div>
    )
}

export default AddMedia;