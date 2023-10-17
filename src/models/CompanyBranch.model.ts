/// ==============================================
// Filename:CompanyBranch.model.ts
// Type: Model Component
// Last Updated: SEPTEMBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CompanyBranchListResponse = {
    branchName: string
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
    companyId: string
}

export type UpdateCompanyBranch = {
    body: {
        branchName: string
        companyId: string
    }
    id: string
}
