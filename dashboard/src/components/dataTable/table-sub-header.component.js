import React from 'react'
import {
    CRow,
    CCol,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const TableSubHeader = ({ filterText, onFilter }) => (

    <CRow style={{ width: "100%", margin: "0" }}>
        <CCol md="4" style={{ padding: "0" }}>
            <CInputGroup>
                <CInputGroupPrepend>
                    <CInputGroupText>
                        <CIcon content={freeSet.cilZoom} />
                    </CInputGroupText>
                </CInputGroupPrepend>
                <CInput id="search" type="text" placeholder="جستجو" value={filterText} onChange={onFilter} />
            </CInputGroup>
        </CCol>
    </CRow>
)

export default TableSubHeader