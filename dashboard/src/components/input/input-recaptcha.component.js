import React from 'react'
import {
    CInputGroup,
  } from '@coreui/react'
import Recaptcha from 'react-recaptcha';

const InputRecaptcha = ({className, verifyCallback,expiredCallback}) => (
    
   <CInputGroup className={className}>
   <Recaptcha
     sitekey= "6LcILlgaAAAAAGsmNA8LeKbC9xQ7kumIcIe9QJ5a"
     render="explicit"
     hl="fa"
     verifyCallback={verifyCallback}
     expiredCallback={expiredCallback}
   />
 </CInputGroup>
)

export default InputRecaptcha