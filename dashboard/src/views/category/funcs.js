import classes from './css/category.module.css';
import {
    CButton,
} from '@coreui/react';

export const columns = [
    {
        name: 'عنوان',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'دسته',
        cell: row => ((row.parent != null) ? row.parent.name : "فاقد دسته بندی"),
        sortable: true,
    },
    {
        name: 'تصویر',
        cell: row => ((row.image != null) ? <img src={`${global.config.server.baseURL}${row.image.dir}`} className={classes.imageRow} /> : "فاقد تصویر"),
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