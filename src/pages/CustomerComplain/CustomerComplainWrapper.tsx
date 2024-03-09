import React from 'react'
import { Formik, FormikProps } from 'formik'
import CustomerComplain from './CustomerComplain'
import { useGetCustomerComplainDetailsBySearchMutation } from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

export type FormInitialValues = {
    // incomingNumber: string
    contactNumber: string
    orderNumber: number
    complaintNumber: number
    email: string
    barcode: string
    refOrderNumber?: number
}

export interface CustomerDetailsPropsTypes {
    name: string
    emailOfDetails: string
    gender: string
    incomingNumberOfDetails: string
    mobileNumber: string
    alternateNo1: string
    alternateNo2: string
    address1: string
    address2: string
    address3: string
    address4: string
    district: string
    state: string
    pincode: string
    orderListing: any[]
}

const CustomerComplainWrapper = () => {
    const [apiStatus, setApiStatus] = React.useState<boolean>(false)
    const [complaintContactNo, setComplaintContactNo] = React.useState<string>()

    const [customerDetails, setCustomerDetails] =
        React.useState<CustomerDetailsPropsTypes>({
            name: '',
            emailOfDetails: '',
            gender: '',
            incomingNumberOfDetails: '',
            mobileNumber: '',
            alternateNo1: '',
            alternateNo2: '',
            address1: '',
            address2: '',
            address3: '',
            address4: '',
            district: '',
            state: '',
            pincode: '',
            orderListing: [],
        })

    // Table Fields
    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No.',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs',
            renderCell: (row: any) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'inquiryNumber',
            headerName: 'Enq No.',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.inquiryNumber} </span>,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> - </span>,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.agentName} </span>,
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.districtLabel} </span>,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.pincodeLabel} </span>,
        },
        {
            field: 'mobileNo',
            headerName: 'Phone',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.mobileNo} </span>,
        },
        {
            field: 'disposition',
            headerName: 'Disposition',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> - </span>,
        },
        {
            field: 'scheme',
            headerName: 'Scheme',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.schemeName} </span>,
        },
        {
            field: 'shippingCharge',
            headerName: 'Shipping Charge',
            flex: 'flex-[4_4_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.deliveryCharges} </span>,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> - </span>,
        },
        // {
        //     field: 'amount',
        //     headerName: 'Amount',
        //     flex: 'flex-[3_3_0%]',
        //     align: 'center',
        //     extraClasses: 'text-xs',
        //     hidden: true,
        //     renderCell: (row: any) => <span> {row.totalAmount} </span>,
        // },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.remark} </span>,
        },
        {
            field: 'compl',
            headerName: 'Complaint',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> - </span>,
        },
    ]

    // Table Data with MobileNo filtered

    const [getOrderDetailsBySearch] =
        useGetCustomerComplainDetailsBySearchMutation()

    const initialValues: FormInitialValues = {
        // incomingNumber: '',
        contactNumber: '',
        orderNumber: 0,
        complaintNumber: 0,
        email: '',
        barcode: '',
        refOrderNumber: 0,
    }

    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {
        setApiStatus(true)
        const { refOrderNumber, complaintNumber, ...rest } = values
        setTimeout(() => {
            getOrderDetailsBySearch(rest).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        // Destructure the API data
                        const {
                            customerName,
                            emailId,
                            gender,
                            // incomingCallerNo,
                            mobileNo,
                            alternateNo,
                            whatsappNo,
                            houseNumber,
                            streetNumber,
                            landmark,
                            districtLabel,
                            stateLabel,
                            pincodeLabel,
                        } = res?.data?.data

                        const { allOrderData } = res?.data

                        setComplaintContactNo(mobileNo) // set contact number for complaint data api
                        // Update the state with the API data
                        setCustomerDetails({
                            name: customerName || '',
                            emailOfDetails: emailId || '',
                            gender: gender || '',
                            incomingNumberOfDetails: mobileNo || '',
                            mobileNumber: mobileNo || '',
                            alternateNo1: alternateNo || '',
                            alternateNo2: whatsappNo || '',
                            address1: houseNumber || '',
                            address2: streetNumber || '',
                            address3: landmark || '',
                            address4: '',
                            district: districtLabel || '',
                            state: stateLabel || '',
                            pincode: pincodeLabel || '',
                            orderListing: allOrderData || [],
                        })
                        // resetForm({ isSubmitting: false, dirty: false })
                        setApiStatus(false)
                    } else {
                        showToast('error', res?.data?.message)
                        setApiStatus(false)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                    setApiStatus(false)
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <CustomerComplain
                            formikProps={formikProps}
                            customerDetails={customerDetails}
                            column={columns || []}
                            apiStatus={apiStatus}
                            contactNumber={complaintContactNo || ''}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default CustomerComplainWrapper
