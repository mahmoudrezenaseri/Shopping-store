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
      <CCol tag="label" sm="3" md="2" xlg="1" className="col-form-label">
        {(label) ? label : "وضعیت : "}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CCol>
      <CCol sm="9" md="10" xlg="11">
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