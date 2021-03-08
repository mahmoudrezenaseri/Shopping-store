import React from 'react';
import {
    CCol,
    CRow,
    CInputCheckbox,
    CLabel,CFormGroup
} from '@coreui/react';
import classes from '../css/all-media.module.css';

const MediaList = ({files, onFileClick}) => (
    <CRow>
    {
        files.map((item, key) => {
            return (               
                <CCol sm="3" md="2" key={key} className={classes.media}>                    
                    <img src={`${global.config.server.baseURL}${item.dir}`} onClick={() => onFileClick(item)} />
                </CCol>
            )
        })
    }
    </CRow>
);

export default MediaList;