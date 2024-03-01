/// ==============================================
// Filename:DispositionComplaintListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DispositionComplaintListResponse } from 'src/models/configurationModel/DispositionComplaint.model'
import {
    useDeletedispositionComplaintMutation,
    useGetdispositionComplaintQuery,
} from 'src/services/configurations/DispositionComplaintServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import DispositionComplaintListing from './DispositionComplaintListing'

// |-- Redux --|

import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/configuration/dispositionComplaintSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

// export type language ={
//     languageId:string[];

// }

const DispositionComplaintListingWrapper = () => {
    const navigate = useNavigate()
    const [deletecomaplaint] = useDeletedispositionComplaintMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const dispositionComplaintState: any = useSelector(
        (state: RootState) => state.dispositionComplaint
    )

    const { page, rowsPerPage, searchValue, items } = dispositionComplaintState

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetdispositionComplaintQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dispositionName'],
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
            field: 'dispositionName',
            headerName: 'Disposition Complaint',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.DISPOSITION_COMPLAINT_LIST_DISPOSITION_COMPLAINT,
            renderCell: (row: DispositionComplaintListResponse) => (
                <span> {row.dispositionName} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',

            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(UserModuleNameTypes.ACTION_DISPOSITION_COMPLAINT_EDIT)}
                    isDelete={isAuthorized(UserModuleNameTypes.ACTION_DISPOSITION_COMPLAINT_DELETE)}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Tape',
                            text: 'Do you want to delete Disposition-One?',
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
        deletecomaplaint(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Complaint deleted successfully!')
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
                <div className="h-full">
                    <DispositionComplaintListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </>
        </>
    )
}

export default DispositionComplaintListingWrapper
