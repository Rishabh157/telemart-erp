export type AttributesGroupListResponse = {
    attributes: groupattributeType[]
    groupName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type groupattributeType = {
    label: string
    value: string
}

export type AddAttributesGroup = {
    attributes: groupattributeType[]
    groupName: string
    companyId: string
}

export type UpdateAttributesGroup = {
    body: {
        attributes: groupattributeType[]
        groupName: string
        companyId: string
    }
    id: string
}
