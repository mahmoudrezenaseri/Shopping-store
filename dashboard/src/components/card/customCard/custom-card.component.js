import React from 'react'
import {
    CCardFooter,
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

                        {getComponent('card-header-buttons')}

                        <CLink className="card-header-action mr-2" onClick={() => setCollapsed(!collapsed)} >
                            <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} size={'lg'} />
                        </CLink>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCollapse show={collapsed}>
                <CCardBody>
                    <CRow>
                        <CCol md="12" >
                            {getComponent('card-body')}
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCollapse>
        </CCard>
    );
}

export default CustomCard