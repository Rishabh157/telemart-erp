import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/competitorManagementSlice'
import MediaLayout from '../../MediaLayout'
import CompetitorManagementListing from './CompetitorManagementListing'
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'
import {
    useDeletegetCompetitorMutation,
    useGetPaginationcompetitorQuery,
} from 'src/services/media/CompetitorManagementServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const CompetitorManagementListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteCompetitor] = useDeletegetCompetitorMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.competitor
    )

    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const columns: columnTypes[] = [
        {
            field: 'competitorName',
            headerName: 'Competitor Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.competitorName} </span>
            ),
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.companyName} </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product  Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.productName} </span>
            ),
        },

        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.schemePrice} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(`/media/competitor/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Competitior',
                                    text: 'Do you want to delete',
                                    showCancelButton: true,
                                    next: (res: any) => {
                                        return res.isConfirmed
                                            ? handleDelete()
                                            : setShowDropdown(false)
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationcompetitorQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['competitorName'],
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

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteCompetitor(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Competitor deleted successfully!')
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
        <>
            <MediaLayout>
                <CompetitorManagementListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
