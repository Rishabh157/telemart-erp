/// ==============================================
// Filename:Users.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type UsersListResponse = {
    firstName: string
    lastName: string
    mobile: string
    email: string
    userDepartment: string
    userRole: string
    userType: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddUser = {
    firstName: string
    lastName: string
    mobile: string
    email: string
    userDepartment: string
    userRole: string
    userType: string
    password: string
    companyId: string
    allowedIp: string[]
}

export type UpdateUser = {
    body: {
        firstName: string
        lastName: string
        mobile: string
        email: string
        userDepartment: string
        userRole: string
        userType: string
        password: string
        companyId: string
        allowedIp: string[]
    }
    id: string
}

export type userData = {
    companyId: string
    email: string
    fullName: string
    mobile: string
    userId: string
    userName: string
    role: string
    userRole: string
    firstName: string
    lastName: string
    branchId: string
    allowedIp: string[]
    isAgent: boolean
    callCenterId: string | null
    floorManagerId: string | null
    teamLeadId: string | null
}

export type ChangeCompany = {
    body: { companyId: string }
    id: string
}

export type UsersNewListResponse = {
    firstName: string
    lastName: string
    email: string
    mobile: string
    companyId: string
    is_active: boolean
    is_deleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
    isAgent: boolean
    callCenterId: string | null
    floorManagerId: string | null
    teamLeadId: string | null
}

export type AddNewUser = {
    firstName: string
    lastName: string
    userName: string
    mobile: string
    email: string
    branchId: string
    userDepartment: string
    userRole: string
    password: string
    companyId: string
    allowedIp: string[]
    isAgent: boolean
    callCenterId: string | null
    floorManagerId: string | null
    teamLeadId: string | null
}

export type UpdateNewUser = {
    body: {
        firstName: string
        lastName: string
        userName: string
        email: string
        password?: string
        mobile: string
        userDepartment: string
        userRole: string
        companyId: string
        allowedIp: string[]
        isAgent: boolean
        callCenterId: string | null
        floorManagerId: string | null
        teamLeadId: string | null
    }
    id: string
}
