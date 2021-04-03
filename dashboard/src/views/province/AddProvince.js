import React, { useState, useEffect } from 'react';
import {
    CButton,
    CRow,
    CForm,
    CCol
} from '@coreui/react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import classes from './css/add-province.module.css';

import CustomCard from '../../components/card/customCard/custom-card.component'
import SubmitButton from '../../components/button/submit-button.component';
import InputWithLabel from '../../components/input/input-with-label.component';
import CancelButton from '../../components/button/cancel-button.component';
import SwitchWithLabel from '../../components/input/switch-with-label.component';

const schema = yup.object().shape({
    fname: yup.string().max(150, 'عنوان فارسی باید حداکثر دارای 150 کاراکتر باشد').required('لطفا عنوان فارسی را وارد کنید'),
    ename: yup.string().max(150, 'عنوان انگلیسی باید حداکثر دارای 150 کاراکتر باشد'),
    code: yup.string().max(5, 'کد استان باید حداکثر دارای 5 کاراکتر باشد')
});

const AddProvince = (props) => {
    const [loading, setLoading] = useState(false);

    const handleSubmiting = (values, setSubmitting, resetForm) => {
        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  mutation addProvince($fname:String!,$ename:String,$code:String,$active:Boolean,$city:[InputCity]){
                    createProvince(input:{fname:$fname,ename:$ename,code:$code,active:$active,city:$city}){
                        status,
                        message,
                        data{
                            fname
                        }
                    }
                  }`,
                variables: {
                    "fname": values.fname,
                    "ename": values.ename,
                    "code": values.code,
                    "active": values.active,
                }
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
                setSubmitting(false);
            }
            else { // success
                toast.success(response.data.data.createProvince.message)
                setLoading(false);
                setSubmitting(false);
                resetForm()
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
            setSubmitting(false);
        });
    }

    return (
        <div className="animated fadeIn">
            <CustomCard title="افزودن استان">
                <div key="card-header-buttons"></div>
                <div key="card-body">
                    <Formik
                        initialValues={{ fname: '', ename: '', code: '', active: true }}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setLoading(true);
                            handleSubmiting(values, setSubmitting, resetForm);
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
                                <CRow>
                                    <CCol xs="12">
                                        <InputWithLabel
                                            label="عنوان فارسی"
                                            type="text"
                                            name="fname"
                                            lang="fa"
                                            required={true}
                                            placeholder="عنوان فارسی را وارد کنید"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.fname}
                                            errorsInput={errors.fname}
                                            touchedInput={touched.fname} />
                                    </CCol>
                                    <CCol xs="12">
                                        <InputWithLabel
                                            label="عنوان انگلیسی"
                                            type="text"
                                            name="ename"
                                            lang="en"
                                            required={false}
                                            placeholder="عنوان انگلیسی را وارد کنید"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ename}
                                            errorsInput={errors.ename}
                                            touchedInput={touched.ename} />
                                    </CCol>
                                    <CCol xs="12">
                                        <InputWithLabel
                                            label="کد استان"
                                            type="text"
                                            name="code"
                                            maxlength="5"
                                            letterSize="cap"
                                            placeholder="کد استان را وارد کنید"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.code}
                                            errorsInput={errors.code}
                                            touchedInput={touched.code} />
                                    </CCol>
                                    <CCol xs="12">
                                        <SwitchWithLabel
                                            name="active"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.active}
                                            errorsInput={errors.active}
                                            touchedInput={touched.active} />
                                    </CCol>
                                </CRow>
                                <hr />
                                <CRow>
                                    <CCol md="12">
                                        <SubmitButton loading={loading} inputText="ثبت" disabled={isSubmitting} />
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

export default AddProvince;