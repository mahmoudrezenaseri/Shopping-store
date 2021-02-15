import React, { useState, useContext } from 'react'
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
  CRow,
  CSpinner,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import Recaptcha from 'react-recaptcha';

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
      console.log(error);
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
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            name="mobile"
                            placeholder="شماره همراه"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mobile} />
                        </CInputGroup>
                        {errors.mobile && touched.mobile ? <div style={style.errorMessageStyle}>{errors.mobile}</div> : null}

                        <CInputGroup className="mt-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="password"
                            placeholder="کلمه عبور"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} />
                        </CInputGroup>
                        {errors.password && touched.password ? <div style={style.errorMessageStyle}>{errors.password}</div> : null}

                        <CInputGroup className="mt-3">
                          <Recaptcha
                            sitekey="6LcILlgaAAAAAGsmNA8LeKbC9xQ7kumIcIe9QJ5a"
                            render="explicit"
                            hl="fa"
                            verifyCallback={verifyCallback}
                            expiredCallback={expiredCallback}
                          />
                        </CInputGroup>

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
                    <Link to="/https://github.com/mahmoudrezenaseri/digikala">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>پروژه در گیت هاب!</CButton>
                    </Link>
                    <Link to="/mahmoudreza.naseri@gmail.com">
                      <CButton color="success" className="mt-3" active tabIndex={-2}>ارتباط با ما</CButton>
                    </Link>
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
