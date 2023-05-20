export type ChannelManagementListResponse = {
    _id: string
    channelName: string
    address: string
    phone: string
    email: string
    district: string
    channelGroupId: string
    contactPerson: string
    mobile: string
    country: string
    language: string
    channelCategory: string
    designation: string
    website: string
    state: string
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
    district: string
    channelGroupId: string
    contactPerson: string
    mobile: string
    country: string
    language: string
    channelCategory: string
    designation: string
    website: string
    state: string
    paymentType: string
}

export type UpdateChannelManagement = {
    body: {
        channelName: string
        address: string
        phone: string
        email: string
        district: string
        channelGroupId: string
        contactPerson: string
        mobile: string
        country: string
        language: string
        channelCategory: string
        designation: string
        website: string
        state: string
        paymentType: string
    }
    id: string
}
