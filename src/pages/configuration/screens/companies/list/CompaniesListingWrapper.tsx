import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/companySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useExportCompanyDataMutation, useGetCompaniesQuery } from 'src/services/CompanyServices'
import CompaniesListing from './CompaniesListing'

const columns: columnTypes[] = [
    {
        field: "company_name",
        headerName: "Company Name",
        flex: 'flex-[2.5_2.5_0%]',
        renderCell: (row: any) => (
            <div className='text-primary-main flex items-center gap-3 ' >
                <div className='shadow-md p-[2px] bg-slate-200 h-[55px] w-[55px] rounded-full' >
                    <Avatar src={row.logo} alt="" variant='circular' sx={{ width: "100%", height: "100%" }} />
                </div>
                {row.company_name} </div>
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

const exportHeaders = [
    { label: "Logo", key: "logo" },
    { label: "Company Name", key: "company_name" },
    { label: "Website URL", key: "website_url" },
    { label: "Address", key: "address" },
    { label: "GST No", key: "gst_no" },
    { label: "Phone No", key: "phone_no" },
]

const CompaniesListingWrapper = () => {

    const companyState: any = useSelector((state: RootState) => state.company)
    const [isExporting, setIsExporting] = useState(false);
    const [exportData, setExportData] = useState<any>([]);



    const {
        items,
        isTableLoading,
        page,
        rowsPerPage,
    } = companyState

    const dispatch = useDispatch<AppDispatch>()
    const { data, isFetching, isLoading } = useGetCompaniesQuery(
        {
            "limit": rowsPerPage,
            "searchValue": "",
            "params": [
                "dealerName",
                "dealerCode",
                "mobile"
            ],
            "page": page,
            "filterBy": [
                {
                    "fieldName": "",
                    "value": []
                }
            ],
            "dateFilter": {
                "start_date": "",
                "end_date": "",
                "dateFilterKey": ""
            },
            "orderBy": "createdAt",
            "orderByValue": -1,
            "isPaginationRequired": true

        }
    )

    const [exportComapanyData] = useExportCompanyDataMutation()

    // This use effect sets items in redux store
    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data || []))
            dispatch(setTotalItems(data?.totalItems || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    // Handle Export 
    const exportHandler = (done: any) => {
        setIsExporting(true)
        exportComapanyData({
            "limit": rowsPerPage,
            "searchValue": "",
            "params": [
                "dealerName",
                "dealerCode",
                "mobile"
            ],
            "page": page,
            "filterBy": [
                {
                    "fieldName": "",
                    "value": []
                }
            ],
            "dateFilter": {
                "start_date": "",
                "end_date": "",
                "dateFilterKey": ""
            },
            "orderBy": "createdAt",
            "orderByValue": -1,
            "isPaginationRequired": false

        })
            .then((res: any) => {
                setExportData(res?.data)
                setTimeout(() => {
                    done()
                    setIsExporting(false)

                }, 800);

            })
            .catch(err => { })
    }

    return (
        <div>
            <CompaniesListing
                columns={columns}
                rows={items}
                isTableLoading={isTableLoading}
                rowsPerPage={rowsPerPage}
                page={page}
                onExportClick={(done) => { exportHandler(done) }}
                isExporting={isExporting}
                exportData={exportData}
                exportHeaders={exportHeaders}
            />
        </div>
    )
}

export default CompaniesListingWrapper
