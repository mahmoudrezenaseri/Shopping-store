import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CRow,
    CCol,
    CForm
} from '@coreui/react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment-jalaali'

import classes from './css/user.module.css';
import { validateDateEntry } from './func';

import CustomCard from '../../components/card/customCard/custom-card.component'
import AddButton from '../../components/card/customCard/add-button.component'
import DataTableServerSide from '../../components/dataTable/table-server-side.component'
import InputWithLabel from '../../components/input/input-with-label.component';
import InputMobileWithLabel from '../../components/input/input-mobile-with-label.component';
import SearchButton from '../../components/button/search-button.component';
import CancelButton from '../../components/button/cancel-button.component';
import DateWithLabel from '../../components/input/date-with-label.component';


const schema = yup.object().shape({
    name: yup.string().max(50, 'عنوان باید حداکثر دارای 50 کاراکتر باشد'),
    mobile: yup.string().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/, 'فرمت موبایل اشتباه است')
        .min(11, 'عنوان باید حداقل دارای 11 کاراکتر باشد')
        .max(11, 'عنوان باید حداکثر دارای 11 کاراکتر باشد')
});

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

    const [loading, setLoading] = useState(false);
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
                const { users, totalDocs } = response.data.data.getAllUserWithPagination;
                setData(users);
                setTotalRows(totalDocs)
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

    const handleSearch = (values, setSubmitting) => {
        setLoading(false);
        setSubmitting(false);

        if (!validateDateEntry(values.dateFrom, values.dateTo)) {
            return;
        }

        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query filter($page:Int,$limit:Int,$name:String,$mobile:String,$dateFrom:Date,$dateTo:Date){
                    filterUser(input:{page:$page,limit:$limit,name:$name,mobile:$mobile,dateFrom:$dateFrom,dateTo:$dateTo }) {
                        totalDocs,
                        page,
                        users{
                            firstName,
                            lastName,
                            mobile,                        
                            createdAt
                        }
                    }
                  }`,
                variables: {
                    "page": 1,
                    "limit": 10,
                    "name": values.name,
                    "mobile": values.mobile,
                    "dateFrom": values.dateFrom,
                    "dateTo": values.dateTo
                }
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
            }
            else { // success              
                const { users, totalDocs } = response.data.data.filterUser;
                setData(users);
                setTotalRows(totalDocs)

                setLoading(false);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    return (
        <div className="animated fadeIn">
            <CustomCard title="جستجو">
                <div className="d-inline" key="custom-button">
                    <AddButton onClick={() => { history.push("/user/add") }} />
                </div>

                <div key="card-info">
                    <Formik
                        initialValues={{ name: '', mobile: '', dateFrom: null, dateTo: null }}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            setLoading(true);

                            handleSearch(values, setSubmitting);
                        }} >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                            resetForm
                        }) => (
                            <CForm onSubmit={handleSubmit}>
                                <CRow>
                                    <CCol xs="3">
                                        <InputWithLabel
                                            label="نام و نام خانوادگی"
                                            type="text"
                                            name="name"
                                            maxlength="50"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            errorsInput={errors.name}
                                            touchedInput={touched.name} />
                                    </CCol>
                                    <CCol xs="3">
                                        <InputMobileWithLabel
                                            name="mobile"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.mobile}
                                            errorsInput={errors.mobile}
                                            touchedInput={touched.mobile} />
                                    </CCol>
                                    <CCol xs="3">
                                        <DateWithLabel
                                            label="تاریخ از"
                                            name="dateFrom"
                                            onChange={e => setFieldValue("dateFrom", e)}
                                            onInputChange={(e) => {
                                                if (!e.target.value) { setFieldValue("dateFrom", null) }
                                            }}
                                            value={values.dateFrom}
                                            errorsInput={errors.dateFrom}
                                            touchedInput={touched.dateFrom} />
                                    </CCol>
                                    <CCol xs="3">
                                        <DateWithLabel
                                            label="تاریخ تا"
                                            name="dateTo"
                                            onChange={(e) => {
                                                setFieldValue("dateTo", e);
                                            }}
                                            onInputChange={(e) => {
                                                if (!e.target.value) { setFieldValue("dateTo", null) }
                                            }}
                                            value={values.dateTo}
                                            errorsInput={errors.dateTo}
                                            touchedInput={touched.dateTo} />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="12">
                                        <SearchButton loading={loading} disabled={isSubmitting} />
                                        <CancelButton onClick={() => { resetForm(); }} />
                                    </CCol>
                                </CRow>

                            </CForm>
                        )}
                    </Formik>
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