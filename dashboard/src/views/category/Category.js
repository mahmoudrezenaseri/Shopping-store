import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CForm,
    CInput,
    CRow,
    CAlert,
    CFormGroup,
    CCol
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const Category = (props) => {

    let history = useHistory();
    const [loading, setLoading] = useState(false)

    return (
        <div className="animated fadeIn">
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />

            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6">
                            <h6>دسته بندی ها</h6>
                        </CCol>
                        <CCol sm="6" className="text-left">
                            <CButton type="submit" color="success" onClick={() => { history.push("/category/add") }}>
                                <CIcon content={freeSet.cilPlus} size={'sm'} />
                                <strong style={{ padding: "0 10px" }}>جدید</strong>
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>hello</CCardBody>

            </CCard>
        </div>
    )
}

export default Category;