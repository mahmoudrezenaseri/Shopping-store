import React, { useState, useContext } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthContext';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
  CSpinner,
} from '@coreui/react'

import InputWithIcon from '../../../components/input/input-with-icon.component';
import InputRecaptcha from '../../../components/input/input-recaptcha.component';
import ErrorMessage from './components/error-message.component';
import LoginInfo from './components/login-info.component';

const loginSchema = yup.object().shape({
  mobile: yup.string().min(11, 'شماره همراه باید دارای 11 رقم باشد').max(11, 'شماره همراه باید دارای 11 رقم باشد').required('لطفا شماره همراه را وارد کنید'),
  password: yup.string().min(6, 'کلمه عبور باید حداقل دارای 6 حرف باشد').max(30, 'کلمه عبور باید حداکثر دارای 30 حرف باشد').required('لطفا کلمه عبور را وارد کنید'),
});

const Login = (props) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerifed, setIsVerifed] = useState(false);
  const { dispatch } = useContext(AuthContext)

  const handleSubmiting = (values, setSubmitting) => {
    axios({
      url: "/",
      method: "post",
      data: {
        query: `
          query{
            login(mobile: "${values.mobile}",password:"${values.password}"){
              token,
            }
          } 
        `
      }
    }).then((response) => {
      if (response.data.errors) {
        const { message } = response.data.errors[0];

        setMessage(message);
        setLoading(false);
        setSubmitting(false);
      }
      else { // success
        const { token } = response.data.data.login;
        dispatch({ type: 'login', payload: token })
        props.history.replace('/dashboard');

        setSubmitting(false);
      }
    }).catch((error) => {
      // console.log(error);
      setMessage(global.config.message.error.fa);
      setLoading(false);
      setSubmitting(false);
    });
  }

  const verifyCallback = (response) => {
    setIsVerifed(true)
  }

  const expiredCallback = (response) => {
    setIsVerifed(false)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h2>پنل مدیریت فروشگاه</h2>
                  <p className="text-muted">ورود به حساب کاربری</p>
                  <Formik
                    initialValues={{ mobile: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      if (!isVerifed) {
                        setMessage('لطفا ریکپچا را تیک بزنید');
                        return false;
                      }
                      setMessage('');
                      setLoading(true);
                      handleSubmiting(values, setSubmitting);
                    }} >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <InputWithIcon
                          className="mt-3"
                          icon="cil-user"
                          inputType="text"
                          inputName="mobile"
                          placeholder="شماره همراه"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobile}
                          errorsInput={errors.mobile}
                          touchedInput={touched.mobile} />

                        <InputWithIcon
                          className="mt-3"
                          icon="cil-lock-locked"
                          inputType="password"
                          inputName="password"
                          placeholder="کلمه عبور"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          errorsInput={errors.password}
                          touchedInput={touched.password} />

                        <InputRecaptcha className="mt-3" verifyCallback={verifyCallback} />

                        <CRow className="mt-4">
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting}>
                              {
                                loading ? <CSpinner size="sm" /> : "ورود"
                              }
                            </CButton>
                          </CCol>
                        </CRow>

                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <LoginInfo />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

        <ErrorMessage message={message} />
      </CContainer>
    </div >
  )
}

export default Login
