import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'
import DatePicker from 'react-datepicker2';

const customInputChange = (event) => {
  if (!/^[1-4]\d{3}\/(([1-6]\/((3[0-1])|([1-2][0-9])|([1-9])))|((1[0-2]|([7-9]))\/(30|([1-2][0-9])|([1-9]))))$/.test(event.key)) {
    event.preventDefault();
  }
}

const DateWithLabel = (props) => {
  const { label, name, required, placeholder, value, onChange, onInputChange, errorsInput, touchedInput } = props
  return (
    <CFormGroup>
      <CLabel htmlFor={name}>
        {label}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <DatePicker
        className="date"
        isGregorian={false}
        setTodayOnBlur={false}
        name={name}
        placeholder={(placeholder) ? placeholder : "__/__/____"}
        onChange={onChange}
        onInputChange={onInputChange}
        value={value}
        timePicker={false}
        persianDigits={false}
      />

      {errorsInput && touchedInput ? <div className="error-message">{errorsInput}</div> : null}
    </CFormGroup>

  )
}

export default DateWithLabel