import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import InitialCallTwoListing from './InitialCallTwoListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

import {
    useGetinitialCallerTwoQuery,
    useDeleteinitialCallerTwoMutation,
} from 'src/services/configurations/InitialCallerTwoServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerTwoSlice'
import { InitialCallerTwoListResponse } from 'src/models/configurationModel/InitialCallerTwo.model'
import DispositionLayout from '../../DispositionLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'

// export type language ={
//     languageId:string[];

// }

const InitialCallTwoListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteTape] = useDeleteinitialCallerTwoMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallTwoState: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { page, rowsPerPage, searchValue, items } = initialCallTwoState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetinitialCallerTwoQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['tapeName', 'schemeLabel'],
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
            headerName: 'Initial Call Two',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallName} </span>
            ),
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.callType} </span>
            ),
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerTwoListResponse) => (
                <span> {row.initialCallOneLabel} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.initialCallerTwo}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Initial Call-Two',
                            text: 'Do you want to delete Initial Call-Two?',
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
        deleteTape(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Deleted successfully!')
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
                <div className="h-full">
                    <InitialCallTwoListing
                        columns={getAllowedAuthorizedColumns(
                            checkUserAccess,
                            columns,
                            UserModuleNameTypes.initialCallerTwo,
                            UserModuleActionTypes.List
                        )}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </DispositionLayout>
        </>
    )
}

export default InitialCallTwoListingWrapper
