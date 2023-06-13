import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import TapeManagementListing from './TapeManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import MediaLayout from '../../MediaLayout'
import {
    useGetPaginationTapeQuery,
    useDeleteTapeMutation,
} from 'src/services/media/TapeManagementServices'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/tapeManagementSlice'
import { TapeManagementListResponse } from 'src/models/tapeManagement.model'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// export type language ={
//     languageId:string[];

// }

const TapeManagementListingWrapper = () => {
    const navigate = useNavigate()
    const [deleteTape] = useDeleteTapeMutation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const tapeManagementState: any = useSelector(
        (state: RootState) => state.tapeManagement
    )

    const { page, rowsPerPage, searchValue, items } = tapeManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationTapeQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['tapeName', 'schemeLabel'],
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

    const columns: columnTypes[] = [
        {
            field: 'tapeName',
            headerName: 'Tabe Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.tapeName} </span>
            ),
        },
        {
            field: 'tapeType',
            headerName: 'Tape Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.tapeType} </span>
            ),
        },
        {
            field: 'schemeLabel',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: TapeManagementListResponse) => (
                <span> {row.schemeLabel} </span>
            ),
        },
        {
            field: 'languageName',
            headerName: 'Language',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                const languageLength = row.languageId.length

                for (let i = 0; i < languageLength; i++) {
                    return <span> {row.languageId[i].languageName}</span>
                }
            },
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
                                navigate(`edit/${row?._id}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Tape',
                                    text: 'Do you want to delete Tape?',
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

    const handleDelete = () => {
        setShowDropdown(false)
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
        <>
            <MediaLayout>
                <div className="h-full">
                    <TapeManagementListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </MediaLayout>
        </>
    )
}

export default TapeManagementListingWrapper
