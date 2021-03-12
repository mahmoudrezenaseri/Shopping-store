import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CRow,
    CCol
} from '@coreui/react';
import { toast } from 'react-toastify';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from './funcs';

const Category = (props) => {

    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getAllCategory(1)
    }, []);

    function getAllCategory(page, limit) {

        setLoading(true)
        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query getCategory($page:Int,$limit:Int){
                    getAllCategory(input:{page:$page,limit:$limit}){
                        totalDocs,
                        page,
                        categories{
                            name,
                            parent{
                                name
                            },
                            image{
                                dir
                            }
                        }
                    }
                  } 
                `,
                variables: {
                    "page": page,
                    "limit": (typeof limit !== 'undefined') ? limit : perPage
                }
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
            }
            else { // success
                setData(response.data.data.getAllCategory.categories);
                setTotalRows(response.data.data.getAllCategory.totalDocs);
                setLoading(false);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    const handlePageChange = async (page) => {
        getAllCategory(page)
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        getAllCategory(page, newPerPage)
        setPerPage(newPerPage)
    };

    return (
        <div className="animated fadeIn">
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6">
                            <h6>دسته بندی ها</h6>
                        </CCol>
                        <CCol sm="6" className="text-left">
                            <CButton type="submit" color="success" onClick={() => { history.push("/category/add") }}>
                                <CIcon content={freeSet.cilPlus} size={'sm'} />
                                <strong style={{ padding: "0 10px" }}>جدید</strong>
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>

                <CCardBody>
                    <CRow>
                        <CCol md="12" >
                            <CCard>
                                <CCardBody>
                                    <DataTable
                                        title="لیست دسته بندی ها"
                                        columns={columns}
                                        data={data}
                                        striped
                                        pagination
                                        progressPending={loading}
                                        paginationTotalRows={totalRows}
                                        onChangePage={handlePageChange}
                                        onChangeRowsPerPage={handlePerRowsChange}
                                        paginationServer
                                        direction="rtl" />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>

            </CCard>
        </div>
    )
}

export default Category;