/// ==============================================
// Filename:DidManagementListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DidManagementListResponse } from 'src/models/Media.model'

import {
    useDeleteDidMutation,
    useGetPaginationDidQuery,
} from 'src/services/media/DidManagementServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import DidManagementListing from './DidManagementListing'
// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/didManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const DidManagementListingWrapper = () => {
    const navigate = useNavigate()
    const didManagementState: any = useSelector(
        (state: RootState) => state.didManagement
    )
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteDid] = useDeleteDidMutation()
    const { page, rowsPerPage, searchValue, items } = didManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()

    const columns: columnTypes[] = [
        
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',

            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_DID_MANAGEMENT_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_DID_MANAGEMENT_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/did/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete DID',
                            text: 'Do you want to delete',
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
            
        },
        {
            field: 'didNumber',
            headerName: 'DID Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_DID_NUMBER,

            renderCell: (row: DidManagementListResponse) => (
                <span> {row.didNumber} </span>
            ),
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_DID_SCHEMA_NAME,

            renderCell: (row: DidManagementListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_CHANNEL_NAME,

            renderCell: (row: DidManagementListResponse) => (
                <span> {row.channelLabel} </span>
            ),
        },
        {
            field: 'slotLabel',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DID_MANAGEMENT_LIST_SLOT_NAME,

            renderCell: (row: DidManagementListResponse) => (
                <span> {row.slotLabel} </span>
            ),
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationDidQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNumber', 'schemeLabel', 'channelLabel'],
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
        deleteDid(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'DID deleted successfully!')
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
            <>
                <DidManagementListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </>
        </>
    )
}

export default DidManagementListingWrapper
