/// ==============================================
// Filename:DealerPincode.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

export type DealersPincodeListResponse = {
    dealerId: string
    pincode: string
    estTime: number
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type pincodeDetail = {
    pincode: string[]
    estTime: number
}

export type DealersPincodeAdd = {
    dealerId: string
    pincodeDetail: pincodeDetail[]
    companyId: string
}

export type UpdateDealersPincode = {
    body: {
        pincodeDetail: pincodeDetail[]
        dealerId: string
        companyId: string
    }
    id: string
}
export type GetDealerPincode = {
    companyId: string
    dealerId: string
}
