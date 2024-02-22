import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { FormInitialValues } from './AddNdrDispositionWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}
enum smsType {
    alcobanSms = 'ALCOBAN_SMS',
    complaintCCA_CNC = 'COMPLAINT_CCA-CUSTOMER_NOT_CONTACTABLE',
    complaintCCA_OWEI = 'COMPLAINT_CCA-ORDERS_WITH_EMAIL_ID',
    complaintCCA_OWNEI = 'COMPLAINT_CCA-ORDERS_WITHOUT_EMAIL_ID',
    complaintORC = 'COMPLAINT_ORDER_REFUNDED-CHEQUE',
    complaintORN = 'COMPLAINT_ORDER_REFUNDED-NEFT',
    complaintRPIM = 'COMPLAINT_RPI-MANUAL',
    complaintRPI = 'COMPLAINT_RPI-TV-SHOP_COURIER_ASSIGNED',
    complaintSCD = 'COMPLAINT_SERVICE_CENTRE_DETAILS',
    createComplant = 'CREATE_COMPLAINT',
    dealerDelivered = 'DEALER_DELIVERED',
    dealerDeliveredBI = 'DEALER_DELIVERED_BOY_INTRANSIT',
    dealer_intransite = 'DEALER_INTRANSIT',
    default = 'DEFAULT',
    dhundhar = 'DHUNDHAR',
    dispositionMsg = 'DISPOSITION_MESSAGE',
    hold = 'HOLD',
    inTransitDB = 'IN-TRANSIT_DELIVERY_BOY',
    invoiceSent = 'INVOICE_SENT',
    nonConnect = 'NON-CONNECT',
    orderCancellationAgentId = 'ORDER_CANCELLATION-CANCELLATION_BY_AN_AGENT_ID',
    orderCancellationOutOfStock = 'ORDER_CANCELLATION-OUT_OF_STOCK',
    orderCreation = 'ORDER_CREATION',
    orderCreationTest = 'ORDER_CREATION_TEST',
    orderDelivered = 'ORDER_DELIVERED',
    orderMarkedNDR = 'ORDER_MARKED_NDR',
    orderShippedCOD = 'ORDER_SHIPPED_COD',
    orderShippedPrepaid = 'ORDER_SHIPPED_PREPAID',
    orderShippingSlaBreach = 'ORDER_SHIPPING_SLA_BREACH',
    orderVerification = 'ORDER_VERIFICATION',
    orderManualSms = 'ORDER-MANUAL_SMS',
    productReceived = 'PRODUCT_RECEIVED',
    refundChequePrepared = 'REFUND_CHEQUE_PREPARED',
    refundProcessed = 'REFUND_PROCESSED',
    replacementOrderCreat = 'REPLACEMENT_ORDER_CREAT',
    replacementOrderShipp = 'REPLACEMENT_ORDER_SHIPP',
    replacementProcessed = 'REPLACEMENT_PROCESSED',
    sendCourierDetails = 'SEND_COURIER_DETAILS',
    test = 'TEST',
    tribeslimSms = 'TRIBESLIM_SMS',
    urgentOrder = 'URGENT_ORDER',
}
export const smstypeOptions = () => {
    let options = [
        { value: smsType.alcobanSms, label: smsType.alcobanSms },
        {
            value: smsType.complaintCCA_CNC,
            label: smsType.complaintCCA_CNC,
        },
        {
            value: smsType.complaintCCA_OWEI,
            label: smsType.complaintCCA_OWEI,
        },
        {
            value: smsType.complaintCCA_OWNEI,
            label: smsType.complaintCCA_OWNEI,
        },
        { value: smsType.complaintORC, label: smsType.complaintORC },
        { value: smsType.complaintORN, label: smsType.complaintORN },
        { value: smsType.complaintRPIM, label: smsType.complaintRPIM },
        { value: smsType.complaintRPI, label: smsType.complaintRPI },
        { value: smsType.complaintSCD, label: smsType.complaintSCD },
        { value: smsType.createComplant, label: smsType.createComplant },
        { value: smsType.dealerDelivered, label: smsType.dealerDelivered },
        {
            value: smsType.dealerDeliveredBI,
            label: smsType.dealerDeliveredBI,
        },
        {
            value: smsType.dealer_intransite,
            label: smsType.dealer_intransite,
        },
        { value: smsType.default, label: smsType.default },
        { value: smsType.dhundhar, label: smsType.dhundhar },
        { value: smsType.dispositionMsg, label: smsType.dispositionMsg },
        { value: smsType.hold, label: smsType.hold },
        { value: smsType.inTransitDB, label: smsType.inTransitDB },
        { value: smsType.invoiceSent, label: smsType.invoiceSent },
        { value: smsType.nonConnect, label: smsType.nonConnect },
        {
            value: smsType.orderCancellationAgentId,
            label: smsType.orderCancellationAgentId,
        },
        {
            value: smsType.orderCancellationOutOfStock,
            label: smsType.orderCancellationOutOfStock,
        },
        { value: smsType.orderCreation, label: smsType.orderCreation },
        {
            value: smsType.orderCreationTest,
            label: smsType.orderCreationTest,
        },
        { value: smsType.orderDelivered, label: smsType.orderDelivered },
        { value: smsType.orderMarkedNDR, label: smsType.orderMarkedNDR },
        { value: smsType.orderShippedCOD, label: smsType.orderShippedCOD },
        {
            value: smsType.orderShippedPrepaid,
            label: smsType.orderShippedPrepaid,
        },
        {
            value: smsType.orderShippingSlaBreach,
            label: smsType.orderShippingSlaBreach,
        },
        {
            value: smsType.orderVerification,
            label: smsType.orderVerification,
        },
        { value: smsType.orderManualSms, label: smsType.orderManualSms },
        { value: smsType.productReceived, label: smsType.productReceived },
        {
            value: smsType.refundChequePrepared,
            label: smsType.refundChequePrepared,
        },
        { value: smsType.refundProcessed, label: smsType.refundProcessed },
        {
            value: smsType.replacementOrderCreat,
            label: smsType.replacementOrderCreat,
        },
        {
            value: smsType.replacementOrderShipp,
            label: smsType.replacementOrderShipp,
        },
        {
            value: smsType.replacementProcessed,
            label: smsType.replacementProcessed,
        },
        {
            value: smsType.sendCourierDetails,
            label: smsType.sendCourierDetails,
        },
        { value: smsType.test, label: smsType.test },
        { value: smsType.tribeslimSms, label: smsType.tribeslimSms },
        { value: smsType.urgentOrder, label: smsType.urgentOrder },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

enum emailType {
    personalEmail = 'PERSONAL_EMAIL',
    officialEmail = 'OFFICIAL_EMAIL',
    buisnessEmail = 'BUISNESS_EMAIL',
    companyEmail = 'COMPANY_EMAIL',
}
export const emailTypeOptions = () => {
    let options = [
        { value: emailType.personalEmail, label: emailType.personalEmail },
        {
            value: emailType.officialEmail,
            label: emailType.officialEmail,
        },
        {
            value: emailType.buisnessEmail,
            label: emailType.buisnessEmail,
        },
        {
            value: emailType.companyEmail,
            label: emailType.companyEmail,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

enum RtoAttemptType {
    customerWillConnect = 'CUSTOMER_WILL_CONNECT',
    attempt = 'ATTEMPT',
    rto = 'RTO',
    hold = 'HOLD',
    cancel = 'CANCEL',
}
export const RTOTypeOptions = () => {
    let options = [
        {
            value: RtoAttemptType.customerWillConnect,
            label: RtoAttemptType.customerWillConnect,
        },
        {
            value: RtoAttemptType.attempt,
            label: RtoAttemptType.attempt,
        },
        {
            value: RtoAttemptType.rto,
            label: RtoAttemptType.rto,
        },
        {
            value: RtoAttemptType.hold,
            label: RtoAttemptType.hold,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}
const AddNdrDisposition = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'NDR Disposition',
            path: '/dispositions/ndr-disposition',
        },
        {
            label: 'Add ',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    const priorityOptions = () => {
        let Opoptions: any = []
        for (let i = 1; i <= 50; i++) {
            Opoptions = [
                ...Opoptions,
                {
                    label: i.toString(),
                    value: i.toString(),
                },
            ]
        }
        return Opoptions
    }

    return (
        <>
            <div className="">
                <div className="p-4 flex flex-col gap-2  ">
                    {/* Breadcrumbs */}
                    <div className="">
                        <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                    </div>

                    {/* Page Heading */}
                    <div className="pt-1">
                        <ATMPageHeading> Add </ATMPageHeading>
                    </div>

                    <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                        <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                            {/* Form Heading */}
                            <div className="text-xl font-medium"> Details </div>

                            {/* BUTTON - Add Button */}
                            <div>
                                <button
                                    type="button"
                                    disabled={apiStatus}
                                    onClick={() => formikProps.handleSubmit()}
                                    className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                        apiStatus ? 'opacity-50' : ''
                                    }`}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="grow py-8 px-3 ">
                            <div className="grid grid-cols-3 gap-4">
                                {/* languageName */}
                                <ATMTextField
                                    name="ndrDisposition"
                                    value={values.ndrDisposition}
                                    label="Disposition Name"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            'ndrDisposition',
                                            e.target.value
                                        )
                                    }
                                />
                                <ATMSelectSearchable
                                    options={smstypeOptions()}
                                    name="smsType"
                                    value={values.smsType}
                                    label="Sms type"
                                    onChange={(e) =>
                                        handleSetFieldValue('smsType', e)
                                    }
                                />

                                <ATMSelectSearchable
                                    options={emailTypeOptions()}
                                    name="emailType"
                                    value={values.emailType}
                                    label="emailType"
                                    onChange={(e) =>
                                        handleSetFieldValue('emailType', e)
                                    }
                                />
                                <ATMSelectSearchable
                                    name="priority"
                                    value={values.priority}
                                    label="priority"
                                    options={priorityOptions()}
                                    onChange={(e) =>
                                        handleSetFieldValue('priority', e)
                                    }
                                />
                                <ATMSelectSearchable
                                    options={RTOTypeOptions()}
                                    name="rtoAttempt"
                                    value={values.rtoAttempt}
                                    label="rtoAttempt"
                                    onChange={(e) =>
                                        handleSetFieldValue('rtoAttempt', e)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNdrDisposition
