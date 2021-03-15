import React, { useState } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CForm,
    CAlert,
    CProgress,
    CFormGroup
} from '@coreui/react';
import { checkType, maxSelectedFile, checkFileSize } from './funcs';
import { toast } from 'react-toastify';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import classes from './css/add-media.module.css';

import SubmitButton from '../../components/button/submit-button.component';

const AddMedia = (props) => {
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const onFilesUpload = (event) => {
        if (checkType(event) && maxSelectedFile(event) && checkFileSize(event)) {
            const files = event.target.files;
            prepareFiles(files);
        }
    }

    const removeLoadedFile = (file) => {
        const newFiles = loadedFiles.filter(id => id !== file);
        setLoadedFiles(newFiles);
    }

    const onDragOverHandler = (event) => {
        event.preventDefault();

        event.target.classList.add(classes.dragOver);
    }

    const onDragLeaveHandler = (event) => {
        event.preventDefault();

        event.target.classList.remove(classes.dragOver);
    }

    const onDropHandler = (event) => {
        event.preventDefault();

        event.target.classList.remove(classes.dragOver);

        if (checkType(event) && maxSelectedFile(event) && checkFileSize(event)) {
            const files = event.dataTransfer.files;
            prepareFiles(files);
        }
    }

    // prepate form data
    function getFormData(element) {
        let data = {
            query: `
                mutation addImage($image: Upload!){
                    createFile(image: $image){
                        status,
                        message,
                        data {
                            name,
                            dir
                        }                   
                    }
                } `,
            variables: {
                "image": null,
            }
        };

        let map = { 0: ['variables.image'] }
        const formD = new FormData();
        formD.append('operations', JSON.stringify(data));
        formD.append('map', JSON.stringify(map));
        formD.append(0, element.file, element.file.name);

        return formD;
    }

    // send form to the server
    function sendData(index, element) {
        const formD = getFormData(element);

        axios({
            url: "/",
            method: "post",
            data: formD,
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                loadedFiles[index].loaded = Math.floor((loaded * 100) / total);
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
            }
            else { // success
                toast.success(global.config.message.success.fa);
                setLoadedFiles(loadedFiles);
                setLoading(false);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    // Gets new selected files and add it to the array
    function prepareFiles(files) {
        const newLoadedFiles = [...loadedFiles];

        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            newLoadedFiles.push({
                file: element,
                preview: URL.createObjectURL(element),
                loaded: 0
            });
        }

        setLoadedFiles(newLoadedFiles);
    }

    const submitHandler = () => {
        setLoading(true);

        if (loadedFiles.length == 0) {
            toast.error("فایلی انتخاب نشده است.");
            setLoading(false);
            return false;
        }

        for (let index = 0; index < loadedFiles.length; index++) {
            const element = loadedFiles[index];
            if (element.loaded === 100) {
                setLoading(false);
                continue;
            }

            // prepare data and send it to the server
            sendData(index, element);
        }
    }

    return (
        <div className="animated fadeIn">
            <CAlert color="warning">
                <h4 className="alert-heading">توجه!</h4>
                <ul>
                    <li>فرمت های قابل قبول برای آپلود <b>jpg, png, jpeg</b> می باشند.</li>
                    <li>فایل ها باید کمتر از 3 مگابایت باشند.</li>
                    <li>همزمان نمی توان بیش از 3 فایل را آپلود کرد.</li>
                </ul>
            </CAlert>
            <CCard>
                <CCardHeader>
                    <h6>افزودن پرونده چندرسانه ای</h6>
                </CCardHeader>
                <CCardBody>
                    <div className={classes.addMediaSection} onDragOver={onDragOverHandler} onDragLeave={onDragLeaveHandler} onDrop={onDropHandler}>
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
                                            <CProgress color="success" value={file.loaded} max={100} showPercentage striped />
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
                    <SubmitButton onSubmit={submitHandler} loading={loading} icon={freeSet.cilCloudUpload} inputText="آپلود" disabled={false} />
                </CCardFooter>
            </CCard>
        </div>
    )
}


export default AddMedia;