import React, { useState, useContext, useEffect } from 'react';
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


const AddMedia = (props) => {
    const { dispatch } = useContext(AuthContext);
    const [loadedFiles, setLoadedFiles] = useState([]);

    useEffect(() => {
        dispatch({ type: 'check', payload: props })
    }, []);

    const onFilesUpload = (event) => {
        const files = event.target.files;
        const newLoadedFiles = [...loadedFiles];

        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            newLoadedFiles.push({
                file: element,
                preview: URL.createObjectURL(element),
                loaded: 0
            });
        }

        setLoadedFiles(newLoadedFiles.reverse());
    }

    const removeLoadedFile = (file) => {
        const newFiles = loadedFiles.filter(id => id !== file);
        setLoadedFiles(newFiles);
    }

    return (
        <div className="animated fadeIn">
            <CCard>
                <CCardHeader>
                    <h6>افزودن پرونده چندرسانه ای</h6>
                </CCardHeader>
                <CCardBody>
                    <div className={classes.addMediaSection}>
                        <div className={classes.filePreview}>
                            {
                                loadedFiles.map((file, index) => {
                                    return (
                                        <div className={classes.file} key={index}>
                                            {
                                                file.loaded === 0 ? <CIcon content={freeSet.cilTrash} size={'xl'} className={classes.removeIcon} onClick={() => removeLoadedFile(file)} />
                                                    : null
                                            }
                                            <img src={file.preview} />
                                            <CProgress color="success" value={file.loaded} max={100} precision={2} showPercentage striped />
                                        </div>);
                                })
                            }
                        </div>
                        <div className={classes.dragDropSection}>
                            <h4>پرونده ها را اینجا بکشید</h4>
                            <b>یا</b>
                            <CForm className="form-horizontal">
                                <CFormGroup row>
                                    <label htmlFor="file-multiple-input">
                                        <div className={classes.fileSelection}>گزینش پرونده</div>
                                    </label>
                                    <input type="file" id="file-multiple-input" name="file-multiple-input" multiple onChange={onFilesUpload} />
                                </CFormGroup>
                            </CForm>
                        </div>
                    </div>
                </CCardBody>
                <CCardFooter>
                    <CButton type="submit" color="primary">
                        <strong>آپلود</strong>
                    </CButton>
                </CCardFooter>
            </CCard>
        </div>
    )
}

export default AddMedia;