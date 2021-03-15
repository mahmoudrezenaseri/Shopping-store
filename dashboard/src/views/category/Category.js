import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CCard,
    CCardBody,
} from '@coreui/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { columns } from './funcs';

import CustomCard from '../../components/card/customCard/custom-card.component'
import AddButton from '../../components/card/customCard/add-button.component'
import DataTableClientSide from '../../components/dataTable/table-client-side.component'
import TableSubHeader from '../../components/dataTable/table-sub-header.component'

const Category = (props) => {

    let history = useHistory();

    const [filterText, setFilterText] = React.useState('');
    const [data, setData] = useState([]);
    const filteredItems = data.filter(item => (item.name && item.name.toLowerCase().includes(filterText.toLowerCase()))
        || (item.parent?.name && item.parent?.name.toLowerCase().includes(filterText.toLowerCase()))
    );

    useEffect(() => {
        setTimeout(() => {
            getAllCategory()
        }, 5000);
    }, []);

    function getAllCategory() {

        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query {
                    getAllCategory{
                        name,
                        label,
                        parent{
                            name
                        },
                        image{
                            dir
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
                setData(response.data.data.getAllCategory);
            }
        }).catch((error) => {
            toast.error(global.config.message.error.fa);
        });
    }

    const subHeaderComponentMemo = useMemo(() => {
        return <TableSubHeader onFilter={e => setFilterText(e.target.value)} filterText={filterText} />;
    }, [filterText]);

    return (
        <div className="animated fadeIn">
            <CustomCard title="دسته بندی ها">
                <div className="d-inline" key="custom-button">
                    <AddButton onClick={() => { history.push("/category/add") }} />
                </div>
                <div key="card-info">
                    <CCard>
                        <CCardBody>
                            <DataTableClientSide
                                title="لیست دسته بندی ها"
                                columns={columns}
                                data={filteredItems}
                                subHeaderComponent={subHeaderComponentMemo} />
                        </CCardBody>
                    </CCard>
                </div>
            </CustomCard>
        </div>
    )
}

export default Category;