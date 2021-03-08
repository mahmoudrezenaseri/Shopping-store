import React from 'react'
import {
    CSpinner,
    CButton
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const submitButtonContent = (icon,inputText) => {
    return (
        <>
            <CIcon content={(icon) ? icon : freeSet.cilSave} size={'lg'} />
            <strong style={{padding:"0 10px"}}>{inputText}</strong>
        </>)
}

const SubmitButton = ({onSubmit,loading,icon,inputText,disabled}) => (
    <CButton type="submit" color="primary" onClick={onSubmit} disabled={disabled}>
        {
            loading ? <CSpinner size="sm" /> : submitButtonContent(icon,inputText)
        }
    </CButton>  
)

export default SubmitButton