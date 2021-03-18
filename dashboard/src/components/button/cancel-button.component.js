import React from 'react'
import {
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const CancelButton = ({ onClick }) => (
    <CButton type="button" color="danger" onClick={onClick} style={{ margin: "0px 10px" }}>
        <CIcon content={freeSet.cilX} size={'sm'} />
        <strong style={{ padding: "0 10px" }}>لغو</strong>
    </CButton>
)

export default CancelButton