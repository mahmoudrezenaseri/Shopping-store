import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'
import DatePicker from 'react-datepicker2';

const DateWithLabel = (props) => {
  const { label, name, required, value, onChange } = props
  return (
    <CFormGroup>
      <CLabel htmlFor={name}>
        {label}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <DatePicker
        isGregorian={false}
        name={name}
        onChange={onChange}
        value={value}
        timePicker={false}
        persianDigits={false}
      />
    </CFormGroup>
  )
}

export default DateWithLabel