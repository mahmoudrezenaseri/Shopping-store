import React, { useState, useEffect } from 'react';
import {
    CSelect,
    CLabel,
    CFormGroup,
    CRow,
    CCol,
    CForm,
    CListGroupItem,
    CListGroup
} from '@coreui/react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment-jalaali'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import classes from './css/user.module.css';
import { validateDateEntry } from './func';

import CustomCard from '../../components/card/customCard/custom-card.component'
import InputWithLabel from '../../components/input/input-with-label.component';
import InputMobileWithLabel from '../../components/input/input-mobile-with-label.component';
import InputNationalCodeWithLabel from '../../components/input/input-national-code-with-label.component';
import CancelButton from '../../components/button/cancel-button.component';
import DateWithLabel from '../../components/input/date-with-label.component';
import SubmitButton from 'src/components/button/submit-button.component';
import { boolean } from 'yup/lib/locale';

const schema = yup.object().shape({
    firstName: yup.string().max(50, 'نام باید حداکثر دارای 50 کاراکتر باشد').required('لطفا نام را وارد کنید'),
    lastName: yup.string().max(50, 'نام خانوادگی باید حداکثر دارای 50 کاراکتر باشد').required('لطفا نام خانوادگی را وارد کنید'),
    mobile: yup.string().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/, 'فرمت موبایل اشتباه است')
        .min(11, 'موبایل باید حداقل دارای 11 کاراکتر باشد').max(11, 'موبایل باید حداکثر دارای 11 کاراکتر باشد').required('لطفا موبایل را وارد کنید'),
    gender: yup.boolean().required('لطفا جنسیت را وارد کنید'),
    nationalCode: yup.string().max(10, 'کد ملی باید حداکثر دارای 10 کاراکتر باشد').min(10, 'کد ملی باید حداقل دارای 10 کاراکتر باشد').required('لطفا کد ملی را وارد کنید'),
});

const AddUser = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const submitForm = (values, setSubmitting) => {
        setLoading(false);
        setSubmitting(false);
    }

    return (
        <div className="animated fadeIn">
            <CustomCard title="افزودن کاربر جدید">

                <div key="card-header-buttons"></div>
                <div key="card-body">
                    <Formik
                        initialValues={{ firstName: '', lastName: '', mobile: '', gender: '', nationalCode: '', birthday: null }}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            setLoading(true);

                            submitForm(values, setSubmitting);
                        }} >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                            resetForm
                        }) => (
                            <CForm onSubmit={handleSubmit}>

                                <CListGroup accent>
                                    <CListGroupItem accent="primary">
                                        <h5>
                                            <CIcon content={freeSet.cilInfo} size={'lg'} /> عمومی
                                         </h5>
                                        <br />
                                        <CRow>
                                            <CCol xs="3">
                                                <InputWithLabel
                                                    label="نام"
                                                    type="text"
                                                    name="firstName"
                                                    required={true}
                                                    placeholder="نام را وارد کنید"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstName}
                                                    errorsInput={errors.firstName}
                                                    touchedInput={touched.firstName} />
                                            </CCol>
                                            <CCol xs="3">
                                                <InputWithLabel
                                                    label="نام خانوادگی"
                                                    type="text"
                                                    name="lastName"
                                                    required={true}
                                                    placeholder="نام خانوادگی را وارد کنید"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                    errorsInput={errors.lastName}
                                                    touchedInput={touched.lastName} />
                                            </CCol>
                                            <CCol xs="3">
                                                <InputNationalCodeWithLabel
                                                    name="nationalCode"
                                                    placeholder="کد ملی را وارد کنید"
                                                    required={true}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.nationalCode}
                                                    errorsInput={errors.nationalCode}
                                                    touchedInput={touched.nationalCode} />
                                            </CCol>
                                            <CCol xs="3">
                                                <CFormGroup>
                                                    <CLabel htmlFor="select">
                                                        جنسیت
                                                <span className="text-danger"><b>*</b></span>
                                                    </CLabel>

                                                    <CSelect custom
                                                        name="gender"
                                                        value={values.gender}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}>

                                                        <option value={''}>انتخاب کنید</option>
                                                        <option value={0}>مرد</option>
                                                        <option value={1}>زن</option>
                                                    </CSelect>

                                                    {errors.gender && touched.gender ? <div className="error-message">{errors.gender}</div> : null}
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="3">
                                                <DateWithLabel
                                                    label="تاریخ تولد"
                                                    name="birthday"
                                                    onChange={e => setFieldValue("birthday", e)}
                                                    onInputChange={(e) => {
                                                        if (!e.target.value) { setFieldValue("birthday", null) }
                                                    }}
                                                    value={values.birthday}
                                                    errorsInput={errors.birthday}
                                                    touchedInput={touched.birthday} />
                                            </CCol>
                                        </CRow>
                                    </CListGroupItem>
                                    <CListGroupItem accent="warning">
                                        <h5>
                                            <CIcon content={freeSet.cilMap} size={'lg'} /> تماس
                                         </h5>
                                        <br />
                                        <CRow>
                                            <CCol xs="3">
                                                <InputMobileWithLabel
                                                    name="mobile"
                                                    placeholder="موبایل را وارد کنید"
                                                    required={true}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.mobile}
                                                    errorsInput={errors.mobile}
                                                    touchedInput={touched.mobile} />
                                            </CCol>
                                        </CRow>
                                    </CListGroupItem>
                                </CListGroup>

                                <hr />
                                <CRow>
                                    <CCol xs="12">
                                        <SubmitButton inputText="ثبت" loading={loading} disabled={isSubmitting} />
                                        <CancelButton onClick={() => { resetForm(); }} />
                                    </CCol>
                                </CRow>
                            </CForm>

                        )}
                    </Formik>
                </div>
            </CustomCard>
        </div>
    )
}


export default AddUser;