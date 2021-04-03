import React from 'react'
import {
  CLabel,
  CFormGroup,
  CSwitch,
  CCol
} from '@coreui/react'

const SwitchWithLabel = (props) => {
  const { id, name, label, color, required, labelOn, labelOff, value, onChange, onBlur, errorsInput, touchedInput } = props;

  return (
    <CFormGroup row>
      <CCol tag="label" sm="12" className="col-form-label">
        {(label) ? label : "وضعیت : "}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CCol>
      <CCol sm="12">
        <CSwitch
          className="mr-1"
          id={id}
          name={name}
          color={(color) ? color : "primary"}
          labelOn={(labelOn) ? labelOn : "فعال"}
          labelOff={(labelOff) ? labelOff : ""}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          checked={value}
        />
      </CCol>
      {errorsInput && touchedInput ? <div className="error-message">{errorsInput}</div> : null}
    </CFormGroup>
  )
}

export default SwitchWithLabel