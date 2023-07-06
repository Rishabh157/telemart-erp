/// ==============================================
// Filename:Artist.model.ts
// Type: Model Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Types --|
export type ArtistListResponse = {
    artistName: string
    companyId: string
    count: number
    _id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type AddArtist = {
    artistName: string
    companyId: string
}

export type UpdateArtist = {
    body: {
        artistName: string
        companyId: string
    }
    id: string
}
