import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { useReactToPrint } from 'react-to-print'
// import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
// import { showToast } from 'src/utils'
import DispatchedInvoiceTemplate from './DispatchedInvoiceTemplate'
import { useGetInvoiceOfSaleOrderByIdQuery } from 'src/services/SalesOrderService'
import { CircularProgress } from '@mui/material'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
// import { generatePdf } from 'src/utils/formUtils/HtmlToPdf'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'

interface ProductSalesOrder {
    productGroupId: string,
    rate: number,
    quantity: number,
    _id: string,
    dealerSalePrice: number
    productGroupLabel: string
    gst: number
    cgst: number
    sgst: number
    igst: number
    utgst: number
    productSubCategory: string,
    hsnCode: string
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
    invoiceDate: string,
    invoiceNumber: string,
    soNumber: string
    dealerLabel: string
    companyWarehouseLabel: string
    dealerWarehouse: {
        _id: string
        wareHouseName: string
        wareHouseCode: string
        email: string,
        billingAddress: {
            phone: string,
            maskedPhoneNo: string
            address: string
            countryId: string
            stateId: string
            districtId: string
            pincodeId: string
            gstNumber: string
            gstCertificate: string
            _id: string
            dealerCountryName: string
            dealerStateName: string
            dealerDistrictName: string
            dealerPincodeName: string
            panNumber: string
        }
    },
    companyWarehouse: {
        _id: string,
        wareHouseCode: string,
        wareHouseName: string,
        email: string,
        billingAddress: {
            phone: string,
            maskedPhoneNo: string,
            address: string
            countryId: string
            stateId: string
            districtId: string
            pincodeId: string
            gstNumber: string
            gstCertificate: string
            _id: string
        }
    },
    companyDetails: {
        _id: string
        companyName: string
        companyCode: string
        websiteUrl: string
        gstNo: string
        address: string
        phoneNo: string
        maskedPhoneNo: string
        bankDetails: {
            bankName: string
            branchName: string
            accountHolderName: string
            accountNumber: number
            ifscNumber: string
            accountType: string
            _id: string
        }[]
        isDeleted: boolean
        isActive: boolean
        createdAt: string
        updatedAt: string
        companyLogo: string
        panNumber: string
    }
    productSalesOrder: ProductSalesOrder[]

    // Unused Keys
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
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    warehouseEmail: string
    companyEmail: string
    __v: number
    createdAt: string
    updatedAt: string
    companyCountryName: string
    companyDistrictName: string
    companyPincodeName: string
    companyStateName: string
    dealerCountryName: string
    dealerDistrictName: string
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

    const { items, isFetching } = useGetDataByIdCustomQuery<SalesOrderInvoiceResponse>({
        useEndPointHook: useGetInvoiceOfSaleOrderByIdQuery(
            soNumber || '4',
            // {
            //     skip: !soNumber,
            // }
        ),
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleUpload = (base64Data: any) => {
        const binaryData = atob(base64Data.split(',')[1])
        const arrayBuffer = new ArrayBuffer(binaryData.length)
        const byteArray = new Uint8Array(arrayBuffer)

        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
        const file = new File([blob], items?.soNumber ? `${items?.soNumber}.pdf` : 'generated.pdf', { type: 'application/pdf' })

        let formData: any = new FormData()

        formData.append('type', file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT')
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

        window.print()
        // For Generating the PDF

        // try {
        //     const pdfUri = await generatePdf(saleOrderInvoiceRef) // Generate the PDF
        //     handleUpload(pdfUri) // Upload the PDF
        // } catch (error) {
        //     console.error('Error generating PDF and uploading:', error)
        // }
    }

    return (
        <div>
            {isFetching && (
                <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                    <CircularProgress />
                </div>
            )}

            <DispatchedInvoiceTemplate
                ref={saleOrderInvoiceRef}
                items={items || null}
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
                >
                    Print
                </button>
            </div>
        </div>
    )
}

export default DispatchedInvoiceWrapper
