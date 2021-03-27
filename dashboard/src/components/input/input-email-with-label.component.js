import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

const InputEmailWithLabel = (props) => {

  return (
    <CFormGroup>
      <CLabel htmlFor={props.name}>
        ایمیل
        {(props.required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <CInput
        id={props.id}
        name={props.name}
        label="ایمیل"
        type="string"
        maxlength="100"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyPress={(event) => {
          if (!/[A-Za-z0-9@._-]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />

      {props.errorsInput && props.touchedInput ? <div className="error-message">{props.errorsInput}</div> : null}
    </CFormGroup>
  )
}

export default InputEmailWithLabel