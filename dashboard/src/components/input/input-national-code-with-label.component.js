import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

const InputNationalCodeWithLabel = (props) => {

  return (
    <CFormGroup>
      <CLabel htmlFor={props.name}>
        کد ملی
        {(props.required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <CInput
        id={props.id}
        name={props.name}
        label="کد ملی"
        placeholder={props.placeholder}
        type="string"
        maxLength="10"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />

      {props.errorsInput && props.touchedInput ? <div className="error-message">{props.errorsInput}</div> : null}
    </CFormGroup>
  )
}

export default InputNationalCodeWithLabel