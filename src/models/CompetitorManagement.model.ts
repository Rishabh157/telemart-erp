export type CompetitorManagementListResponse = {
    competitorName: string
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddCompetitorManagement = {
    competitorName: string
    companyId: string
}

export type UpdateCompetitorManagement = {
    body: {
        competitorName: string
        companyId: string
    }
    id: string
}
