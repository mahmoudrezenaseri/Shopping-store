import React from 'react'
import {
  CLabel,
  CFormGroup,
  CSelect
} from '@coreui/react'

const SelectWithLabel = ({ label, inputName, required, onChange, onBlur, value, options, errorsInput, touchedInput }) => (

  <CFormGroup>
    <CLabel htmlFor={inputName}>
      {label}

      {(required) ? <span className="text-danger"><b>*</b></span> : null}
    </CLabel>
    <CSelect
      custom
      name={inputName}
      value={value}
      onChange={onChange}
      onBlur={onBlur}>
      {
        options.map((item, key) => {
          return (
            <option key={key} value={item.value}>{item.label}</option>
          )
        })
      }
    </CSelect>

    {errorsInput && touchedInput ? <div className="error-message">{errorsInput}</div> : null}
  </CFormGroup>
)

export default SelectWithLabel