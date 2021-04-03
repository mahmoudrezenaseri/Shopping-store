import React from 'react'
import {
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

const onInput = (event, letterSize) => {
  if (letterSize === 'cap') {
    event.target.value = ("" + event.target.value).toUpperCase()
  }
  if (letterSize === 'lower') {
    event.target.value = ("" + event.target.value).toLowerCase()
  }
}

const onKeyPress = (event, lang) => {
  if (!/^[^<>]*$/.test(event.key)) {
    event.preventDefault();
  }

  if (lang === 'fa') {
    if (!/^[\u0600-\u06FF\s]+$/.test(event.key)) {
      event.preventDefault();
    }
  }
  if (lang === 'en') {
    if (/^[\u0600-\u06FF\s]+$/.test(event.key)) {
      event.preventDefault();
    }
  }
}

const InputWithLabel = (props) => {
  const { label, id, name, type, required, value, maxlength, lang, letterSize, placeholder, pattern, onChange, onBlur, errorsInput, touchedInput } = props;

  return (
    <CFormGroup>
      <CLabel htmlFor={name}>
        {label}
        {(required) ? <span className="text-danger"><b>*</b></span> : null}
      </CLabel>
      <CInput
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={maxlength}
        value={value}
        onChange={onChange}
        onInput={(event) => onInput(event, letterSize)}
        onBlur={onBlur}
        pattern={pattern}
        onKeyPress={(event) => onKeyPress(event, lang)}
      />

      {errorsInput && touchedInput ? <div className="error-message">{errorsInput}</div> : null}
    </CFormGroup>
  )
}

export default InputWithLabel