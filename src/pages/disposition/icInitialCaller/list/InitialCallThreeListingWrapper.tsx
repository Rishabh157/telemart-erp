import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import InitialCallThreeListing from './InitialCallThreeListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerThreeSlice'
import {
    useDeleteInitialCallerThreeMutation,
    useGetInitialCallerThreeQuery,
} from 'src/services/configurations/InitialCallerThreeServices'
import { useNavigate } from 'react-router-dom'
import { InitialCallerThreeListResponse } from 'src/models/configurationModel/InitialCallerThree.model'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const InitialCallThreeListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteIniticallthree] = useDeleteInitialCallerThreeMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallThreeState: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )

    const { page, rowsPerPage, searchValue, items } = initialCallThreeState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetInitialCallerThreeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['initailCallName'],
        page: page,
        filterBy: [
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

    const columns: columnTypes[] = [
        {
            field: 'initialCallName',
            headerName: 'Initial Call Three',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallName} </span>
            ),
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallOneLabel} </span>
            ),
        },
        {
            field: 'initialCallTwoLabel',
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerThreeListResponse) => (
                <span> {row.initialCallTwoLabel} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`view/${row?._id}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete InitialCaller-Three',
                            text: 'Do you want to delete InitialCaller-Three?',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                />
            ),
            align: 'end',
        },
    ]

    const handleDelete = () => {
        setShowDropdown(false)
        deleteIniticallthree(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Initiacall-Three deleted successfully!'
                    )
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
            <DispositionLayout>
                <InitialCallThreeListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </DispositionLayout>
        </>
    )
}

export default InitialCallThreeListingWrapper
