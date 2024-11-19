import { OrderStatusEnum } from "src/utils/constants/enums"

// |-- Types --|
interface MaerksResponseType {
    result: {
        reference_number: string
        label: string
        waybill: string
        sort_code: string
        courier_partner_id: number
        courier_name: string
        order_id: string
        security_key: string
        account_code: string
    }
    meta: {
        status: number
        success: boolean
        message: string
        reference_number: string
        username: string
    }
    order_id: number
    tracking_id: number
}

export type OrderListResponse = {
    _id: string
    orderNumber: number | string
    inquiryNumber: string
    awbNumber: string
    assignDealerId: string | null
    assignWarehouseId: string
    assignDealerLabel: string
    assignWarehouseLabel: string
    agentId: string
    agentName: string
    companyId: string
    companyAddress: string
    hsnCode: string
    approved: boolean
    isUrgentOrder: boolean
    didNo: string
    ageGroup: string
    alternateNo: string
    mobileNo: string
    autoFillingShippingAddress: string
    callType: string
    campaign: string
    customerName: string
    orderInvoice: string
    deliveryTimeAndDate: string
    countryId: string | null
    stateId: string
    districtId: string
    tehsilId: string
    schemeId: string
    schemeName: string
    schemeCode: string
    isOrderAssigned: boolean
    batchId: string | null
    pincodeId: string
    pincodeSecondId: string | null
    areaId: string
    emailId: string
    flagStatus: string
    dealerReason: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string[]
    orderForOther: string
    transactionId: string
    orderStatus: string
    paymentMode: string
    productGroupId: string
    remark: string
    orderType : string
    shcemeQuantity: number
    firstCallApproval: null | boolean
    firstCallRemark: string
    firstCallState: string
    firstCallCallBackDate: string
    socialMedia: {
        facebook: string
        instagram: string
        _id: string
    }
    channelLabel: string[]
    schemeProducts: {
        productGroupId: string
        productGroupName: string
        productQuantity: number
        _id: string
    }[]
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    dispositionLevelThree: string
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelThreeId: string
    dispositionLevelTwoLabel: string
    dispositionLevelThreeLabel: string
    preShipCancelationDate: string
    secondaryCourierPartner: string
    orderAssignedToCourier: string
    preffered_delivery_start_time: string
    preffered_delivery_end_time: string
    preffered_delivery_date: string
    recordingStartTime: string
    recordingEndTime: string
    status: OrderStatusEnum
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    stateLabel: string
    districtLabel: string
    tehsilLabel: string
    pincodeLabel: string
    areaLabel: string
    wareHouseLabel: string
    productGroupLabel: string
    dealerLabel: string
    assignDealerCode: string
    dealerStatus: string
    callCenterId: string
    callCenterLabel: string
    orderReferenceNumber: string
    orderMBKNumber: string | null
    barcodeData: {
        barcodeId: string
        barcode: string
        _id: string
    }[]
    maerksResponse?: MaerksResponseType
}

// Invoice and Labels List Response
export type OrderInvoiceAndLabelListResponse = {
    _id: string
    orderNumber: number
    orderReferenceNumber: string | null
    orderMBKNumber: string | null
    inquiryNumber: number
    orderStatus: string
    assignDealerId: string
    assignDealerLabel: string
    assignDealerCode: string
    assignDealerStatus: string
    assignWarehouseId: string | null
    assignWarehouseLabel: string
    agentId: string
    agentName: string
    companyId: string
    approved: boolean
    didNo: string
    ageGroup: string
    alternateNo: string
    mobileNo: string
    isOrderAssigned: boolean
    batchId: string
    autoFillingShippingAddress: string
    address: string
    callType: string
    campaign: string
    customerName: string
    orderInvoice: string
    orderInvoiceDate: string
    deliveryTimeAndDate: string
    countryId: string | null
    countryLabel: string
    stateId: string
    stateLabel: string
    districtId: string
    districtLabel: string
    tehsilId: string
    tehsilLabel: string
    schemeId: string
    schemeName: string
    schemeCode: string
    pincodeId: string
    pincodeLabel: string
    pincodeSecondId: string | null
    areaId: string
    areaLabel: string
    emailId: string
    flagStatus: string
    gender: string
    houseNumber: string
    incomingCallerNo: string
    landmark: string
    medicalIssue: string[]
    orderFor: string[]
    orderForOther: string
    paymentMode: string
    productGroupId: string
    productGroupLabel: string
    remark: string
    shcemeQuantity: number
    socialMedia: {
        facebook: string
        instagram: string
        _id: string
    }
    streetNumber: string
    typeOfAddress: string
    whatsappNo: string
    price: number
    deliveryCharges: number
    totalAmount: number
    dispositionLevelTwoId: string
    dispositionLevelTwoLabel: string
    dispositionLevelThreeId: string
    dispositionLevelThreeLabel: string
    preffered_delivery_start_time: string
    delivery_boy_id: string | null
    deliveredBy: string
    preffered_delivery_end_time: string
    preffered_delivery_date: string
    recordingStartTime: string
    recordingEndTime: string
    status: string
    callCenterId: string
    branchId: string
    firstCallApproval: boolean
    firstCallRemark: string
    firstCallCallBackDate: string
    firstCallApprovedBy: string | null
    firstCallState: string
    orderType: string
    ndrRemark: string
    ndrDiscountApplicable: boolean
    ndrApprovedBy: string
    dealerValidRemark: string
    ndrCallDisposition: string | null
    ndrRtoReattemptReason: string
    preShipCancelationDate: string
    latitude: string
    longitude: string
    dealerReason: string
    dealerFirstCaller: string | null
    isGPO: boolean
    isUrgentOrder: boolean
    awbNumber: string
    secondaryCourierPartner: string
    orderAssignedToCourier: string
    hsnCode: string
    companyAddress: string
    shipyaariResponse: string
    maerksResponse: string
    schemeProducts: {
        productGroupName: string
        productGroupId: string
        productQuantity: number
        productSubCategory: string
        hsnCode: string
        _id: string
        dealerSalePrice: number
        gst: number
        cgst: number
        sgst: number
        igst: number
        utgst: number
    }[]
    transactionId: string
    isDeleted: boolean
    isActive: boolean
    barcodeData: {
        barcodeId: string
        barcode: string
        _id: string
    }[]
    createdAt: string
    updatedAt: string
    __v: number
    itemName: string | null
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
    warehouseBillingInfo: {
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
        countryLable: string
        stateLable: string
        districtLable: string
        pincodeLable: string
    }
}
