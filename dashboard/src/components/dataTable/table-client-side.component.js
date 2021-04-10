import React from 'react'
import {
    CCol,
    CAlert
} from '@coreui/react';
import DataTable from 'react-data-table-component';

const DataTableClientSide = ({ title, columns, data, subHeaderComponent, onSelectedRowsChange }) => {

    return (
        <DataTable
            noHeader
            columns={columns}
            data={data}
            striped
            subHeader
            selectableRows
            noContextMenu={true}
            subHeaderComponent={subHeaderComponent}
            onSelectedRowsChange={onSelectedRowsChange}
            pagination
            // paginationResetDefaultPage={paginationResetDefaultPage}
            noDataComponent={
                <CCol xs="12"> <CAlert color="primary" className="text-center">موردی یافت نشد!</CAlert></CCol>
            }
            paginationComponentOptions={{ rowsPerPageText: 'نمایش', rangeSeparatorText: 'از' }}
            direction="rtl" />
    )
}

export default DataTableClientSide