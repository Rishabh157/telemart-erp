export type WebsiteTagsListResponse = {
	websitPageIid: string | ''
	websiteMasterId: string | ''
	metaDescription: string
	metaKeyword: string
	metaOgTitle: string
	metaOgUrl: string
	metaOgImage: string
	metaOgDescription: string
	metaOgType: string
	metaTwitterTitle: string
	metaTwitterCard: string
	metaTwitterImage: string
	companyId: string	
	_id: string
	isActive: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
	__v: number
}

export type AddWebsiteTags = {
	websitPageIid: string | ''
	websiteMasterId: string | ''
	metaDescription: string
	metaKeyword: string
	metaOgTitle: string
	metaOgUrl: string
	metaOgImage: string
	metaOgDescription: string
	metaOgType: string
	metaTwitterTitle: string
	metaTwitterCard: string
	metaTwitterImage: string
	companyId: string	
}

export type UpdateWebsiteTags = {
	body: {
		websitPageIid: string | ''
		websiteMasterId: string | ''
		metaDescription: string
		metaKeyword: string
		metaOgTitle: string
		metaOgUrl: string
		metaOgImage: string
		metaOgDescription: string
		metaOgType: string
		metaTwitterTitle: string
		metaTwitterCard: string
		metaTwitterImage: string
		companyId: string	
	}
	id: string
}




