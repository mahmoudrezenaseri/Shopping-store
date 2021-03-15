import React from 'react'
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CLink,
    CRow,
    CCol,
    CCollapse
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const CustomCard = (props) => {

    const [collapsed, setCollapsed] = React.useState(true)

    const getComponent = (key) => {
        return props.children.filter((comp) => {
            return comp.key === key;
        });
    }

    return (
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol sm="6" className="align-self-center ">
                        <b>{props.title}</b>
                    </CCol>
                    <CCol sm="6" className="text-left align-self-center">

                        {getComponent('custom-button')}

                        <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} size={'lg'} />
                        </CLink>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCollapse show={collapsed}>
                <CCardBody>
                    <CRow>
                        <CCol md="12" >
                            {getComponent('card-info')}
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCollapse>
        </CCard>
    );
}

export default CustomCard