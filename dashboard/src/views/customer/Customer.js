import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import classes from './css/customer.module.css';

import DataTableServerSide from '../../components/dataTable/table-server-side.component'

const Customer = (props) => {

    let history = useHistory();

    const [tableCollapsed, setTableCollapsed] = React.useState(true)
    const [filterCollapsed, setFilterCollapsed] = React.useState(true)

    const [data, setData] = useState([]);

    return (
        <div className="animated fadeIn">
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6" className="align-self-center ">
                            <b>جستجو</b>
                        </CCol>
                        <CCol sm="6" className="text-left align-self-center">
                            <CButton type="button" shape="pill" color="btn btn-outline-success mr-3 ml-3" onClick={() => { history.push("/customer/add") }}>
                                <CIcon content={freeSet.cilPlus} size={'sm'} />
                                <strong style={{ padding: "0 10px" }}>جدید</strong>
                            </CButton>
                            <CLink className="card-header-action" onClick={() => setFilterCollapsed(!filterCollapsed)}>
                                <CIcon name={filterCollapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} size={'lg'} />
                            </CLink>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCollapse show={filterCollapsed}>
                    <CCardBody>
                        <CRow>
                            <CCol md="12" >
                                سلام
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCollapse>
            </CCard>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6" className="align-self-center ">
                            <b>مشتریان</b>
                        </CCol>
                        <CCol sm="6" className="text-left align-self-center">
                            <CLink className="card-header-action" onClick={() => setTableCollapsed(!tableCollapsed)}>
                                <CIcon name={tableCollapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} size={'lg'} />
                            </CLink>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCollapse show={tableCollapsed}>
                    <CCardBody>
                        <CRow>
                            <CCol md="12" >
                                <CCard>
                                    <CCardBody>
                                        <DataTableServerSide
                                            title="لیست مشتریان" />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCollapse>
            </CCard>
        </div>
    )
}


export default Customer;