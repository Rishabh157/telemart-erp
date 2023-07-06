/// ==============================================
// Filename:SchemeListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SchemeListResponse } from 'src/models/scheme.model'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import SchemeListing from './SchemeListing'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import {
    useDeleteSchemeMutation,
    useGetAllSchemeQuery,
} from 'src/services/SchemeService'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Types --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/schemeSlice'
import { AppDispatch } from 'src/redux/store'
import { RootState } from 'src/redux/store'

const SchemeListingWrapper = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [deleteScheme] = useDeleteSchemeMutation()
    const schemeState: any = useSelector((state: RootState) => state.scheme)
    const { page, rowsPerPage, items, searchValue } = schemeState
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { data, isFetching, isLoading } = useGetAllSchemeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['schemeName', 'schemeCode'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })
    const columns: columnTypes[] = [
        {
            field: 'schemeCode',
            headerName: 'Scheme Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row.schemeCode} </span>
            },
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },

        {
            field: 'category',
            headerName: 'Category',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row.productCategoryLabel} </span>
            },
        },

        {
            field: 'subCategory',
            headerName: 'Sub Category',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row.ProductSubCategoryLabel} </span>
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SchemeListResponse) => {
                return <span> {row.schemePrice} </span>
            },
        },
        // {
        //     field: 'commission',
        //     headerName: 'Commission',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: SchemeListResponse) => {
        //         return <span> {row.commission} </span>
        //     },
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit
                    isDelete
                    handleEditActionButton={() => {
                        navigate(`/scheme/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Scheme',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                />
            ),
            align: 'end',
        },
    ]

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])
    const handleDelete = () => {
        setShowDropdown(false)
        deleteScheme(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Scheme deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    return (
        <SideNavLayout>
            <SchemeListing
                columns={columns || []}
                rows={items || []}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default SchemeListingWrapper
