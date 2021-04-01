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

const Province = (props) => {

    let history = useHistory();

    const [filterText, setFilterText] = React.useState('');
    const [data, setData] = useState([]);
    const filteredItems = data.filter(item => (item.fname && item.fname.toLowerCase().includes(filterText.toLowerCase()))
        || (item.ename && item.ename.toLowerCase().includes(filterText.toLowerCase()))
    );

    useEffect(() => {
        // setTimeout(() => {
        //     getAllProvince()
        // }, 1000);
    }, []);

    function getAllProvince() {

        axios({
            url: "/",
            method: "post",
            data: {
                query: `
                  query {
                    getAllProvince{
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
                setData(response.data.data.getAllProvince);
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
            <CustomCard title="استان و شهر">
                <div className="d-inline" key="card-header-buttons">
                    <AddButton title="ثبت استان" onClick={() => { history.push("/province/add") }} />
                    <AddButton title="ثبت شهر" onClick={() => { history.push("/city/add") }} />
                </div>
                <div key="card-body">

                    <DataTableClientSide
                        title="لیست استان ها و شهر ها"
                        columns={columns}
                        data={filteredItems}
                        subHeaderComponent={subHeaderComponentMemo} />

                </div>
            </CustomCard>
        </div>
    )
}

export default Province;