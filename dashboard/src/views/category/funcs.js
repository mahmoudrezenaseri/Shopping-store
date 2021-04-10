import classes from './css/category.module.css';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

export const columns = [
    {
        name: 'شناسه',
        selector: '_id',
        sortable: false,
        hide: true
    },
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
                <CButton type="button" color="primary" title="ویرایش"><CIcon content={freeSet.cilPencil} size={'sm'} /></CButton>	&nbsp;
                <CButton type="button" color="danger" title="حذف"><CIcon content={freeSet.cilX} size={'sm'} /></CButton>
            </>
        )
    },
];