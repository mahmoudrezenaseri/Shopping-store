import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

const InputWithLabel = ({ label, inputType, inputName, required, placeholder, onChange, onBlur, value, errorsInput, touchedInput }) => (

  <CFormGroup>
    <CLabel htmlFor={inputName}>
      {label}
      {(required) ? <span className="text-danger"><b>*</b></span> : null}
    </CLabel>
    <CInput
      type={inputType}
      id={inputName}
      name={inputName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur} />

    {errorsInput && touchedInput ? <div className="error-message">{errorsInput}</div> : null}
  </CFormGroup>
)

export default InputWithLabel