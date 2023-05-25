export type DispositionThreeListResponse = {
  dispositionName: string
  dispostionOneLabel: string
  dispositionOneId:string;
  dispositionTwoId:string;
  companyId: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  _id: string
  __v: number
}

export type AddDisPositionThree = {
  dispositionName: string
  dispositionOneId: string
  dispositionTwoId:string;
  companyId: string
}

export type UpdateDispositionThree = {
  body: {
      dispositionName: string
      dispositionOneId: string
      dispositionTwoId:string;
      companyId: string
  }
  id: string
}
