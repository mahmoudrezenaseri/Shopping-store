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
    CModal,
    CModalBody,
    CModalHeader,
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
    const [files, setFiles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
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
        dispatch({ type: 'check', payload: props });

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

    const openInfoModal = (item) => {
        setModal(true);
        setSelectedItem(item)
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

    return (
        <div className="animated fadeIn">
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />
            <CCard>
                <CCardHeader>
                    <h6>کتابخانه</h6>
                </CCardHeader>
                <CCardBody>
                    <CRow className="mb-3">
                        <CCol sm="5" md="4">
                            <CInput value={searchText} onChange={filterFiles} placeholder="جستجو" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-5" className={classes.mediaSection}>
                        {
                            (loading === true) ?
                                <CCol xs="12" className="text-center"> <CSpinner size="lg" /> </CCol> :
                                (files.length > 0) ?
                                    <CCol xs="12">
                                        <CRow>
                                            {
                                                files.map((item, index) => {
                                                    return (
                                                        <CCol sm="3" md="2" key={index} className={classes.media}>
                                                            <img src={`${global.config.fileDirectory}${item.dir}`} onClick={() => openInfoModal(item)} />
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

                    {
                        selectedItem != null ?
                            <CModal show={modal} onClose={() => setModal(false)} size="lg" className={classes.infoModal}>
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
                            </CModal> : null
                    }
                </CCardBody>
            </CCard>
        </div >
    )
}

export default AllMedia;