import React from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import CompaniesListing from './CompaniesListing'

const columns: columnTypes[] = [
    {
        field: "logo",
        headerName: "Logo",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: any) => <img src={row.logo} alt="" />
    },
    {
        field: "company_name",
        headerName: "Company Name",
        flex: 'flex-[1_1_0%]',
        renderCell: (row: any) => (
            <span className='text-primary-main ' >  {row.company_name} </span>
        )
    },

    {
        field: "website_url",
        headerName: "Website URL",
        flex: 'flex-[2_2_0%]'
    },
    {
        field: "address",
        headerName: "Address",
        flex: 'flex-[2_2_0%]',
        renderCell: (row: any) => (
            <span className='text-primary-main ' >  {row.address} </span>
        )
    },
    {
        field: "gst_no",
        headerName: "GST No",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => (
            <span className='text-slate-800' > {row.gst_no} </span>
        )
    },
    {
        field: "phone_no",
        headerName: "Phone No",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => (
            <span className='text-slate-800' > {row.phone_no} </span>
        )
    },



]

const rows = [
    {
        logo: "",
        company_name: "Codiotic",
        website_url: "www.codiotic.com",
        address: "indore",
        gst_no: "23M45874899",
        phone_no: "7485968574",
    }
]
const CompaniesListingWrapper = () => {
    return (
        <div>
            <CompaniesListing
                columns={columns}
                rows={rows}
            />
        </div>
    )
}

export default CompaniesListingWrapper
