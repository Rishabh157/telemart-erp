export type AddDispositionThreeListResponse = {
	area: string
	pincodeId: string
	tehsilId: string
	districtId: string
	stateId: string
	countryId: string
	companyId: string
	isActive: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
	_id: string
	__v: number
}

export type AddDispositionThree = {
	area: string
	pincodeId: string
	tehsilId: string
	districtId: string
	stateId: string
	companyId: string
	countryId: string
}

export type UpdateDispositionThree = {
	body: {
			area: string
			pincodeId: string
			tehsilId: string
			districtId: string
			stateId: string
			companyId: string
			countryId: string
	}
	id: string
}
