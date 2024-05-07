import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { useReactToPrint } from 'react-to-print'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import DispatchedInvoiceTemplate from './DispatchedInvoiceTemplate'
import { useGetInvoiceOfSaleOrderByIdQuery } from 'src/services/SalesOrderService'
import { CircularProgress } from '@mui/material'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { generatePdf } from 'src/utils/formUtils/HtmlToPdf'
// import { showToast } from 'src/utils'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    _id: string
    groupName: string
    sgst: number
    igst: number
    gst: number
    cgst: number
}

interface Address {
    phone: string
    maskedPhoneNo: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
    gstNumber: string
    gstCertificate: string
    _id: string
}

export interface SalesOrderInvoiceResponse {
    _id: string
    soNumber: string
    dealerId: string
    dealerWareHouseId: string
    companyWareHouseId: string
    dhApprovedById: string | null
    dhApproved: any | null
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApprovedById: string | null
    accApproved: any | null
    accApprovedActionBy: string
    accApprovedAt: string
    productSalesOrder: ProductSalesOrder[]
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    warehouseEmail: string
    companyEmail: string
    __v: number
    createdAt: string
    updatedAt: string
    // company details
    companyCountryName: string
    companyDistrictName: string
    companyPincodeName: string
    companyStateName: string
    companyWarehouseLabel: string
    companyWarehouseBillingAddress: Address
    // dealer details
    dealerCountryName: string
    dealerDistrictName: string
    dealerLabel: string
    dealerPincodeName: string
    dealerStateName: string
    warehouseLabel: string
    warehouseBillingAddress: Address
}

const DispatchedInvoiceWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    const soNumber = params?.id

    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()

    const saleOrderInvoiceRef = React.useRef(null)

    const { items, isFetching } =
        useGetDataByIdCustomQuery<SalesOrderInvoiceResponse>({
            useEndPointHook: useGetInvoiceOfSaleOrderByIdQuery(
                soNumber || ' ',
                {
                    skip: !soNumber,
                }
            ),
        })

    // const handlePrint = useReactToPrint({
    //     content: () => saleOrderInvoiceRef?.current,
    // })

    const handleUpload = (base64Data: any) => {
        const binaryData = atob(base64Data.split(',')[1])
        const arrayBuffer = new ArrayBuffer(binaryData.length)
        const byteArray = new Uint8Array(arrayBuffer)

        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
        const file = new File(
            [blob],
            items?.soNumber ? `${items?.soNumber}.pdf` : 'generated.pdf',
            { type: 'application/pdf' }
        )

        let formData: any = new FormData()
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('file', file || '')
        formData.append('bucketName', 'SAPTEL_CRM')

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                return fileUrl
            }
        })
    }

    const handleClick = async () => {
        try {
            const pdfUri = await generatePdf(saleOrderInvoiceRef) // Generate the PDF
            handleUpload(pdfUri) // Upload the PDF
        } catch (error) {
            console.error('Error generating PDF and uploading:', error)
        }
    }

    return (
        <SideNavLayout>
            <div>
                {isFetching && (
                    <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                        <CircularProgress />
                    </div>
                )}

                <DispatchedInvoiceTemplate
                    ref={saleOrderInvoiceRef}
                    invoice={items || null}
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
                        onClick={handleClick}
                        // onClick={handlePrint}
                    >
                        Print
                    </button>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default DispatchedInvoiceWrapper
