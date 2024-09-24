// |-- Types --|
export type TransportListResponse = {
    transportName: string
    gst: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddTransport = {
    attributeName: string
    companyId: string
}

export type UpdateTransport = {
    body: {
        attributeName: string
        companyId: string
    }
    id: string
}
