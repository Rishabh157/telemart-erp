import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { useGetInvoiceByOrderNumberQuery } from 'src/services/OrderService'
import { OrderListResponse } from 'src/models'
import RetailILabel from './RetailILabel'
import RetailInvoice from './RetailInvoice'

type Props = {
    type: 'LABEL' | 'INVOICE' | 'BOTH'
}

const GpoInvoiceAndLabelWrapper = ({ type }: Props) => {
    const { search, state } = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(search)
    const orderNumber = queryParams.get('orderNumber')

    const { items } = useGetDataByIdCustomQuery<OrderListResponse>({
        useEndPointHook: useGetInvoiceByOrderNumberQuery(orderNumber, {
            skip: !orderNumber,
        }),
    })

    React.useEffect(() => {
        const printFunc = setTimeout(() => {
            window?.print()
        }, 1000)

        const handleAfterPrint = () => {
            navigate(state.pathname)
            // Your custom logic after print dialog is closed
        }

        const handleCancelPrint = () => {
            navigate(state.pathname)
            // Your custom logic when the print dialog is cancelled
        }

        type === 'BOTH' &&
            window.addEventListener('afterprint', handleAfterPrint)
        type === 'BOTH' &&
            window.addEventListener('beforeprint', handleCancelPrint) // Listen for beforeprint event

        return () => {
            clearInterval(printFunc)
            type === 'BOTH' &&
                window.removeEventListener('afterprint', handleAfterPrint)
            type === 'BOTH' &&
                window.removeEventListener('beforeprint', handleCancelPrint)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {(() => {
                switch (type) {
                    case 'LABEL':
                        return (
                            <RetailILabel items={items as OrderListResponse} />
                        )
                    case 'INVOICE':
                        return (
                            <RetailInvoice items={items as OrderListResponse} />
                        )
                    case 'BOTH':
                        return (
                            <>
                                <RetailILabel
                                    items={items as OrderListResponse}
                                />
                                <RetailInvoice
                                    items={items as OrderListResponse}
                                />
                            </>
                        )
                    default:
                        return null
                }
            })()}
        </>
    )
}

export default GpoInvoiceAndLabelWrapper
