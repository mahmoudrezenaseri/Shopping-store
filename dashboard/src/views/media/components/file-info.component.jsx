import React from 'react';
import {
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader
} from '@coreui/react';
import classes from '../css/all-media.module.css';

const FileInfo = ({selectedItem, showModal, closeModal}) => (
    <CModal show={showModal} onClose={closeModal} size="lg" className={classes.infoModal}>
    <CModalHeader>
        <span>اطلاعات پرونده</span>
    </CModalHeader>
    <CModalBody>
        <CRow>
            <CCol sm="6">
                <img src={`${global.config.fileDirectory}${selectedItem.dir}`} />
            </CCol>
            <CCol sm="6">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>نام پرونده : </b>
                            </td>
                            <td> {selectedItem.name}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>نوع پرونده : </b>
                            </td>
                            <td> {selectedItem.format}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>ابعاد : </b>
                            </td>
                            <td>px {selectedItem.dimWidth} * {selectedItem.dimheight} </td>
                        </tr>
                        <tr>
                            <td>
                                <b>تاریخ ایجاد : </b>
                            </td>
                            <td>{new Date(selectedItem.createdAt).toLocaleDateString('fa-IR')}</td>
                        </tr>
                    </tbody>
                </table>
            </CCol>
        </CRow>
    </CModalBody>
</CModal> 
);

export default FileInfo;