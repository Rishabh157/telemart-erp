export type InitialCallerTwoListResponse = {
    initialCallName: string
    initailCallNameLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddInitialCallerTwo = {
    initialCallName: string
    initialCallOneId: string
    companyId: string
}

export type UpdateInitialCallerTwo = {
    body: {
        initialCallName: string
        initialCallOneId: string
        companyId: string
    }
    id: string
}
