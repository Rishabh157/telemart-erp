export type ChannelManagementListResponse = {
    _id: string
    channelName: string
    address: string
    phone: string
    email: string
    districtId: string
    channelGroupId: string
    contactPerson: string
    mobile: string
    countryId: string
    languageId: string
    channelCategoryId: string
    designation: string
    website: string
    stateId: string
    paymentType: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
    districtLabel: string
    channelGroupLabel: string
    countryLabel: string
    channelCategoryLabel: string
    stateLabel: string
    companyId: string
    languageLabel: string
}

export type AddChannelManagement = {
    channelName: string
    companyId: string
    address: string
    phone: string
    email: string
    districtId: string
    channelGroupId: string
    contactPerson: string
    mobile: string
    countryId: string
    languageId: string
    channelCategoryId: string
    designation: string
    website: string
    stateId: string
    paymentType: string
}

export type UpdateChannelManagement = {
    body: {
        channelName: string
        companyId: string
        address: string
        phone: string
        email: string
        districtId: string
        channelGroupId: string
        contactPerson: string
        mobile: string
        countryId: string
        languageId: string
        channelCategoryId: string
        designation: string
        website: string
        stateId: string
        paymentType: string
    }
    id: string
}
