import React from 'react'
import {
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const AddButton = ({ title, onClick }) => {

    return (
        <CButton type="button" shape="pill" color="btn btn-outline-success" className="mr-2 ml-2" onClick={onClick}>
            <CIcon content={freeSet.cilPlus} size={'sm'} />
            <strong style={{ padding: "0 5px" }}>{(title) ? title : "جدید"}</strong>
        </CButton>
    );
}

export default AddButton