import { statusProps } from 'src/pages/orders'
import { GetHierarchByDeptProps } from '../GetHierarchyByDept'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { barcodeStatusEnum } from './enums'

// Get Order Status Options
export const getOrderStatusOptions = () => {
    let options = [
        // {
        //     label: 'Prepaid',
        //     value: statusProps.prepaid,
        // },
        // {
        //     label: 'Delivered',
        //     value: statusProps.delivered,
        // },
        // {
        //     label: 'Door Cancelled',
        //     value: statusProps.doorCancelled,
        // },
        // {
        //     label: 'Hold',
        //     value: statusProps.hold,
        // },
        // {
        //     label: 'PSC',
        //     value: statusProps.psc,
        // },
        // {
        //     label: 'UNA',
        //     value: statusProps.una,
        // },
        // {
        //     label: 'PND',
        //     value: statusProps.pnd,
        // },
        {
            label: 'Urgent',
            value: statusProps.urgent,
        },
        {
            label: 'Fresh',
            value: statusProps.fresh,
        },
        // {
        //     label: 'Inquiry',
        //     value: statusProps.inquiry,
        // },
        // {
        //     label: 'In Transit',
        //     value: statusProps.intransit,
        // },
        // {
        //     label: 'NDR',
        //     value: statusProps.ndr,
        // },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Filter Status Types
enum FilterStatusType {
    active = 'ACTIVE',
    deActivate = 'DE_ACTIVATE',
}

export const filterStatusOptions = () => {
    let options = [
        {
            label: 'Activate',
            value: FilterStatusType.active,
        },
        {
            label: 'Deactivate',
            value: FilterStatusType.deActivate,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

// SMS TYPE
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

// EMAIL TYPE
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

// NDR  Sub Disposition
enum NDRSubDispositions {
    cancel = 'CANCEL',
    adtm = 'ADTM',
    adoth = 'ADOTH',
    notReachable = 'NOTREACHABLE',
    numberBusy = 'NUMBERBUSY',
    ringingNoResponse = 'RINGINGNORESPONSE',
    switchOff = 'SWITCHOFF',
    notConnected = 'NOTCONNECTED',
    notInterested = 'NOTINTERESTED',
    callBack = 'CALLBACK',
    other = 'OTHER',
    dnc = 'DNC',
    dcFOR = 'DCFOR',
    dcUCR = 'DCUCR',
    schemeOffered = 'SCHEMEOFFERED',
    webReattempt = 'WEBREATTEMPT',
}

export const ndrSubDispositionsTypeOptions = () => {
    let options = [
        {
            value: NDRSubDispositions.cancel,
            label: 'Cancel',
        },
        {
            value: NDRSubDispositions.adtm,
            label: NDRSubDispositions.adtm,
        },
        {
            value: NDRSubDispositions.adoth,
            label: NDRSubDispositions.adoth,
        },
        {
            value: NDRSubDispositions.notReachable,
            label: 'Not Reachable',
        },
        {
            value: NDRSubDispositions.numberBusy,
            label: 'Number Busy',
        },
        {
            value: NDRSubDispositions.ringingNoResponse,
            label: 'Ringing No Response',
        },
        {
            value: NDRSubDispositions.switchOff,
            label: 'Switch Off',
        },
        {
            value: NDRSubDispositions.notConnected,
            label: 'Not Connected',
        },
        {
            value: NDRSubDispositions.notInterested,
            label: 'Not Interested',
        },
        //
        {
            value: NDRSubDispositions.callBack,
            label: 'Call Back',
        },
        {
            value: NDRSubDispositions.other,
            label: 'Other',
        },
        {
            value: NDRSubDispositions.dnc,
            label: NDRSubDispositions.dnc,
        },
        {
            value: NDRSubDispositions.dcFOR,
            label: NDRSubDispositions.dcFOR,
        },
        {
            value: NDRSubDispositions.dcUCR,
            label: NDRSubDispositions.dcUCR,
        },
        {
            value: NDRSubDispositions.schemeOffered,
            label: 'Scheme Offered',
        },
        {
            value: NDRSubDispositions.webReattempt,
            label: 'Web Reattempt',
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

// NDR  Sub Disposition
enum RtoAttemptTypes {
    cancel = 'CANCEL',
    attempt = 'ATTEMPT',
    rto = 'RTO',
    hold = 'HOLD',
    customerWillConnect = 'CUSTOMERWILLCONNECT',
}

export const rtoAttemptTypeOptions = () => {
    let options = [
        {
            value: RtoAttemptTypes.cancel,
            label: 'Cancel',
        },
        {
            value: RtoAttemptTypes.attempt,
            label: RtoAttemptTypes.attempt,
        },
        {
            value: RtoAttemptTypes.rto,
            label: RtoAttemptTypes.rto,
        },
        {
            value: RtoAttemptTypes.hold,
            label: RtoAttemptTypes.hold,
        },
        {
            value: RtoAttemptTypes.customerWillConnect,
            label: 'Customer Will Connect',
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

// RTO ATTEMPT

// PRIORITY
export const priorityOptions = () => {
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

// COMPLAINT TYPE
enum complaintType {
    complaint = 'COMPLAINT',
    inquiry = 'INQUIRY',
    feedback = 'FEEDBACK',
}

export const complaintTypeOptions = () => {
    let options = [
        { value: complaintType.complaint, label: complaintType.complaint },
        {
            value: complaintType.inquiry,
            label: complaintType.inquiry,
        },
        {
            value: complaintType.feedback,
            label: complaintType.feedback,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// RETURN TYPE
enum returnTypeOption {
    escalate = 'ESCALATE',
    replacement = 'REPLACEMENT',
    refund = 'REFUND',
}

export const returnTypeOptions = () => {
    let options = [
        { value: returnTypeOption.escalate, label: returnTypeOption.escalate },
        {
            value: returnTypeOption.replacement,
            label: returnTypeOption.replacement,
        },
        {
            value: returnTypeOption.refund,
            label: returnTypeOption.refund,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// WHATSAPP TEMPLATE
enum whatsappTemplate {
    tempOne = 'TEMP_ONE',
    tempTwo = 'TEMP_TWO',
    tempThree = 'TEMP_THREE',
}

export const whatsappTypeOptions = () => {
    let options = [
        { value: whatsappTemplate.tempOne, label: whatsappTemplate.tempOne },
        {
            value: whatsappTemplate.tempTwo,
            label: whatsappTemplate.tempTwo,
        },
        {
            value: whatsappTemplate.tempThree,
            label: whatsappTemplate.tempThree,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

// APPLICABLE CRITERIA
enum applicableCriteria {
    isOrder = 'ISORDER',
    isPrepaid = 'ISPREPAID',
    isCallBack = 'ISCALLBACK',
    isReplacement = 'ISREPLACEMENT',
    isInquiry = 'ISINQUIRY',
    isUrgent = 'ISURGENT',
    isSchemeApp = 'ISSCHEMEAPP',
    outOfStock = 'OUTOFSTOCK',
    isProductApp = 'ISPRODUCTAPP',
    adtApplicable = 'ADTAPPLICABLE',
    isTextboxReq = 'ISTEXTBOXREQ',
    isRemarkDateApp = 'ISREMARKDATEAPP',
}

export const applicableCriteriaOptionsType = () => {
    let options = [
        {
            value: applicableCriteria.isOrder,
            label: 'Is Order',
        },
        {
            value: applicableCriteria.isPrepaid,
            label: 'Is Prepaid',
        },
        {
            value: applicableCriteria.isCallBack,
            label: 'Is Call Back',
        },
        {
            value: applicableCriteria.isReplacement,
            label: 'Is Replacement',
        },
        {
            value: applicableCriteria.isInquiry,
            label: 'Is Inquiry',
        },
        {
            value: applicableCriteria.isUrgent,
            label: 'Is Urgent',
        },
        {
            value: applicableCriteria.isSchemeApp,
            label: 'Is Scheme App',
        },
        {
            value: applicableCriteria.outOfStock,
            label: 'Out Of Stock',
        },
        {
            value: applicableCriteria.isProductApp,
            label: 'Is Product App',
        },
        {
            value: applicableCriteria.adtApplicable,
            label: 'Adt Applicable',
        },
        {
            value: applicableCriteria.isTextboxReq,
            label: 'Is Text box Req',
        },
        {
            value: applicableCriteria.isRemarkDateApp,
            label: 'Is Remark Date App',
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// PAYMENT TYPE
enum paymentType {
    cheque = 'CHEQUE',
    netBanking = 'NETBANKING',
    cash = 'CASH',
    creditCard = 'CREDITCARD',
    debitCard = 'DEBITCARD',
}

export const paymentTypeOptions = () => {
    let options = [
        {
            value: paymentType.cheque,
            label: paymentType.cheque,
        },
        {
            value: paymentType.netBanking,
            label: paymentType.netBanking,
        },
        {
            value: paymentType.cash,
            label: paymentType.cash,
        },
        {
            value: paymentType.creditCard,
            label: paymentType.creditCard,
        },
        {
            value: paymentType.debitCard,
            label: paymentType.debitCard,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label:
                item.label.charAt(0).toUpperCase() +
                item.label.slice(1).toLowerCase(),
        }
    })
}

// ALL DAYS IN WEEK
enum weekDays {
    monday = 'MONDAY',
    tuesday = 'TUESDAY',
    wednesday = 'WEDNESDAY',
    thursday = 'THURSDAY',
    friday = 'FRIDAY',
    saturday = 'SATURDAY',
    sunday = 'SUNDAY',
}

export const weekDaysOptions = () => {
    let options = [
        {
            value: weekDays.monday,
            label: weekDays.monday,
        },
        {
            value: weekDays.tuesday,
            label: weekDays.tuesday,
        },
        {
            value: weekDays.wednesday,
            label: weekDays.wednesday,
        },
        {
            value: weekDays.thursday,
            label: weekDays.thursday,
        },
        {
            value: weekDays.friday,
            label: weekDays.friday,
        },
        {
            value: weekDays.saturday,
            label: weekDays.saturday,
        },
        {
            value: weekDays.sunday,
            label: weekDays.sunday,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label:
                item.label.charAt(0).toUpperCase() +
                item.label.slice(1).toLowerCase(),
        }
    })
}

// COMPANY TYPE OPTION
enum companyType {
    privateLimitedCompnay = 'PRIVATE_LIMITED_COMPANY',
    publicLimitedCompnay = 'PUBLIC_LIMITED_COMPANY',
    partnershipCompany = 'PARTNERSHIPS_COMPANY',
    limitedLiabilityPartnership = 'LIMITED_LIABILITY_PARTNERSHIP',
    onePersonCompany = 'ONE_PERSON_COMPANY',
    soleProprietorship = 'SOLE_PROPRIETORSHIP',
    section8Company = 'SECTION_8_COMPANY',
}

export const companyTypeOptions = () => {
    let options = [
        {
            value: companyType.privateLimitedCompnay,
            label: companyType.privateLimitedCompnay,
        },
        {
            value: companyType.publicLimitedCompnay,
            label: companyType.publicLimitedCompnay,
        },
        {
            value: companyType.partnershipCompany,
            label: companyType.partnershipCompany,
        },
        {
            value: companyType.limitedLiabilityPartnership,
            label: companyType.limitedLiabilityPartnership,
        },
        {
            value: companyType.onePersonCompany,
            label: companyType.onePersonCompany,
        },
        {
            value: companyType.soleProprietorship,
            label: companyType.soleProprietorship,
        },
        {
            value: companyType.section8Company,
            label: companyType.section8Company,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

// OWENERSHIP TYPE OPTION
enum ownershipType {
    partnership = 'PARTNERSHIP',
    single = 'SINGLE',
}

export const ownershipTypeOptions = () => {
    let options = [
        {
            value: ownershipType.partnership,
            label: ownershipType.partnership,
        },
        {
            value: ownershipType.single,
            label: ownershipType.single,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

export const userDepartmentTypeOptions = () => {
    let options = [
        {
            value: GetHierarchByDeptProps.SALES_DEPARTMENT,
            label: GetHierarchByDeptProps.SALES_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT,
            label: GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.HR_DEPARTMENT,
            label: GetHierarchByDeptProps.HR_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT,
            label: GetHierarchByDeptProps.DISTRIBUTION_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.FINANCE_DEPARTMENT,
            label: GetHierarchByDeptProps.FINANCE_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.MEDIA_DEPARTMENT,
            label: GetHierarchByDeptProps.MEDIA_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT,
            label: GetHierarchByDeptProps.MEDIA_PRODUCTION_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.IT_DEPARTMENT,
            label: GetHierarchByDeptProps.IT_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT,
            label: GetHierarchByDeptProps.DEVELOPMENT_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.WEB_DEPARTMENT,
            label: GetHierarchByDeptProps.WEB_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.OPERATION_DEPARTMENT,
            label: GetHierarchByDeptProps.OPERATION_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.QUALITY_DEPARTMENT,
            label: GetHierarchByDeptProps.QUALITY_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.LOGISTIC_DEPARTMENT,
            label: GetHierarchByDeptProps.LOGISTIC_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT,
            label: GetHierarchByDeptProps.MAPPING_AND_MIS_DEPARTMENT,
        },
        {
            value: GetHierarchByDeptProps.ADMIN_DEPARTMENT,
            label: GetHierarchByDeptProps.ADMIN_DEPARTMENT,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}

enum DealerValidReamrkTypes {
    correct = 'CORRECT',
    incorrect = 'INCORRECT',
    notapplicable = 'NOTAPPLICABLE',
}

export const dealerValidReamrkType = () => {
    let options = [
        {
            value: DealerValidReamrkTypes.correct,
            label: DealerValidReamrkTypes.correct,
        },
        {
            value: DealerValidReamrkTypes.incorrect,
            label: DealerValidReamrkTypes.incorrect,
        },
        {
            value: DealerValidReamrkTypes.notapplicable,
            label: DealerValidReamrkTypes.notapplicable,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Order Status Types
enum OrderStatusTypes {
    fresh = 'FRESH',
    prepaid = 'PREPAID',
    delivered = 'DELIVERED',
    doorCancelled = 'DOORCANCELLED',
    hold = 'HOLD',
    psc = 'PSC',
    una = 'UNA',
    pnd = 'PND',
    urgent = 'URGENT',
    inquiry = 'INQUIRY',
    'non-action' = 'NON_ACTION',
    reattempt = 'REATTEMPT',
}

export const orderStatusOptionsType = () => {
    let options = [
        {
            value: OrderStatusTypes.fresh,
            label: 'Fresh',
        },
        {
            value: OrderStatusTypes.prepaid,
            label: 'Prepaid',
        },
        {
            value: OrderStatusTypes.delivered,
            label: 'Delivered',
        },
        {
            value: OrderStatusTypes.doorCancelled,
            label: 'Door Cancelled',
        },
        {
            value: OrderStatusTypes.hold,
            label: 'Hold',
        },
        {
            value: OrderStatusTypes.psc,
            label: OrderStatusTypes.psc,
        },
        {
            value: OrderStatusTypes.una,
            label: OrderStatusTypes.una,
        },
        {
            value: OrderStatusTypes.pnd,
            label: OrderStatusTypes.pnd,
        },
        {
            value: OrderStatusTypes.urgent,
            label: 'Urgent',
        },
        {
            value: OrderStatusTypes?.['non-action'],
            label: 'Non Action',
        },
        {
            value: OrderStatusTypes.reattempt,
            label: 'Reattempt',
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Dealer Reason Types Accroding to Status
enum DealerReasonStatus {
    DELIVEREDSUCCESSFULLY = 'DELIVEREDSUCCESSFULLY',
    DELIVERYOUTOFNETWORK = 'DELIVERYOUTOFNETWORK',
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CALLBACK = 'CALLBACK',
    PICKBYCOURIER = 'PICKBYCOURIER',
    HOLDCANCEL = 'HOLDCANCEL',
    CALLBACKFUTURECONFIRMED = 'CALLBACKFUTURECONFIRMED',
    CUSTOMERNOTAVAILABLE = 'CUSTOMERNOTAVAILABLE',
    UNCLAIMED = 'UNCLAIMED',
    REFUSED = 'REFUSED',
    INTIMATIONONLY = 'INTIMATIONONLY',
    WRONGPINCODEADDRESSPHONENUMBER = 'WRONGPINCODEADDRESSPHONENUMBER',
    NOCASH = 'NOCASH',
    NOTINTERESTED = 'NOTINTERESTED',
    FAKEORDER = 'FAKEORDER',
    DEMANDOPENPARCEL = 'DEMANDOPENPARCEL',
    NOTSATISFIEDAFTEROPENING = 'NOTSATISFIEDAFTEROPENING',
    NOTACCEPTINGCCC = 'NOTACCEPTINGCCC',
    DELAYDELIVERY = 'DELAYDELIVERY',
    PRODUCTCHANGEANDREASSIGN = 'PRODUCTCHANGEANDREASSIGN',
    OUTOFSERVICEABLEAREA = 'OUTOFSERVICEABLEAREA',
    CANCELLATIONAFTERSHIPPING = 'CANCELLATIONAFTERSHIPPING',
    RNR = 'RNR',
    PERSONNOTAVAILABLE = 'PERSONNOTAVAILABLE',
    DAMAGEDPARCEL = 'DAMAGEDPARCEL',
    CUSTOMERNOTPICKUPTHECALL = 'CUSTOMERNOTPICKUPTHECALL',
    CUSTOMERWANTSTOCANCELTHEORDER = 'CUSTOMERWANTSTOCANCELTHEORDER',
    NOORDERPLACED = 'NOORDERPLACED',
    WRONGNUMBER = 'WRONGNUMBER',
    DONOTWANT = 'DONOTWANT',
    NONSERVICEABLEAREA = 'NONSERVICEABLEAREA',
    OUTOFASSIGNEDAREA = 'OUTOFASSIGNEDAREA',
}

export const dealerReasonTypes = (orderStatus: string) => {
    let options: SelectOption[] = []

    switch (orderStatus) {
        case statusProps.delivered:
            return (options = [
                {
                    value: DealerReasonStatus.DELIVEREDSUCCESSFULLY,
                    label: 'Delivered Successfully',
                },
            ])
        case statusProps.deliveryOutOfNetwork:
            return (options = [
                {
                    value: DealerReasonStatus.DELIVERYOUTOFNETWORK,
                    label: 'Delivery out of network',
                },
            ])
        case statusProps.hold:
            return (options = [
                {
                    value: DealerReasonStatus.PENDING,
                    label: 'Pending',
                },
                {
                    value: DealerReasonStatus.CONFIRMED,
                    label: 'Confirmed',
                },
                {
                    value: DealerReasonStatus.CALLBACK,
                    label: 'Call Back',
                },
                {
                    value: DealerReasonStatus.HOLDCANCEL,
                    label: 'Hold Cancel',
                },
                {
                    value: DealerReasonStatus.CALLBACKFUTURECONFIRMED,
                    label: 'Call Back Future Confirmed',
                },
            ])
        case statusProps.intransit:
            return (options = [
                {
                    value: DealerReasonStatus.PICKBYCOURIER,
                    label: 'Pick by Courier',
                },
            ])
        case statusProps.doorCancelled:
            return (options = [
                {
                    value: DealerReasonStatus.CUSTOMERNOTAVAILABLE,
                    label: 'Customer Not Available',
                },
                {
                    value: DealerReasonStatus.UNCLAIMED,
                    label: 'Unclaimed',
                },
                {
                    value: DealerReasonStatus.REFUSED,
                    label: 'Refused',
                },
                {
                    value: DealerReasonStatus.INTIMATIONONLY,
                    label: 'Intimation Only',
                },
                {
                    value: DealerReasonStatus.WRONGPINCODEADDRESSPHONENUMBER,
                    label: 'Wrong (pincode/address/phone no.)',
                },
                {
                    value: DealerReasonStatus.NOCASH,
                    label: 'No Cash',
                },
                {
                    value: DealerReasonStatus.NOTINTERESTED,
                    label: 'Not Interested',
                },
                {
                    value: DealerReasonStatus.FAKEORDER,
                    label: 'Fake Order',
                },
                {
                    value: DealerReasonStatus.DEMANDOPENPARCEL,
                    label: 'Demand Open Parcel',
                },
                {
                    value: DealerReasonStatus.NOTSATISFIEDAFTEROPENING,
                    label: 'Not Satisfied After Opening',
                },
                {
                    value: DealerReasonStatus.NOTACCEPTINGCCC,
                    label: 'Not Accepting CCC',
                },
                {
                    value: DealerReasonStatus.DELAYDELIVERY,
                    label: 'Delay Delivery',
                },
                {
                    value: DealerReasonStatus.PRODUCTCHANGEANDREASSIGN,
                    label: 'Product Change And Re-Assign',
                },
                {
                    value: DealerReasonStatus.OUTOFSERVICEABLEAREA,
                    label: 'Out Of Serviceable Area',
                },
                {
                    value: DealerReasonStatus.CANCELLATIONAFTERSHIPPING,
                    label: 'Cancellation After Shipping',
                },
                {
                    value: DealerReasonStatus.RNR,
                    label: 'RNR',
                },
                {
                    value: DealerReasonStatus.PERSONNOTAVAILABLE,
                    label: 'Person Not Available',
                },
                {
                    value: DealerReasonStatus.DAMAGEDPARCEL,
                    label: 'Damaged Parcel',
                },
            ])
        case statusProps.psc:
            return (options = [
                {
                    value: DealerReasonStatus.CUSTOMERNOTPICKUPTHECALL,
                    label: 'Customer Not Pickup The Call',
                },
                {
                    value: DealerReasonStatus.CUSTOMERWANTSTOCANCELTHEORDER,
                    label: 'Customer Wants To Cancel The Order',
                },
                {
                    value: DealerReasonStatus.UNCLAIMED,
                    label: 'Unclaimed',
                },
                {
                    value: DealerReasonStatus.REFUSED,
                    label: 'Refused',
                },
                {
                    value: DealerReasonStatus.INTIMATIONONLY,
                    label: 'Intimation Only',
                },
                {
                    value: DealerReasonStatus.WRONGPINCODEADDRESSPHONENUMBER,
                    label: 'Wrong (pincode/address/phone no.)',
                },
                {
                    value: DealerReasonStatus.NOCASH,
                    label: 'No Cash',
                },
                {
                    value: DealerReasonStatus.NOTINTERESTED,
                    label: 'Not Interested',
                },
                {
                    value: DealerReasonStatus.FAKEORDER,
                    label: 'Fake Order',
                },
                {
                    value: DealerReasonStatus.DEMANDOPENPARCEL,
                    label: 'Demand Open Parcel',
                },
                {
                    value: DealerReasonStatus.NOTSATISFIEDAFTEROPENING,
                    label: 'Not Satisfied After Opening',
                },
                {
                    value: DealerReasonStatus.NOTACCEPTINGCCC,
                    label: 'Not Accepting CCC',
                },
                {
                    value: DealerReasonStatus.DELAYDELIVERY,
                    label: 'Delay Delivery',
                },
                {
                    value: DealerReasonStatus.PRODUCTCHANGEANDREASSIGN,
                    label: 'Product Change And Re-Assign',
                },
                {
                    value: DealerReasonStatus.OUTOFSERVICEABLEAREA,
                    label: 'Out Of Serviceable Area',
                },
                {
                    value: DealerReasonStatus.CANCELLATIONAFTERSHIPPING,
                    label: 'Cancellation After Shipping',
                },
                {
                    value: DealerReasonStatus.RNR,
                    label: 'RNR',
                },
                {
                    value: DealerReasonStatus.PERSONNOTAVAILABLE,
                    label: 'Person Not Available',
                },
                {
                    value: DealerReasonStatus.DAMAGEDPARCEL,
                    label: 'Damaged Parcel',
                },
                {
                    value: DealerReasonStatus.NOORDERPLACED,
                    label: 'No Order Placed',
                },
                {
                    value: DealerReasonStatus.WRONGNUMBER,
                    label: 'Wrong Number',
                },
                {
                    value: DealerReasonStatus.DONOTWANT,
                    label: 'Do Not Want',
                },
            ])
        case statusProps.una:
            return (options = [
                {
                    value: DealerReasonStatus.NONSERVICEABLEAREA,
                    label: 'Non-serviceable Area',
                },
                {
                    value: DealerReasonStatus.OUTOFSERVICEABLEAREA,
                    label: 'Out Of Assigned Area',
                },
            ])

        default:
            options = []
            break
    }

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Dashboard Graph Condition Via Department
export const showTheDashboardGraphToDeparment = (departmentType: string) => {
    switch (departmentType) {
        case GetHierarchByDeptProps.CUSTOMER_CARE_DEPARTMENT:
            return true
        default:
            return false
    }
}

// Tape Type Options
enum TapeManagementTypes {
    schemeCode = 'SCHEME_CODE',
    promotional = 'PROMOTIONAL',
    intruption = 'INTRUPTION',
}

export const getTapeManagementTypes = () => {
    let options = [
        { value: TapeManagementTypes.schemeCode, label: 'Scheme Code' },
        { value: TapeManagementTypes.promotional, label: 'Promotional' },
        { value: TapeManagementTypes.intruption, label: 'Intruption' },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Tape Type Options
enum ProductCategoryOptions {
    herbal = 'HERBAL',
    education = 'EDUCATION',
    spiritual = 'SPIRITUAL',
    other = 'OTHER',
}

export const getProductCategoryOptions = () => {
    let options = [
        {
            label: 'Herbal',
            value: ProductCategoryOptions.herbal,
        },
        {
            label: 'Education',
            value: ProductCategoryOptions.education,
        },
        {
            label: 'Spiritual',
            value: ProductCategoryOptions.spiritual,
        },
        {
            label: 'Other',
            value: ProductCategoryOptions.other,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Tape Type Options

export const getCustomerInwardBarcodeOptionTypes = () => {
    let options = [
        {
            label: 'OK',
            value: barcodeStatusEnum.atWarehouse,
        },
        {
            label: 'Damage',
            value: barcodeStatusEnum.damage,
        },
        {
            label: 'Destroyed',
            value: barcodeStatusEnum.destroyed,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Tape Type Options
enum CourierOptions {
    shipyari = 'SHIPYAARI',
    gpo = 'GPO',
}

export const getCourierOptions = () => {
    let options = [
        {
            label: 'Shipyaari',
            value: CourierOptions.shipyari,
        },
        {
            label: 'Gpo',
            value: CourierOptions.gpo,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Transport Type Options
enum TransportType {
    road = 'ROAD',
    air = 'AIR',
}

export const getTransportTypeOptions = () => {
    let options = [
        {
            label: 'Road',
            value: TransportType.road,
        },
        {
            label: 'Air',
            value: TransportType.air,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Cancel Order Reason Options
enum CancelOrderReasonType {
    wrongScheme = 'WRONG_SCHEME',
    wrongPaymentMode = 'WRONG_PAYMENT_MODE',
    stockUnavailability = 'STOCK_UNAVAILABILITY',
    other = 'OTHER',
}

export const getCancelOrderReasonTypeOptions = () => {
    let options = [
        {
            label: 'Wrong Scheme',
            value: CancelOrderReasonType.wrongScheme,
        },
        {
            label: 'Wrong Payment Mode',
            value: CancelOrderReasonType.wrongPaymentMode,
        },
        {
            label: 'Stock Mode',
            value: CancelOrderReasonType.stockUnavailability,
        },
        {
            label: 'Other',
            value: CancelOrderReasonType.other,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Cancel Order Reason Options
enum CourierRtoTypeRequestStatus {
    fresh = 'FRESH/REUSEALE',
    damage = 'DAMAGE',
    fake = 'FAKE',
    lost = 'LOST',
}

export const getCourierRtoRequestStatusOptions = () => {
    let options = [
        {
            label: 'Fresh / Reusable',
            value: CourierRtoTypeRequestStatus.fresh,
        },
        {
            label: 'Damage',
            value: CourierRtoTypeRequestStatus.damage,
        },
        {
            label: 'Fake',
            value: CourierRtoTypeRequestStatus.fake,
        },
        {
            label: 'Lost / Missing',
            value: CourierRtoTypeRequestStatus.lost,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// Cancel Order Reason Options
enum DIDTypeEnum {
    web = 'WEB',
    media = 'MEDIA',
}

export const getDIDTypeOptions = () => {
    let options = [
        {
            label: 'Web',
            value: DIDTypeEnum.web,
        },
        {
            label: 'Media',
            value: DIDTypeEnum.media,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}

// CourierType Options
enum CourierTypeEnum {
    awb = 'AWB',
    api = 'API',
}

export const getCourierTypeOptions = () => {
    let options = [
        {
            label: 'AWB',
            value: CourierTypeEnum.awb,
        },
        {
            label: 'API',
            value: CourierTypeEnum.api,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label,
        }
    })
}
