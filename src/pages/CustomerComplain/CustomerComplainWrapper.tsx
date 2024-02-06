import React from 'react'
import { Formik, FormikProps } from 'formik'
import CustomerComplain from './CustomerComplain'
import { useGetCustomerComplainDetailsBySearchMutation } from 'src/services/CustomerComplainServices'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'

export type FormInitialValues = {
    incomingNumber: string
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
            renderCell: (row: any) => <span>{row.orderNumber} </span>,
        },
        {
            field: 'didNo',
            headerName: 'Enq No.',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.didNo} </span>,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.flagStatus} </span>,
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
            field: 'alternateNo',
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
            renderCell: (row: any) => (
                <span> {row.dispositionLevelThreeLabel} </span>
            ),
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
            renderCell: (row: any) => <span> null </span>,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            renderCell: (row: any) => <span> {row.totalAmount} </span>,
        },
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
            renderCell: (row: any) => <span> </span>,
        },
    ]

    // Table Data with MobileNo filtered

    const [getOrderDetailsBySearch] =
        useGetCustomerComplainDetailsBySearchMutation()

    const initialValues: FormInitialValues = {
        incomingNumber: '',
        contactNumber: '',
        orderNumber: 0,
        complaintNumber: 0,
        email: '',
        barcode: '',
        refOrderNumber: 0,
    }

    // Caller Page Save Button Form Updation
    const onSubmitHandler = (values: FormInitialValues, { resetForm }: any) => {
        const { refOrderNumber, ...rest } = values
        setTimeout(() => {
            getOrderDetailsBySearch(rest).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        // Destructure the API data
                        const {
                            customerName,
                            emailId,
                            gender,
                            incomingCallerNo,
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

                        // Update the state with the API data
                        setCustomerDetails({
                            name: customerName || '',
                            emailOfDetails: emailId || '',
                            gender: gender || '',
                            incomingNumberOfDetails: incomingCallerNo || '',
                            mobileNumber: mobileNo || '',
                            alternateNo1: alternateNo || '',
                            alternateNo2: whatsappNo || '', // Assuming alternateNo2 is not available in the API data
                            address1: houseNumber || '',
                            address2: streetNumber || '', // Assuming address2 is not available in the API data
                            address3: landmark || '',
                            address4: '', // Assuming address4 is not available in the API data
                            district: districtLabel || '',
                            state: stateLabel || '',
                            pincode: pincodeLabel || '',
                            orderListing: allOrderData || [],
                        })

                        // setCustomerDetails()
                        // showToast('success', 'caller added successfully!')
                        // resetForm({ isSubmitting: false, dirty: false })
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                // setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <form autoComplete="off">
                            <CustomerComplain
                                formikProps={formikProps}
                                customerDetails={customerDetails}
                                column={columns || []}
                            />
                        </form>
                    )
                }}
            </Formik>
        </>
    )
}

export default CustomerComplainWrapper
