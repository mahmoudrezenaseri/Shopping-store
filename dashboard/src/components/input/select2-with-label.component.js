import React from 'react'
import {
  CLabel,
  CFormGroup
} from '@coreui/react'
import Select from 'react-select';

const Select2WithLabel = ({ label, inputName, required, onChange, onBlur, value, options, errorsInput }) => (

  <CFormGroup>
    <CLabel htmlFor={inputName}>
      {label}
      {(required) ? <span className="text-danger"><b>*</b></span> : null}
    </CLabel>
    <Select
      placeholder="جستجو"
      name={inputName}
      value={options.filter(function (option) {
        return option.value === value || '';
      })}
      onChange={onChange}
      options={options} />

    {(errorsInput) ? <div className="error-message">{errorsInput}</div> : null}
  </CFormGroup>
)

export default Select2WithLabel