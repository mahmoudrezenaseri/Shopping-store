import React from 'react'
import {
  CLabel,
  CFormGroup
} from '@coreui/react'
import Select from 'react-select';

const Select2WithLabel = (props) => {
  const { label, name, required, onChange, onBlur, value, options, errorsInput, touchedInput } = props;

  return (
    < CFormGroup >
      <CLabel htmlFor={name}>
        {label}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>

      <Select
        placeholder="جستجو"
        name={name}
        value={options.filter(function (option) {
          return option.value === value || '';
        })}
        onChange={onChange}
        options={options} />

      { (errorsInput && touchedInput) ? <div className="error-message">{errorsInput}</div> : null}
    </CFormGroup >
  )
}

export default Select2WithLabel