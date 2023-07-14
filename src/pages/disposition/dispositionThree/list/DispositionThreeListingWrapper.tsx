import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'src/redux/store'
import {
    useDeletedispositionThreeMutation,
    useGetdispositionThreeQuery,
} from 'src/services/configurations/DispositionThreeServices'
import {
    setItems,
    setIsTableLoading,
    setTotalItems,
} from 'src/redux/slices/configuration/dispositionThreeSlice'
import { DispositionThreeListResponse } from 'src/models/configurationModel/DispositionThree.model'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { showToast } from 'src/utils'
import DispositionThreeListing from './DispositionThreeListing'
import { useNavigate } from 'react-router-dom'
import DispositionLayout from 'src/pages/disposition/DispositionLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'

const DispositionThreeListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { searchValue, filterValue, items }: any = useSelector(
        (state: RootState) => state.dispositionThree
    )

    const [deleteDispositonThree] = useDeletedispositionThreeMutation()

    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dispositionThreeState: any = useSelector(
        (state: RootState) => state.dispositionThree
    )

    const { page, rowsPerPage } = dispositionThreeState

    const { data, isFetching, isLoading } = useGetdispositionThreeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dispositionName', 'dispositionTwoId'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: filterValue ? filterValue : [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
    })
    const columns: columnTypes[] = [
        {
            field: 'dispositionName',
            headerName: 'Disposition Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionThreeListResponse) => (
                <span> {row.dispositionName} </span>
            ),
        },
        {
            field: 'dispostionOneLabel',
            headerName: 'Disposition One Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionThreeListResponse) => (
                <span> {row.dispostionOneLabel} </span>
            ),
        },
        {
            field: 'dispostionTwoLabel',
            headerName: 'Disposition Two Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DispositionThreeListResponse) => (
                <span> {row.dispostionTwoLabel} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.dispositionThree}
                    isView
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`edit/${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Disposition Three',
                            text: 'Do you want to delete Disposition-Three?',
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
        deleteDispositonThree(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Disposition Three deleted successfully!'
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

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [dispatch, data, isFetching, isLoading])

    return (
        <>
            <DispositionLayout>
                <div className="h-full">
                    <DispositionThreeListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </DispositionLayout>
        </>
    )
}

export default DispositionThreeListingWrapper
