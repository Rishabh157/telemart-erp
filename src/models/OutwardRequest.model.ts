// |-- Types --|
export enum SaleOrderStatus {
    not_dispatched = 'NOT_DISPATCHED',
    dispatched = 'DISPATCHED',
    complete = 'COMPLETE',
}

export type OutwardRequestDealerListResponse = {
    _id: string
    dealerName: string
    dhApproved: boolean
    dhApprovedActionBy: string
    dhApprovedAt: string
    accApprovedActionBy: string
    accApprovedAt: string
    accApproved: boolean
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        soNumber: string
        dealerId: string
        dealerWareHouseId: string
        companyWareHouseId: string
        dhApprovedById: string
        dhApproved: boolean
        dhApprovedActionBy: string
        dhApprovedAt: string
        accApprovedById: string
        accApproved: boolean
        accApprovedActionBy: string
        accApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: SaleOrderStatus
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        dealerLabel: string
        companyWarehouseLabel: string
        warehouseLabel: string
    }[]
}

// not used
export type OutwardRequestCustomerListResponse = {
    customerName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type OutwardRequestRTVListResponse = {
    _id: string
    warehouseLabel: string
    vendorLabel: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean
    createdAt: string
    updatedAt: string
    status: 'NOT_DISPATCHED' | 'DISPATCHED'
    isDeleted: boolean
    companyId: string
    vendorId: string
    warehouseId: string
    documents: {
        _id: string
        rtvNumber: string
        vendorId: string
        warehouseId: string
        firstApprovedById: string
        firstApproved: boolean
        firstApprovedActionBy: string
        firstApprovedAt: string
        secondApprovedById: string
        secondApproved: boolean
        secondApprovedActionBy: string
        secondApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        remark: string
        status: 'NOT_DISPATCHED' | 'DISPATCHED'
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        vendorLabel: string
        warehouseLabel: string
    }[]
}

export type OutwardRequestWarehouseListResponse = {
    _id: string
    fromWarehouseLabel: string
    toWarehouseLabel: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        wtNumber: string
        fromWarehouseId: string
        toWarehouseId: string
        firstApprovedById: string
        firstApproved: boolean
        firstApprovedActionBy: string
        firstApprovedAt: string
        secondApprovedById: string
        secondApproved: boolean
        secondApprovedActionBy: string
        secondApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: SaleOrderStatus
        remark: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        fromWarehouseLabel: string
        toWarehouseLabel: string
    }[]
}

export type OutwardRequestWarehouseToSampleListResponse = {
    _id: string
    fromWarehouseLabel: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        wtsNumber: string
        fromWarehouseId: string
        toName: string
        firstApprovedById: string
        firstApproved: boolean
        firstApprovedActionBy: string
        firstApprovedAt: string
        secondApprovedById: string
        secondApproved: boolean
        secondApprovedActionBy: string
        secondApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: 'NOT_DISPATCHED' | 'DISPATCHED' | 'COMPLETE'
        remark: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        fromWarehouseLabel: string
    }[]
}

// not used
export type OutwardRequestEcomListResponse = {
    ecomName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

// not used
export type OutwardRequestReplacementListResponse = {
    vendorName: string
    productName: string
    quantity: string
    address: string
    creationDate: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type OutwardRequestWarehouseToCompanyListResponse = {
    _id: string
    fromWarehouseLabel: string
    toWarehouseLabel: string
    fromCompanyLabel: string
    toCompanyLabel: string
    firstApproved: boolean
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean
    createdAt: string
    updatedAt: string
    documents: {
        _id: string
        wtcNumber: string
        fromWarehouseId: string
        toWarehouseId: string
        firstApprovedById: string
        firstApproved: boolean
        firstApprovedActionBy: string
        firstApprovedAt: string
        secondApprovedById: string
        secondApproved: boolean
        secondApprovedActionBy: string
        secondApprovedAt: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
            _id: string
            groupName: string
        }
        status: 'NOT_DISPATCHED' | 'DISPATCHED' | 'COMPLETE'
        remark: string
        companyId: string
        toCompanyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        fromWarehouseLabel: string
        toWarehouseLabel: string
        fromCompanyLabel: string
        toCompanyLabel: string
    }[]
}
