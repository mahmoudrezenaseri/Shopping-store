import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CButton,
    CRow,
    CForm,
    CCol,
    CFormGroup,
    CLabel
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import classes from './category.module.css';

import SubmitButton from '../../components/button/submit-button.component';
import InputWithLabel from '../../components/input/input-with-label.component';
import Select2WithLabel from '../../components/input/select2-with-label.component';
import MediaSelect from '../media/components/media-select.component';

const createSchema = yup.object().shape({
    name: yup.string().max(50, 'عنوان باید حداکثر دارای 50 کاراکتر باشد').required('لطفا عنوان را وارد کنید'),
    label: yup.string().max(50, 'عنوان باید حداکثر دارای 50 کاراکتر باشد'),
    parent: yup.string().required('لطفا دسته والد را وارد کنید')
    // .matches(/^[0-9a-fA-F]{24}$/, 'فرمت دسته والد اشتباه است')
});

const AddCategory = (props) => {

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState({})
    const [options, setOptions] = useState([]);
    const [fileSelected, setFileSelected] = useState(false)

    useEffect(() => {
        getAllCategory()
    }, []);

    const handleSubmiting = (values, setSubmitting) => {
        console.log(values.parent)
        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  mutation addCategory($name:String,$label:String,$parent:ID,$image:ID){
                    createCategory(input:{name:$name,label:$label,parent:$parent,image:$image}){
                        status,
                        message,
                        data{
                            _id,
                            name,
                            label
                        }
                    }
                  } 
                `,
                variables: {
                    "name": values.name,
                    "label": values.label,
                    "parent": values.parent !== "null" ? values.parent : null,
                    "image": file._id ? file._id : null
                }
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
                setSubmitting(false);
            }
            else { // success
                toast.success(response.data.data.createCategory.message)
                setLoading(false);
                setSubmitting(false);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
            setSubmitting(false);
        });
    }

    const openMediaModal = () => {
        setModal(true);
    }

    const removeFile = () => {
        setFile({});
        setFileSelected(false)
    }

    const fileSelectHandler = (item) => {
        setFile(item)
        setModal(false);
        setFileSelected(true);
    }

    const getAllCategory = () => {
        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query{
                    getAllCategoryTreeView {
                        _id,
                        name,
                        children{
                            _id,
                            name,
                            level,
                            parent
                        }
                    }
                  } 
                `
            }
        }).then((response) => {
            if (response.data.errors) {
                const { message } = response.data.errors[0];
                toast.error(message);
                setLoading(false);
            }
            else { // success
                const defaultItem = [{ value: "null", label: "فاقد دسته والد" }];
                const categories = prepareCategoryOptions(response.data.data.getAllCategoryTreeView)
                setOptions([...defaultItem, ...categories])
                setLoading(false);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
            setLoading(false);
        });
    }

    function prepareCategoryOptions(categories) {
        let newArray = [];
        for (let index = 0; index < categories.length; index++) { // لوپ در دسته بندی های بدون والد
            const element = categories[index];
            newArray.push({ "value": element._id, "label": element.name }); // افزودن آنها به آرایه جدید

            if (element.children.length > 0) {
                for (let index = 0; index < element.children.length; index++) { // لوپ در فرزندان دسته بندی والد در صورت وجود
                    let item = element.children[index];
                    let itemChildren = element.children.filter(a => a.parent === item._id); // پیدا کردن فرزندان این دسته بندی در صورت وجود

                    // اگر فرزندی وجود نداشت به این معناست که قبلا در زیر مجموعه یکی دیگر از دسته بندی ها اضافه شده و نیازی به افزودن آن نیست
                    // همچنین سطح آن نباید صفر باشد(سطح صفر یعنی اولین سطح دسته والد)
                    if (itemChildren.length == 0 && item.level != 0) {
                        continue
                    }

                    newArray.push({ "value": item._id, "label": addIndentToCategoryChildren(item) + item.name });

                    for (let index = 0; index < itemChildren.length; index++) {
                        const item = itemChildren[index];

                        newArray.push({ "value": item._id, "label": addIndentToCategoryChildren(item) + item.name });
                    }
                }
            }
        }

        return newArray
    }

    // افزودن خط تیره به دسته بندی های فرزند برای مشخص شدن در لیست
    function addIndentToCategoryChildren(item) {
        let indent = '';
        for (let index = 0; index <= item.level; index++) {
            indent += '-';
        }

        return indent;
    }

    return (
        <div className="animated fadeIn">
            <ToastContainer rtl={true} position="top-left" toastClassName="toastify" />

            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="6">
                            <h6>افزودن دسته بندی</h6>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <Formik
                    initialValues={{ name: '', label: '', parent: '' }}
                    validationSchema={createSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true);
                        handleSubmiting(values, setSubmitting);
                    }} >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <CForm onSubmit={handleSubmit}>
                            <CCardBody>
                                <CRow>
                                    <CCol md="6">
                                        <CCol xs="12">
                                            <InputWithLabel
                                                label="عنوان"
                                                inputType="text"
                                                inputName="name"
                                                required={true}
                                                placeholder="عنوان دسته را وارد کنید"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                errorsInput={errors.name}
                                                touchedInput={touched.name} />
                                        </CCol>
                                        <CCol xs="12">
                                            <InputWithLabel
                                                label="توضیح"
                                                inputType="text"
                                                inputName="label"
                                                placeholder="توضیح دسته را وارد کنید"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.label}
                                                errorsInput={errors.label}
                                                touchedInput={touched.label} />
                                        </CCol>
                                        <CCol xs="12">
                                            <Select2WithLabel
                                                name="parent"
                                                label="دسته والد"
                                                value={values.parent}
                                                onChange={e => setFieldValue("parent", e.value)}
                                                options={options}
                                                errorsInput={errors.parent}
                                            />
                                        </CCol>
                                    </CCol>
                                    <CCol md="6">
                                        <CRow>
                                            <CCol xs="12">
                                                <div className={classes.imagePreviewWrapper}>
                                                    <CButton type="button" color="success" onClick={openMediaModal} className={classes.imagePreviewSelect}>
                                                        {
                                                            (fileSelected == true) ? 'تغییر تصویر' :
                                                                'انتخاب تصویر'
                                                        }
                                                    </CButton>
                                                    {
                                                        (fileSelected) ?
                                                            <>
                                                                <CButton type="button" color="danger" onClick={removeFile} className={classes.imagePreviewRemove}>حذف</CButton>
                                                                <img src={`${global.config.server.baseURL}${file.dir}`} className={classes.imagePreview} />
                                                            </> :
                                                            <img src={global.config.defaults.image} className={classes.imagePreview} />
                                                    }
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>

                            </CCardBody>
                            <CCardFooter>
                                <SubmitButton loading={loading} inputText="ثبت" disabled={isSubmitting} />
                            </CCardFooter>
                        </CForm>
                    )}
                </Formik>
            </CCard>

            {
                (modal) ?
                    <MediaSelect
                        showModal={modal}
                        closeModal={() => { setModal(false) }}
                        onFileClick={fileSelectHandler} /> :
                    null
            }
        </div >
    )
}

export default AddCategory;