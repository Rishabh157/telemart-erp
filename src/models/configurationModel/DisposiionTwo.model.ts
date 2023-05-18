export type DispositionTwoListResponse = {
    dispositionName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDisPositionTwo = {
    dispositionName: string
    companyId: string
}

export type UpdateDispositionTwo = {
    body: {
        dispositionName: string
        companyId: string
    }
    id: string
}
