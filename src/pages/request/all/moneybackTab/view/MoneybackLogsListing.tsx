// |-- Built-in Dependencies --|
import React from 'react'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

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
        label: 'Moneyback Logs',
        path: '/request/moneyback',
    },
    {
        label: 'View',
    },
]

const MoneybackLogsListing = ({ columns, rows, isTableLoading }: Props) => {
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> View </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        <div className="text-xl font-medium pl-2">
                            Moneyback Order Logs
                        </div>
                        {/* BUTTON - Add SO */}
                        <div></div>
                    </div>

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
        </div>
    )
}

export default MoneybackLogsListing
