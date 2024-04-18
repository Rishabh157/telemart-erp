import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import DispatchedInvoiceTemplate from './DispatchedInvoiceTemplate'
import { useGetSalesOrderByIdQuery } from 'src/services/SalesOrderService'
import { CircularProgress } from '@mui/material'

const DispatchedInvoiceWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [invoiceData, setInvoiceData] = useState([])
    const saleOrderId = params?.id
    const saleOrderInvoiceRef = React.useRef(null)

    const handlePrint = useReactToPrint({
        content: () => saleOrderInvoiceRef?.current,
    })

    const { isLoading, isFetching, data } = useGetSalesOrderByIdQuery(
        saleOrderId || ' ',
        {
            skip: !saleOrderId,
        }
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            setInvoiceData(data?.data?.[0])
        }
    }, [isLoading, isFetching, data])

    return (
        <SideNavLayout>
            <div>
                {(isLoading || isFetching) && (
                    <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}
                <DispatchedInvoiceTemplate
                    ref={saleOrderInvoiceRef}
                    saleOrderData={invoiceData}
                />
                <div className="flex justify-end gap-x-4 m-4">
                    <button
                        className="bg-slate-300 px-2 py-1 text-black rounded"
                        onClick={() => navigate('/sale-order')}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-primary-main px-2 py-1 text-white rounded"
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default DispatchedInvoiceWrapper
