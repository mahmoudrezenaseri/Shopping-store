import React from 'react'
import {
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const AddButton = ({ onClick }) => {
    return (
        <CButton type="button" shape="pill" color="btn btn-outline-success mr-3 ml-3" onClick={onClick}>
            <CIcon content={freeSet.cilPlus} size={'sm'} />
            <strong style={{ padding: "0 5px" }}>جدید</strong>
        </CButton>
    );
}

export default AddButton