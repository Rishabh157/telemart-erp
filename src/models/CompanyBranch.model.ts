// |-- Types --|
export type CompanyBranchListResponse = {
    branchName: string
    branchCode: string
    companyId: string
    companyLabel: string
    createdAt: string
    isActive: boolean
    isDeleted: boolean
    updatedAt: string
    __v: number
    _id: string
}

export type AddCompanyBranch = {
    branchName: string
    branchCode: string
    companyId: string
}

export type UpdateCompanyBranch = {
    body: {
        branchName: string
        branchCode: string
        companyId: string
    }
    id: string
}
