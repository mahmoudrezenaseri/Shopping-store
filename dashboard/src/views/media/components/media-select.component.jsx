import React, { useState, useContext, useEffect } from 'react';
import {
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CInput,
    CSpinner,
    CButton,
    CAlert
} from '@coreui/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from '../css/select-media.module.css';
import GetToken from '../../../context/auth/GetToken';

import MediaList from './media-list.component'

const MediaSelect = (props) => {
    const token = GetToken();

    const [loading, setLoading] = useState(true);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [files, setFiles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [didMount, setDidMount] = useState(true);

    const page = 1;
    const limit = 10;

    useEffect(() => {
        if (!didMount) { // check that page is not loaded for the first time 
            setLoading(true);
            fetchData(page, limit);
        } else {
            setDidMount(false);
        }
    }, [searchText]);

    useEffect(() => {
        console.log("modal shown document")

        fetchData(page, limit);
    }, []);

    const fetchData = (page, limit) => {
        axios({
            url: "/",
            method: "post",    
            data: {
                query: `
                    query{
                        getAllFiles(page: ${page}, limit: ${limit}, searchText: "${searchText}"){
                            totalDocs,
                            hasNextPage,
                            page,
                            files {
                                _id,
                                name,
                                dimWidth,
                                dimheight,
                                format,
                                dir,
                                createdAt
                            }
                        }
                    } `
            },
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
            }
            else { // success
                const { getAllFiles } = response.data.data;

                setFiles([...files, ...getAllFiles.files]);
                setLoading(false);
                setShowMoreButton(getAllFiles.hasNextPage);
                setPageNumber(getAllFiles.page);
            }
        }).catch((error) => {
            console.log(error)
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    const filterFiles = (event) => {
        setSearchText(event.target.value);
        setFiles([]);
    }

    const loadMoreFiles = () => {
        let newPageNumber = pageNumber + 1;
        fetchData(newPageNumber, limit);
        setPageNumber(newPageNumber);
    }

    const mediaSelectHandler = (item) => {     

    }

    const { showModal, closeModal } = props;
    return (
        <>
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />
            <CModal show={showModal} onClose={closeModal} size="lg">
                <CModalHeader>
                    <span>کتابخانه</span>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CCol sm="5" md="4">
                            <CInput value={searchText} onChange={filterFiles} placeholder="جستجو" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-5" className={classes.mediaSection}>
                        {
                            (loading === true) ?
                                <CCol xs="12" className="text-center">
                                    <CSpinner size="lg" />
                                </CCol> :
                                (files.length > 0) ?
                                    <CCol xs="12">
                                        <MediaList files={files} onClick={mediaSelectHandler} />
                                    </CCol> :
                                    <CCol xs="12"> 
                                        <CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert>
                                    </CCol>
                        }

                        {
                            (showMoreButton === true) ?
                                <CCol xs="12">
                                    <CButton block color="info" onClick={loadMoreFiles}>بیشتر</CButton>
                                </CCol> : null
                        }
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default MediaSelect;