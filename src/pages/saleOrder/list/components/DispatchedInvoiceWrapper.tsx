import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import DispatchedInvoiceTemplate from './DispatchedInvoiceTemplate'
import { useGetSalesOrderInvoiceQuery } from 'src/services/SalesOrderService'

const DispatchedInvoiceWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const saleOrderId = params?.id
    const saleOrderInvoiceRef = React.useRef(null)

    const handlePrint = useReactToPrint({
        content: () => saleOrderInvoiceRef?.current,
    })

    const { isLoading, isFetching, data } = useGetSalesOrderInvoiceQuery(
        saleOrderId || ' ',
        {
            skip: !saleOrderId,
        }
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            console.log('data', data)
        }
    }, [isLoading, isFetching, data])

    return (
        <SideNavLayout>
            <div>
                <DispatchedInvoiceTemplate ref={saleOrderInvoiceRef} />
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
