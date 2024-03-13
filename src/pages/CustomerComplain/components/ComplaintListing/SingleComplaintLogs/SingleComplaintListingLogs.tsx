import React from 'react'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

type Props = {
    columns: any[]
    rows: any[]
}

const SingleComplaintListingLogs = ({ columns, rows }: Props) => {
    return (
        <div className="grow w-full overflow-x-auto mt-4 h-[500px]">
            <ATMTable
                // isLoading={isTableLoading}
                columns={columns}
                rows={rows}
                // isCheckbox={true}
                // selectedRows={selectedRows}
                // onRowSelect={(selectedRows) =>
                //     setSelectedRows(selectedRows)
                // }
                extraClasses="max-h-full overflow-auto"
            />
        </div>
    )
}

export default SingleComplaintListingLogs
