import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import ATMMenu from 'src/components/UI/atoms/ATMMenu/ATMMenu'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { setIsTableLoading, setItems, setTotalItems } from 'src/redux/slices/companySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useDeleteCompanyMutation, useExportCompanyDataMutation, useGetCompaniesQuery } from 'src/services/CompanyServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import CompaniesListing from './CompaniesListing'

const columns: columnTypes[] = [
    {
        field: "company_name",
        headerName: "Company Name",
        flex: 'flex-[2.5_2.5_0%]',
        renderCell: (row: any) => (
            <div className='text-primary-main flex items-center gap-3 ' >
                <div className='shadow-md p-[2px] border-2  h-[55px] w-[55px] rounded-full' >
                    <Avatar src={row.logo} alt="" variant='circular' sx={{ width: "100%", height: "100%" }} />
                </div>
                {row.company_name} </div>
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
        field: "address",
        headerName: "Address",
        flex: 'flex-[2_2_0%]',

    },
    {
        field: "phone_no",
        headerName: "Phone No",
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => (
            <span className='text-slate-800' > {row.phone_no} </span>
        )
    },

    {
        field: "website_url",
        headerName: "Website URL",
        flex: 'flex-[2_2_0%]',
        renderCell: (row: any) => (
            <div className='text-primary-main' > {row.website_url} </div>
        ),
        align: 'center'

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

    // ------------- States ------------- 
    const companyState: any = useSelector((state: RootState) => state.company)
    const [exportData, setExportData] = useState<any>([]);
    const [isExporting, setIsExporting] = useState(false);

    // ------------- Redux States ------------- 
    const {
        items,
        isTableLoading,
        page,
        rowsPerPage,
    } = companyState

    // ------------- Services ------------- 
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
    const [deleteCompany] = useDeleteCompanyMutation()

    // ------------- Hooks -------------
    const dispatch = useDispatch<AppDispatch>()

    // ------------- Use Effects -------------
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

    // ------------- Constants -------------
    const defaultColumns: columnTypes[] = [
        {
            field: "actions",
            headerName: "Actions",
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ATMMenu
                    options={[
                        {
                            label: <div className='text-red-500 flex gap-3 items-center' > <MdDelete className='text-xl' /> Delete</div>,
                            onClick: () => {
                                showConfirmationDialog({
                                    title: "Are you sure ?",
                                    text: "This action can not be revert",
                                    showCancelButton: true,
                                    next: (result) => { result.isConfirmed && deleteCompany(row._id) }
                                })
                            }
                        }
                    ]}
                />
            ),
            align: 'end'
        },
    ]

    // ------------- Handlers -------------
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
                columns={columns.concat(defaultColumns)}
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
