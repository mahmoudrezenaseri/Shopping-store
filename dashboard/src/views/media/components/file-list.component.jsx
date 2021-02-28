import React from 'react';
import {
    CCol,
    CRow
} from '@coreui/react';
import classes from '../css/all-media.module.css';

const FileList = ({files, openInfoModal}) => (
    <CRow>
    {
        files.map((item, key) => {
            return (               
                <CCol sm="3" md="2" key={key} className={classes.media}>
                    <img src={`${global.config.fileDirectory}${item.dir}`} onClick={() => openInfoModal(item)} />
                </CCol>
            )
        })
    }
    </CRow>
);

export default FileList;