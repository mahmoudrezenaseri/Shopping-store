import React from 'react'
import {
    CRow,
    CCol,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const TableSubHeader = (props) => {

    const { hasSearch, filterText, onFilter, onDelete } = props;

    return (
        <CRow style={{ width: "100%", margin: "0" }}>
            <CCol md="4" style={{ padding: "0" }}>
                {
                    hasSearch === true ?
                        <CInputGroup>
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon content={freeSet.cilZoom} />
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="search" type="text" placeholder="جستجو" value={filterText} onChange={onFilter} />
                        </CInputGroup> : null
                }
            </CCol>
            <CCol md="8" className="text-left" style={{ padding: "0" }}>
                <CButton type="button" color="btn btn-danger" className="mr-2 ml-2" onClick={onDelete}>
                    <CIcon content={freeSet.cilBan} size={'sm'} />
                    <span style={{ padding: "0 5px" }}>حذف</span>
                </CButton>
            </CCol>
        </CRow>
    )
}

export default TableSubHeader