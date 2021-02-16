import React, { Component, useContext, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
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
    CAlert,
    CProgress,
    CFormGroup
} from '@coreui/react';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';
import classes from './media.module.css';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const style = {
    whiteIcon: "color:white;"
}
const AddMedia = (props) => {
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        dispatch({ type: 'check', payload: props })
    }, [])

    return (
        <div className="animated fadeIn">
            <CCard>
                <CCardHeader>
                    <h6>افزودن پرونده چندرسانه ای</h6>
                </CCardHeader>

                <CCardBody>
                    <div className={classes.addMediaSection}>
                        <div className={classes.filePreview}>
                            <div className={classes.file}>
                                <CIcon content={freeSet.cilTrash} size={'xl'} className={classes.removeIcon} />
                                <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/9c3dbbe2668258241f537eb0ce5c20ff53ab7fad_1612860792.jpg?x-oss-process=image/quality,q_80" />
                                <CProgress color="success" value={35} max={100} showPercentage striped />
                            </div>
                            <div className={classes.file}>
                                <CIcon content={freeSet.cilTrash} size={'xl'} className={classes.removeIcon} />
                                <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/9c3dbbe2668258241f537eb0ce5c20ff53ab7fad_1612860792.jpg?x-oss-process=image/quality,q_80" />
                                <CProgress color="success" value={35} max={100} showPercentage striped />
                            </div>
                            <div className={classes.file}>
                                <CIcon content={freeSet.cilTrash} size={'xl'} className={classes.removeIcon} />
                                <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/9c3dbbe2668258241f537eb0ce5c20ff53ab7fad_1612860792.jpg?x-oss-process=image/quality,q_80" />
                                <CProgress color="success" value={35} max={100} showPercentage striped />
                            </div>
                        </div>
                        <div className={classes.dragDropSection}>
                            <h4>پرونده ها را اینجا بکشید</h4>
                            <b>یا</b>
                            <CForm className="form-horizontal">
                                <CFormGroup row>
                                    <label htmlFor="file-multiple-input">
                                        <div className={classes.fileSelection}>گزینش پرونده</div>
                                    </label>
                                    <input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                                </CFormGroup>
                            </CForm>
                        </div>
                    </div>
                </CCardBody>
                <CCardFooter>

                </CCardFooter>
            </CCard>
        </div>
    )
}

export default AddMedia;