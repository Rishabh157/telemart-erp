import React from 'react'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

type Props = {
    columns: any[]
    rows: any[]
    isTableLoading: boolean
}

const SingleComplaintListingLogs = ({
    columns,
    rows,
    isTableLoading,
}: Props) => {
    return (
        <div className="grow w-full overflow-x-auto mt-4 h-[60vh]">
            <ATMTable
                isLoading={isTableLoading}
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
