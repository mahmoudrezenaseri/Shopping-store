import React, { useState, useEffect } from 'react';
import {
    CCard,
    CButton,
    CRow,
    CForm,
    CCol
} from '@coreui/react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import classes from './css/add-category.module.css';

import CustomCard from '../../components/card/customCard/custom-card.component'
import SubmitButton from '../../components/button/submit-button.component';
import InputWithLabel from '../../components/input/input-with-label.component';
import Select2WithLabel from '../../components/input/select2-with-label.component';
import MediaSelect from '../media/components/media-select.component';
import CancelButton from '../../components/button/cancel-button.component';

const schema = yup.object().shape({
    name: yup.string().max(50, 'عنوان باید حداکثر دارای 50 کاراکتر باشد').required('لطفا عنوان را وارد کنید'),
    label: yup.string().max(50, 'عنوان باید حداکثر دارای 50 کاراکتر باشد'),
    parent: yup.string().required('لطفا دسته والد را وارد کنید')
    // .matches(/^[0-9a-fA-F]{24}$/, 'فرمت دسته والد اشتباه است')
});

const AddCategory = (props) => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [file, setFile] = useState({})
    const [fileSelected, setFileSelected] = useState(false)

    useEffect(() => {
        getAllCategory()
    }, []);

    const handleSubmiting = (values, setSubmitting, resetForm) => {
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
                  }`,
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
                clearForm()
                resetForm()
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

    function clearForm() {
        setFile({});
        setFileSelected(false)
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
            }
            else { // success
                const defaultItem = [{ value: "null", label: "فاقد دسته والد" }];
                const categories = prepareCategoryOptions(response.data.data.getAllCategoryTreeView)
                setOptions([...defaultItem, ...categories])
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
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
            <CustomCard title="افزودن دسته بندی">
                <div key="card-header-buttons"></div>
                <div key="card-body">
                    <Formik
                        initialValues={{ name: '', label: '', parent: '' }}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setLoading(true);
                            handleSubmiting(values, setSubmitting, resetForm);
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
                                    <CCol md="6">
                                        <CCol xs="12">
                                            <InputWithLabel
                                                label="عنوان"
                                                type="text"
                                                name="name"
                                                required={true}
                                                placeholder="عنوان دسته را وارد کنید"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                errorsInput={errors.name}
                                                touchedInput={touched.name} />
                                        </CCol>
                                        <CCol xs="12">
                                            <Select2WithLabel
                                                required
                                                name="parent"
                                                label="دسته والد"
                                                value={values.parent}
                                                onChange={e => setFieldValue("parent", e.value)}
                                                options={options}
                                                errorsInput={errors.parent}
                                                touchedInput={touched.parent}
                                            />
                                        </CCol>

                                        <CCol xs="12">
                                            <InputWithLabel
                                                label="توضیح"
                                                type="text"
                                                name="label"
                                                placeholder="توضیح دسته را وارد کنید"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.label}
                                                errorsInput={errors.label}
                                                touchedInput={touched.label} />
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
                                <hr />
                                <CRow>
                                    <CCol md="12">
                                        <SubmitButton loading={loading} inputText="ثبت" disabled={isSubmitting} />
                                        <CancelButton onClick={() => { resetForm(); clearForm() }} />
                                    </CCol>
                                </CRow>
                            </CForm>
                        )}
                    </Formik>
                </div>
            </CustomCard>

            {
                (modal) ?
                    <MediaSelect
                        showModal={modal}
                        closeModal={() => { setModal(false) }}
                        onFileClick={fileSelectHandler} /> :
                    null
            }
        </div>
    )
}

export default AddCategory;