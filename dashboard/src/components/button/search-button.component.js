import React from 'react'
import {
    CSpinner,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const buttonContent = () => {
    return (
        <>
            <CIcon content={freeSet.cilZoom} size={'sm'} />
            <strong style={{ padding: "0 10px" }}>جستجو</strong>
        </>)
}

const SearchButton = ({ onSubmit, loading, disabled }) => (
    <CButton type="submit" color="warning" onClick={onSubmit} disabled={disabled}>
        {
            loading ? <CSpinner size="sm" /> : buttonContent()
        }
    </CButton>
)

export default SearchButton