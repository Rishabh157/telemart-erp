export type DispositionThreeListResponse = {
    dispositionName: string
    dispostionOneLabel: string
    dispostionTwoLabel: string
    dispositionOneId: string
    dispositionTwoId: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddDispositionThree = {
	dispositionName: string
	dispositionOneId: string
	dispositionTwoId: string
	smsType: string
	emailType: string
	priority: string
	applicableCriteria:string[]
	companyId: string	
}

export type UpdateDispositionThree = {
	body: {
		dispositionName: string
		dispositionOneId: string
		dispositionTwoId: string
		smsType: string
		emailType: string
		priority: string
		applicableCriteria:string[]
		companyId: string
	}
	id: string
}
