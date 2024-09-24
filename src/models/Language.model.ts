// |-- Types --|
export type LanguageListResponse = {
    languageName: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddLanguage = {
    languageName: string
    companyId: string
}

export type UpdateLanguage = {
    body: {
        languageName: string
        companyId: string
    }
    id: string
}
