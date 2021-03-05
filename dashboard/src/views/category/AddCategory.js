import React, { useState } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CLabel,
    CInput,
    CButton,
    CRow,
    CSelect,
    CAlert,
    CFormGroup,
    CCol
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import SubmitButton from '../../components/button/submit-button.component.jsx';
import MediaSelect from '../media/components/media-select.component.jsx';

const AddCategory = (props) => {

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const submitHandler = () => {
        console.log("submit clicked!")
    }

    const chooseImage = () => {
        setModal(true);
    }

    return (
        <div className="animated fadeIn">
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />

            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6">
                            <h6>افزودن دسته بندی</h6>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs="3">
                            <CFormGroup>
                                <CLabel htmlFor="name">عنوان</CLabel>
                                <CInput id="name" placeholder="عنوان دسته را وارد کنید" required />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="3">
                            <CFormGroup>
                                <CLabel htmlFor="desc">توضیح</CLabel>
                                <CInput id="desc" placeholder="توضیح را وارد کنید" required />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="3">
                            <CFormGroup>
                                <CLabel htmlFor="ccmonth">Month</CLabel>
                                <CSelect custom name="ccmonth" id="ccmonth">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="3">
                            <CButton type="button" color="success" onClick={chooseImage}>انتخاب تصویر</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <SubmitButton onSubmit={submitHandler} loading={loading} inputText="ثبت" />
                </CCardFooter>
            </CCard>

            {
                (modal) ?
                    <MediaSelect
                        showModal={modal}
                        closeModal={() => { setModal(false) }} /> :
                    null
            }
        </div>

    )
}

export default AddCategory;