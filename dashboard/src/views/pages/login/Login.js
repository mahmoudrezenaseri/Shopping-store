import React, { useState, useContext, useEffect } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow, CLink,
  CSpinner,
  CAlert
} from '@coreui/react'
import axios from 'axios';

import InputWithIcon from '../../components/input-with-icon.component';
import InputRecaptcha from '../../components/input-recaptcha.component';

const loginSchema = yup.object().shape({
  mobile: yup.string().min(11, 'شماره همراه باید دارای 11 رقم باشد').max(11, 'شماره همراه باید دارای 11 رقم باشد').required('لطفا شماره همراه را وارد کنید'),
  password: yup.string().min(6, 'کلمه عبور باید حداقل دارای 6 حرف باشد').max(30, 'کلمه عبور باید حداکثر دارای 30 حرف باشد').required('لطفا کلمه عبور را وارد کنید'),
});

const style = {
  errorMessageStyle: { margin: '5px 0px', color: 'red' }
}

const showErrorMessage = (message) => {
  if (message != '') {
    return (<CRow className="justify-content-center mt-4">
      <CCol md="8">
        <CAlert color="danger" closeButton>
          {message}
        </CAlert>
      </CCol>
    </CRow>)
  }
}

const Login = (props) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerifed, setIsVerifed] = useState(false);
  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    dispatch({ type: 'check_login_page', payload: props })
  }, [])

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
                          value={values.mobile} />

                        {errors.mobile && touched.mobile ? <div style={style.errorMessageStyle}>{errors.mobile}</div> : null}

                        <InputWithIcon
                          className="mt-3"
                          icon="cil-lock-locked"
                          inputType="password"
                          inputName="password"
                          placeholder="کلمه عبور"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password} />

                        {errors.password && touched.password ? <div style={style.errorMessageStyle}>{errors.password}</div> : null}

                        <InputRecaptcha className="mt-3" verifyCallback={verifyCallback} expiredCallback={expiredCallback} />

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
                  <h4>تکنولوژی ها استفاده شده : </h4>
                  <div>
                    <h5>ReactJs</h5>
                    <h5>Node.js</h5>
                    <h5>React Native</h5>

                    <CLink className="c-subheader-nav-link" href="https://github.com/mahmoudrezenaseri/digikala">
                      <CButton color="primary" className="mt-3" active tabIndex={-2}>پروژه در گیت هاب!</CButton>
                    </CLink>
                    <CLink className="c-subheader-nav-link" href="mahmoudreza.naseri@gmail.com">
                      <CButton color="success" className="mt-3" active tabIndex={-2}>ارتباط با ما</CButton>
                    </CLink>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

        {showErrorMessage(message)}
      </CContainer>
    </div >
  )
}

export default Login
