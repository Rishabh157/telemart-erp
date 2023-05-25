export type InitialCallerOneListResponse = {
  initailCallName: string
  initailCallNameLabel: string
  companyId: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  _id: string
  __v: number
}

export type AddInitialCallerOne = {
  initailCallName: string
  companyId: string
}

export type UpdateInitialCallerOne = {
  body: {
    initailCallName: string
      companyId: string
  }
  id: string
}
