export type DispositionOneListResponse = {
  dispositionName: string
  companyId: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  _id: string
  __v: number
}

export type AddDisPositionOne = {
  dispositionName: string
  companyId: string
}

export type UpdateDispositionOne = {
  body: {
      dispositionName: string
      companyId: string
  }
  id: string
}
