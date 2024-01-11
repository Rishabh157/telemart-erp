/// ==============================================
// Filename:CallCenterMasterListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CallCenterMasterListResponse } from 'src/models/CallCenterMaster.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import {
    useGetCallCenterMasterQuery,
    useDeleteCallCenterMasterMutation,
} from 'src/services/CallCenterMasterServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/CallCenterMasterSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import CallCenterMasterListing from './CallCenterMasterListing'
// import { setIsTableLoading } from 'src/redux/slices/CallCenterMasterSlice'

const CallCenterMasterListingWrapper = () => {
    const callCenterState: any = useSelector(
        (state: RootState) => state.attributes
    )
    const [deleteAttribute] = useDeleteCallCenterMasterMutation()
    const navigate = useNavigate()
    const { page, rowsPerPage, searchValue, items } = callCenterState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const columns: columnTypes[] = [
        {
            field: 'callCenterName',
            headerName: 'Call Center Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CallCenterMasterListResponse) => (
                <span className="capitalize"> {row.callCenterName} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.callCenterMaster}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        // e.stopPropagation()
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(
                            `/configurations/callcenter-master/${currentId}`
                        )
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete call center',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res) => {
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
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetCallCenterMasterQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['callCenterName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId,
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
        deleteAttribute(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Call center deleted successfully!')
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
            <ConfigurationLayout>
                <CallCenterMasterListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.attribute,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default CallCenterMasterListingWrapper
