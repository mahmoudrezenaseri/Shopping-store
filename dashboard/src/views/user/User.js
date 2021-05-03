import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CRow, CCol, CForm } from '@coreui/react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment-jalaali'
import memoize from 'memoize-one';

import classes from './css/user.module.css';
import { validateDateEntry, columns } from './func';

import CustomCard from '../../components/card/customCard/custom-card.component'
import AddButton from '../../components/card/customCard/add-button.component'
import DataTableServerSide from '../../components/dataTable/table-server-side.component'
import InputWithLabel from '../../components/input/input-with-label.component';
import InputMobileWithLabel from '../../components/input/input-mobile-with-label.component';
import SearchButton from '../../components/button/search-button.component';
import CancelButton from '../../components/button/cancel-button.component';
import DateWithLabel from '../../components/input/date-with-label.component';

const schema = yup.object().shape({
    firstName: yup.string().max(50, 'نام باید حداکثر دارای 50 کاراکتر باشد'),
    lastName: yup.string().max(50, 'نام خانوادگی باید حداکثر دارای 50 کاراکتر باشد'),
    mobile: yup.string().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/, 'فرمت موبایل اشتباه است')
        .min(11, 'موبایل باید حداقل دارای 11 کاراکتر باشد')
        .max(11, 'موبایل باید حداکثر دارای 11 کاراکتر باشد')
});

const User = (props) => {

    let history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        setTimeout(() => {

            getAllUser()
            setPending(false)
        }, 2000);
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
                            _id,
                            fullName,
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
                  query filter($page:Int,$limit:Int,$firstName:String,$lastName:String,$mobile:String,$dateFrom:Date,$dateTo:Date){
                    filterUser(input:{page:$page,limit:$limit,firstName:$firstName,lastName:$lastName,mobile:$mobile,dateFrom:$dateFrom,dateTo:$dateTo }) {
                        totalDocs,
                        page,
                        users{
                            _id,
                            fullName,
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
                    "firstName": values.firstName,
                    "lastName": values.lastName,
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

    const deleteUser = row => {
        console.log("delete user", row)
    }

    const editUser = row => {
        console.log("edit user", row)

    }

    return (
        <div className="animated fadeIn">
            <CustomCard title="جستجو">
                <div className="d-inline" key="card-header-buttons">
                    <AddButton onClick={() => { history.push("/user/add") }} />
                </div>

                <div key="card-body">
                    <Formik
                        initialValues={{ firstName: '', lastName: '', mobile: '', dateFrom: null, dateTo: null }}
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
                                    <CCol xs="4">
                                        <InputWithLabel
                                            label="نام"
                                            type="text"
                                            name="firstName"
                                            maxlength="50"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            errorsInput={errors.firstName}
                                            touchedInput={touched.firstName} />
                                    </CCol>
                                    <CCol xs="4">
                                        <InputWithLabel
                                            label="نام خانوادگی"
                                            type="text"
                                            name="lastName"
                                            maxlength="50"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            errorsInput={errors.lastName}
                                            touchedInput={touched.lastName} />
                                    </CCol>
                                    <CCol xs="4">
                                        <InputMobileWithLabel
                                            name="mobile"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.mobile}
                                            errorsInput={errors.mobile}
                                            touchedInput={touched.mobile} />
                                    </CCol>
                                    <CCol xs="4">
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
                                    <CCol xs="4">
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
                                <hr />
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
                <div key="card-header-buttons"></div>

                <div key="card-body">
                    <DataTableServerSide
                        title="لیست کاربران"
                        columns={columns(editUser, deleteUser)}
                        data={data}
                        progressPending={pending}
                        paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                    />
                </div>
            </CustomCard>
        </div>
    )
}


export default User;