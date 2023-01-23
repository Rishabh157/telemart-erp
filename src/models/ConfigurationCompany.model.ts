export type ConfigurationCompanyListResponse = {
    company_name: string;
    logo: string;
    website_url: string;
    address: string;
    gst_no: string;
    phone_no: string;
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddConfigurationCompany = {
    company_name: string;
    logo: string;
    website_url: string;
    address: string;
    gst_no: string;
    phone_no: string;
}

export type UpdateConfigurationCompany = {
    body: {
        company_name: string;
        logo: string;
        website_url: string;
        address: string;
        gst_no: string;
        phone_no: string;
    },
    id: string;
}