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
    CFormGroup
} from '@coreui/react';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';
import classes from './media.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllMedia = (props) => {
    const { dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        dispatch({ type: 'check', payload: props });
        fetchData();
    }, []);

    const fetchData = () => {
        const page = 1;
        const limit = 10;

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
                setFiles(getAllFiles);
                setLoading(false);
                console.log(getAllFiles)
            }
        }).catch((error) => {
            console.log(error)
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
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
                        (files.length > 0) ?
                            <div className={classes.mediaSection}>
                                {
                                    files.map((file, index) => {
                                        return (
                                            <div key={index} className={classes.media}>
                                                <img src={`${global.config.file.liara}${file.dir}`} />
                                            </div>
                                        )
                                    })
                                }
                            </div> :
                            <CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert>
                    }
                </CCardBody>
            </CCard>
        </div>
    )
}

export default AllMedia;