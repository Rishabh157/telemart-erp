// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'
import {
    useDeleteTapeMutation,
    useGetPaginationTapeQuery,
} from 'src/services/media/TapeManagementServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import TapeManagementListing from './TapeManagementListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const TapeManagementListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // initiate method
    const navigate = useNavigate()
    const [deleteTape] = useDeleteTapeMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationTapeQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['tapeName', 'schemeLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_TAPE_MANAGEMENT_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_TAPE_MANAGEMENT_EDIT
                    )}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`edit/${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Tape',
                            text: 'Do you want to delete Tape?',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'tapeName',
            headerName: 'Tape Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAPE_MANAGEMENT_LIST_TAPE_NAME,
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.tapeName} </span>
            ),
        },
        {
            field: 'tapeType',
            headerName: 'Tape Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAPE_MANAGEMENT_LIST_TAPE_TYPE,
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.tapeType} </span>
            ),
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAPE_MANAGEMENT_LIST_SCHEME,
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'languageId',
            headerName: 'Language',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.TAPE_MANAGEMENT_LIST_LANGUAGE,
            renderCell: (row: any) => {
                const languageLength = row.languageId.length

                for (let i = 0; i < languageLength; i++) {
                    return <span> {row.languageId[i].languageName}</span>
                }
            },
        },
    ]

    const handleDelete = () => {
        deleteTape(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Tape deleted successfully!')
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
        <div className="h-full">
            <TapeManagementListing columns={columns} rows={items} />
        </div>
    )
}

export default TapeManagementListingWrapper
