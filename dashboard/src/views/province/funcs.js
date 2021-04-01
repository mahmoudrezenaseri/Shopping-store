import classes from './css/province.module.css';
import {
    CButton,
} from '@coreui/react';

export const columns = [
    {
        name: 'عنوان (فارسی)',
        selector: 'ename',
        sortable: true,
    },
    {
        name: 'عنوان (انگلیسی)',
        selector: 'fname',
        sortable: true,
    },
    {
        name: 'کد',
        selector: 'code',
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