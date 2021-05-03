import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import memoize from 'memoize-one';

export const validateDateEntry = (dateFrom, dateTo) => {
    let from = null, to = null;

    if (dateFrom != null && dateFrom.isValid()) {
        from = dateFrom.clone().format('jYYYY/jMM/jDD')
    }

    if (dateTo != null && dateTo.isValid()) {
        to = dateTo.clone().format('jYYYY/jMM/jDD')
    }

    if (from != null && to != null) {
        if (from > to) {
            toast.error("در وارد کردن بازه تاریخی دقت فرمایید!")
            return false;
        }
    }

    return true
}

export const columns = memoize((editHandler, deleteHandler) => [
    {
        name: 'شناسه',
        selector: '_id',
        sortable: false,
        omit: true
    },
    {
        name: 'نام و نام خانوادگی',
        selector: '',
        sortable: true,
        cell: row => row.fullName
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
        button: true,
        cell: row => (
            <>
                <CButton type="button" color="primary" title="ویرایش" onClick={() => editHandler(row)}><CIcon content={freeSet.cilPencil} size={'sm'} /></CButton>	&nbsp;
                <CButton type="button" color="danger" title="حذف" onClick={() => deleteHandler(row)}><CIcon content={freeSet.cilX} size={'sm'} /></CButton>
            </>
        )
    },
]);