import React, { useState, useContext, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CForm,
    CInput,
    CRow,
    CSpinner,
    CAlert,
    CProgress,
    CFormGroup,
    CCol
} from '@coreui/react';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';
import classes from './media.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllMedia = (props) => {
    const { dispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [searchInput, setSearchInput] = useState(false);
    const [files, setFiles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(2);
    const [lastFiles, setLastFiles] = useState([]);

    useEffect(() => {
        dispatch({ type: 'check', payload: props });

        const page = 1;
        const limit = 10;

        fetchData(page, limit);
    }, []);

    const fetchData = (page, limit) => {

        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                    query{
                        getAllFiles(page: ${page}, limit: ${limit}){
                            _id,
                            name,
                            dimWidth,
                            dimHeight,
                            format,
                            dir,
                            createdAt
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

                setLoading(false);
                setLastFiles(getAllFiles);

                if (files.length > 0) {
                    setFiles([...files, ...getAllFiles]);
                } else {
                    setFiles(getAllFiles);
                    setShowMoreButton(true);
                    setSearchInput(true);
                }
            }
        }).catch((error) => {
            console.log(error)
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    const filterFiles = (event) => {
        setSearchText(event.target.value)
        if (searchText.length > 2) {

        }
    }

    const fileClick = () => {
        console.log("fileClick")
    }

    const loadMoreFiles = () => {
        if (lastFiles.length < 10) {
            setShowMoreButton(false);
        } else {
            const limit = 10;
            fetchData(pageNumber, limit);
            setPageNumber(pageNumber + 1);
        }
    }

    return (
        <div className="animated fadeIn">
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />
            <CCard>
                <CCardHeader>
                    <h6>کتابخانه</h6>
                </CCardHeader>
                <CCardBody>
                    {
                        (searchInput === true) ?
                            <CRow className="mb-3">
                                <CCol sm="5" md="4">
                                    <CInput value={searchText} onChange={filterFiles} placeholder="جستجو" />
                                </CCol>
                            </CRow> : null
                    }
                    <CRow className="mb-5" className={classes.mediaSection}>
                        {
                            (loading === true) ?
                                <CCol xs="12" className="text-center"> <CSpinner size="lg" /> </CCol> :
                                (files.length > 0) ?
                                    <CCol xs="12">
                                        <CRow>
                                            {
                                                files.map((file, index) => {
                                                    return (
                                                        <CCol sm="3" key={index} className={classes.media}>
                                                            <img src={`${global.config.fileDirectory}${file.dir}`} onClick={fileClick} />
                                                        </CCol>
                                                    )
                                                })
                                            }
                                        </CRow>
                                    </CCol> :
                                    <CCol xs="12">  <CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert></CCol>
                        }

                        {
                            (showMoreButton === true) ?
                                <CCol xs="12">
                                    <CButton block color="info" onClick={loadMoreFiles}>بیشتر</CButton>
                                </CCol> : null
                        }
                    </CRow>
                </CCardBody>
            </CCard>
        </div >
    )
}

export default AllMedia;