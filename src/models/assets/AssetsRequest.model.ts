export type AssetsRequestListResponse = {
  name:string
  companyId: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  _id: string
  __v: number
}

export type AddAssetsRequest = {
  name:string
  companyId: string
}

export type UpdateAssetsRequest = {
  body: {
      name:string
      companyId: string
  }
  id: string
}
