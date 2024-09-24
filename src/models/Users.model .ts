// |-- Types --|
export type UsersListResponse = {
    _id: string
    firstName: string
    lastName: string
    userName: string
    mobile: string
    maskedPhoneNo: string
    email: string
    password: string
    userDepartment: string
    userRole: string
    userType: string
    allowedIp: string[]
    companyId: string
    branchId: string
    callCenterId: string
    floorManagerId: string | null
    teamLeadId: string | null
    isAgent: boolean
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    branchLabel: string
    callCenterName: string
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
    userDepartment: string
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
    mySenior: string | null
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
        mySenior: string | null
    }
    id: string
}
