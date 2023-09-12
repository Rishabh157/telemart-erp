/// ==============================================
// Filename:CompanyBranch.model.ts
// Type: Model Component
// Last Updated: SEPTEMBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type CompanyBranchListResponse = {
    branchName: string
    company: string
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
    company: string
}

export type UpdateCompanyBranch = {
    body: {
        branchName: string
        company: string
    }
    id: string
}
