import React from 'react'
import {
    CCol,
    CAlert
} from '@coreui/react';
import DataTable from 'react-data-table-component';

const DataTableServerSide = ({ title, columns, data, paginationTotalRows, onChangePage, onChangeRowsPerPage }) => (

    <DataTable
        title={title}
        columns={columns}
        data={data}
        striped
        pagination
        // progressPending={loading}
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        noDataComponent={
            <CCol xs="12"><CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert></CCol>
        }
        paginationComponentOptions={{ rowsPerPageText: 'نمایش', rangeSeparatorText: 'از' }}
        paginationServer
        direction="rtl" />
)

export default DataTableServerSide