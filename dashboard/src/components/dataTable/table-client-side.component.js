import React from 'react'
import {
    CCol,
    CAlert
} from '@coreui/react';
import DataTable from 'react-data-table-component';

const DataTableClientSide = ({ title, columns, data, subHeaderComponent }) => (

    <DataTable
        title={title}
        columns={columns}
        data={data}
        striped
        subHeader
        subHeaderComponent={subHeaderComponent}
        pagination
        // paginationResetDefaultPage={paginationResetDefaultPage}
        noDataComponent={
            <CCol xs="12"><CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert></CCol>
        }
        paginationComponentOptions={{ rowsPerPageText: 'نمایش', rangeSeparatorText: 'از' }}
        direction="rtl" />
)

export default DataTableClientSide