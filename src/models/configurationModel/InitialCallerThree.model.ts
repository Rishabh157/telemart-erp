export type InitialCallerThreeListResponse = {
    initailCallName: string
    initailCallNameLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddInitialCallerThree = {
    initailCallName: string
    initialCallOneId: string
    initialCallTwoId: string
    companyId: string
}

export type UpdateInitialCallerThree = {
    body: {
        initailCallName: string
        initialCallOneId: string
        initialCallTwoId: string
        companyId: string
    }
    id: string
}
