import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
} from '@coreui/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import classes from './css/user.module.css';

import CustomCard from '../../components/card/customCard/custom-card.component'
import AddButton from '../../components/card/customCard/add-button.component'
import DataTableServerSide from '../../components/dataTable/table-server-side.component'

const columns = [
    {
        name: 'نام و نام خانوادگی',
        selector: '',
        sortable: true,
        cell: row => row.firstName + " " + row.lastName
    },
    {
        name: 'موبایل',
        selector: 'mobile',
        sortable: true,
    },
    {
        name: 'تاریخ ثبت',
        cell: row => <span>{new Date(row.createdAt).toLocaleDateString('fa-IR')}</span>,
        sortable: true,
    },
    {
        name: 'توضیحات',
        selector: '',
        cell: row => (
            <>
                <CButton type="button" color="primary">ویرایش</CButton>	&nbsp;
                <CButton type="button" color="danger">حذف</CButton>
            </>
        )
    },
];

const User = (props) => {

    let history = useHistory();

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        getAllUser()
    }, []);

    function getAllUser(page, limit) {
        page = (typeof page === 'undefined') ? 1 : page
        limit = (typeof limit === 'undefined') ? 10 : limit

        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query getUsers($page: Int,$limit: Int,$searchText: String){
                    getAllUserWithPagination(input:{page: $page,limit: $limit,searchText: $searchText}){
                        totalDocs,
                        page,
                        users{
                            firstName,
                            lastName,
                            mobile,                        
                            createdAt,
                            updatedAt
                        }
                    }
                  }`,
                variables: {
                    page: page,
                    limit: limit,
                    searchText: ""
                }
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
            }
            else { // success
                setData(response.data.data.getAllUserWithPagination.users);
                setTotalRows(response.data.data.getAllUserWithPagination.totalDocs)
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
        });
    }

    const handlePageChange = async (page) => {
        getAllUser(page)
    }

    const handlePerRowsChange = async (perPage, page) => {
        getAllUser(page, perPage)
    }

    return (
        <div className="animated fadeIn">
            <CustomCard title="جستجو">
                <div className="d-inline" key="custom-button">
                    <AddButton onClick={() => { history.push("/user/add") }} />
                </div>

                <div key="card-info">
                    <h3>hello world</h3>
                </div>
            </CustomCard>

            <CustomCard title="کاربران">
                <div key="custom-button"></div>

                <div key="card-info">
                    <CCard>
                        <CCardBody>
                            <DataTableServerSide
                                title="لیست کاربران"
                                columns={columns}
                                data={data}
                                paginationTotalRows={totalRows}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handlePerRowsChange}
                            />
                        </CCardBody>
                    </CCard>
                </div>
            </CustomCard>
        </div>
    )
}


export default User;