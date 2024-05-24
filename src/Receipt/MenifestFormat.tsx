import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { OrderListResponse } from 'src/models'
import { useGetOrderQuery } from 'src/services/OrderService'
import moment from 'moment'

const tableHead = 'border-r border-l border-slate-900 py-1 '
const tableCell = 'border-r border-l border-slate-900 p-[5px] text-center'

const MenifestFormat = () => {
    const { state } = useLocation()
    const { filter, warehouseId, providerName } = state
    const { userData }: any = useSelector((state: RootState) => state?.auth)

    const { items } = useGetCustomListingData<OrderListResponse>({
        useEndPointHook: useGetOrderQuery({
            limit: 0,
            searchValue: '',
            params: ['didNo', 'mobileNo'],
            page: 1,
            filterBy: [
                {
                    fieldName: 'orderAssignedToCourier',
                    value: providerName,
                },
                { fieldName: 'companyId', value: userData?.companyId },
                { fieldName: 'assignWarehouseId', value: warehouseId },
                { fieldName: 'orderStatus', value: filter?.orderStatus?.value },
            ],
            dateFilter: {
                startDate: filter.startDate.value as string,
                endDate: filter.endDate.value as string,
            },
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: false,
        }),
    })

    React.useEffect(() => {
        if (items && items.length > 0) {
            const printFunc = setTimeout(() => {
                window?.print()
            }, 1500)

            // const handleAfterPrint = () => {
            //     navigate(state.pathname)
            //     // Your custom logic after print dialog is closed
            // }

            // const handleCancelPrint = () => {
            //     navigate(state.pathname)
            //     // Your custom logic when the print dialog is cancelled
            // }

            // type === 'BOTH' &&
            //     window.addEventListener('afterprint', handleAfterPrint)
            // type === 'BOTH' &&
            //     window.addEventListener('beforeprint', handleCancelPrint) // Listen for beforeprint event

            return () => {
                clearInterval(printFunc)
                // window.removeEventListener('afterprint', handleAfterPrint)

                // window.removeEventListener('beforeprint', handleCancelPrint)
            }
        }
    }, [items])

    return (
        <div className="bg-white h-[100vh] mx-auto my-auto text-[14px]">
            <div className="flex justify-between p-4">
                <div>
                    <div>
                        <span className="font-semibold px-4">Company Name</span>
                        : Saptel
                    </div>
                    <div>
                        <span className="font-semibold px-4">
                            Total Orders Quantity
                        </span>
                        : {items?.length}
                    </div>
                    <div>
                        <span className="font-semibold px-4">
                            Service Provider Name
                        </span>
                        : {providerName}
                    </div>
                </div>
                <div>
                    <span className="font-semibold">Date</span>:{' '}
                    {moment().format('DD-MM-YYYY')}
                </div>
            </div>

            <table width="100%" className="mt-5 border-t border-black">
                <thead>
                    <tr className=" border-black font-normal">
                        <th className={tableHead}>Product Name</th>
                        <th className={tableHead}>AWB Number</th>
                        <th className={`${tableHead}`}>Order Number</th>
                        <th className={tableHead}>Product Quantity</th>
                        <th className={`${tableHead}`}>
                            Primary/Secondary Courier Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((ele, ind) => {
                        return (
                            <tr
                                className="border-y border-black font-normal"
                                key={ind}
                            >
                                <td className={tableCell}>{ele?.schemeName}</td>
                                <td className={tableCell}>{ele?.awbNumber}</td>
                                <td className={tableCell}>
                                    {ele?.orderNumber}
                                </td>
                                <td className={tableCell}>
                                    {ele?.shcemeQuantity}
                                </td>
                                <td className={tableCell}>
                                    {ele?.orderAssignedToCourier} /{' '}
                                    {ele?.secondaryCourierPartner}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="flex justify-between  mt-5 mb-20 pl-2">
                <p className="font-semibold text-[12px] w-1/2">
                    This Is System Generated Receipt/Invoice Hence No Signature
                    Or Stamp Is Required
                </p>
                <p className="text-[12px] pr-10">Autorized Signatory</p>
            </div>
        </div>
    )
}

export default MenifestFormat
