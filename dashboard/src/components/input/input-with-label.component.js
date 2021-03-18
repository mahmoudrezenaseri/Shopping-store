import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

const InputWithLabel = (props) => {
  // console.log(props)
  return (
    <CFormGroup>
      <CLabel htmlFor={props.name}>
        {props.label}
        {(props.required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <CInput
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        pattern={props.pattern}
        maxLength={props.maxlength}
      />

      {props.errorsInput && props.touchedInput ? <div className="error-message">{props.errorsInput}</div> : null}
    </CFormGroup>
  )
}

export default InputWithLabel