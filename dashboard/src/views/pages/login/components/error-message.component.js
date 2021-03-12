import React from 'react'
import {
    CCol,
    CRow,
    CAlert
} from '@coreui/react'

function style(message) {
    let display = (message == "") ? { display: "none" } : { display: "flex" }

    return display;
};

const ErrorMessage = ({ message }) => (

    <CRow className="justify-content-center mt-4" style={style(message)}>
        <CCol md="8">
            <CAlert color="danger" closeButton>
                {message}
            </CAlert>
        </CCol>
    </CRow >
)

export default ErrorMessage