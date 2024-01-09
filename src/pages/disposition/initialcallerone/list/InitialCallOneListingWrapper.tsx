import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import InitialCallOneListing from './InitialCallOneListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

import {
    useGetinitialCallerOneQuery,
    useDeleteinitialCallerOneMutation,
} from 'src/services/configurations/InitialCallerOneServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/initialCallerOneSlice'
import { InitialCallerOneListResponse } from 'src/models/configurationModel/InitialCallerOne.model'
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

const InitialCallOneListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteTape] = useDeleteinitialCallerOneMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const initialCallOneState: any = useSelector(
        (state: RootState) => state.initialCallerOne
    )
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { page, rowsPerPage, searchValue, items } = initialCallOneState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetinitialCallerOneQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['initialCallName'],
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
            headerName: 'Initial Call One',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerOneListResponse) => (
                <span className="capitalize"> {row.initialCallName} </span>
            ),
        },
        {
            field: 'callType',
            headerName: 'Call Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InitialCallerOneListResponse) => (
                <span className="capitalize"> {row.callType} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.initialCallerOne}
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
                            title: 'Delete Initial Call One',
                            text: 'Do you want to delete Initial Call One?',
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
                    <InitialCallOneListing
                        columns={getAllowedAuthorizedColumns(
                            checkUserAccess,
                            columns,
                            UserModuleNameTypes.initialCallerOne,
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

export default InitialCallOneListingWrapper
