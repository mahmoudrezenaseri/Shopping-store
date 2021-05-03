import React from 'react'
import {
    CCol,
    CAlert
} from '@coreui/react';
import DataTable from 'react-data-table-component';
import Progress from './progress.component'


const DataTableServerSide = ({ title, columns, data, paginationTotalRows, progressPending, onChangePage, onChangeRowsPerPage }) => (

    <DataTable
        title={title}
        columns={columns}
        data={data}
        striped
        selectableRows
        noContextMenu={true}
        pagination
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        noDataComponent={
            <CCol xs="12"><CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert></CCol>
        }
        paginationComponentOptions={{ rowsPerPageText: 'نمایش', rangeSeparatorText: 'از' }}
        paginationServer
        progressPending={progressPending}
        progressComponent={<Progress />}
        highlightOnHover
        direction="rtl" />
)

export default DataTableServerSide