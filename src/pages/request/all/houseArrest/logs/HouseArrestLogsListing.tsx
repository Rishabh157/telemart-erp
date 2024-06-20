// |-- Built-in Dependencies --|
import React from 'react'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
// import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Internal Dependencies --|
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

type Props = {
    columns: any[]
    rows: any[]
    isTableLoading: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'House Arrest Logs',
        path: '/request/house-arrest',
    },
    {
        label: 'Logs',
    },
]

const HouseArrestLogsListing = ({ columns, rows, isTableLoading }: Props) => {
    return (
        <div className="h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                {/* <div className="pt-1 ">
                    <ATMPageHeading> View </ATMPageHeading>
                </div> */}

                <div className="grow w-full overflow-x-auto mt-4 h-[60vh]">
                    <ATMTable
                        isLoading={isTableLoading}
                        extraClasses="max-h-full overflow-auto"
                        columns={columns}
                        rows={rows}
                    />
                </div>
            </div>
        </div>
    )
}

export default HouseArrestLogsListing
