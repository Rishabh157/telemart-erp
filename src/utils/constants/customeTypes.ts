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

// RTO ATTEMPT
enum RtoAttemptType {
    customerWillConnect = 'CUSTOMER_WILL_CONNECT',
    attempt = 'ATTEMPT',
    rto = 'RTO',
    hold = 'HOLD',
    cancel = 'CANCEL',
}
export const rtoTypeOptions = () => {
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
    isOrder = 'IS_ORDER',
    isPrepaid = 'IS_PREPAID',
    isCallback = 'IS_CALLBACK',
    isReplacement = 'IS_REPLACEMENT',
    isInquiry = 'IS_INQUIRY',
    isUrgent = 'IS_URGENT',
}

export const applicableCriteriaOptionsType = () => {
    let options = [
        {
            value: applicableCriteria.isOrder,
            label: applicableCriteria.isOrder,
        },
        {
            value: applicableCriteria.isPrepaid,
            label: applicableCriteria.isPrepaid,
        },
        {
            value: applicableCriteria.isCallback,
            label: applicableCriteria.isCallback,
        },
        {
            value: applicableCriteria.isReplacement,
            label: applicableCriteria.isReplacement,
        },
        {
            value: applicableCriteria.isInquiry,
            label: applicableCriteria.isInquiry,
        },
        {
            value: applicableCriteria.isUrgent,
            label: applicableCriteria.isUrgent,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
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
            label: item.label,
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
            label: item.label,
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

// USER DEPARTMENT
enum userDepartmentType {
    salesDepartment = 'SALES_DEPARTMENT',
    hrDepartment = 'HR_DEPARTMENT',
    distributionDepartment = 'DISTRIBUTION_DEPARTMENT',
    financeDepartment = 'FINANCE_DEPARTMENT',
    mediaDepartment = 'MEDIA_DEPARTMENT',
    mediaProductionDepartment = 'MEDIA_PRODUCTION_DEPARTMENT',
    itDepartment = 'IT_DEPARTMENT',
    developmentDepartment = 'DEVELOPMENT_DEPARTMENT',
    webDepartment = 'WEB_DEPARTMENT',
    operationDepartment = 'OPERATION_DEPARTMENT',
    qualityDepartment = 'QUALITY_DEPARTMENT',
    logisticDepartment = 'LOGISTIC_DEPARTMENT',
    mappingAndMisDepartment = 'MAPPING_AND_MIS_DEPARTMENT',
    adminDepartment = 'ADMIN_DEPARTMENT',
}

export const userDepartmentTypeOptions = () => {
    let options = [
        {
            value: userDepartmentType.salesDepartment,
            label: userDepartmentType.salesDepartment,
        },
        {
            value: userDepartmentType.hrDepartment,
            label: userDepartmentType.hrDepartment,
        },
        {
            value: userDepartmentType.distributionDepartment,
            label: userDepartmentType.distributionDepartment,
        },
        {
            value: userDepartmentType.financeDepartment,
            label: userDepartmentType.financeDepartment,
        },
        {
            value: userDepartmentType.mediaDepartment,
            label: userDepartmentType.mediaDepartment,
        },
        {
            value: userDepartmentType.mediaProductionDepartment,
            label: userDepartmentType.mediaProductionDepartment,
        },
        {
            value: userDepartmentType.itDepartment,
            label: userDepartmentType.itDepartment,
        },
        {
            value: userDepartmentType.developmentDepartment,
            label: userDepartmentType.developmentDepartment,
        },
        {
            value: userDepartmentType.webDepartment,
            label: userDepartmentType.webDepartment,
        },
        {
            value: userDepartmentType.operationDepartment,
            label: userDepartmentType.operationDepartment,
        },
        {
            value: userDepartmentType.qualityDepartment,
            label: userDepartmentType.qualityDepartment,
        },
        {
            value: userDepartmentType.logisticDepartment,
            label: userDepartmentType.logisticDepartment,
        },
        {
            value: userDepartmentType.mappingAndMisDepartment,
            label: userDepartmentType.mappingAndMisDepartment,
        },
        {
            value: userDepartmentType.adminDepartment,
            label: userDepartmentType.adminDepartment,
        },
    ]

    return options?.map((item: any) => {
        return {
            value: item.value,
            label: item.label?.replaceAll('_', ' '),
        }
    })
}
