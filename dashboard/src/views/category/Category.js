import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CRow,
    CBadge,
    CDataTable,
    CCol
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import usersData from '../users/UsersData'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['name', 'registered', 'role', 'status']

const Category = (props) => {

    let history = useHistory();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    })

    function fetchData() {

    }

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

                <CCardBody>

                    <CRow>
                        <CCol md="12" >
                            <CCard>
                                <CCardBody>
                                    <CDataTable
                                        items={usersData}
                                        fields={fields}
                                        striped
                                        itemsPerPage={5}
                                        pagination
                                        scopedSlots={{
                                            'status':
                                                (item) => (
                                                    <td>
                                                        <CBadge color={getBadge(item.status)}>
                                                            {item.status}
                                                        </CBadge>
                                                    </td>
                                                )

                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>

            </CCard>
        </div>
    )
}

export default Category;