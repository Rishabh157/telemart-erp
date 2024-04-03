/// ==============================================
// Filename:SlotManagementListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { FaTimes } from 'react-icons/fa'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
// import { FaExclamation } from 'react-icons/fa'
// import { TiTick } from 'react-icons/ti'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SlotManagementListResponse } from 'src/models/Slot.model'
import {
    useDeleteSlotMangementMutation,
    useGetPaginationSlotQuery,
    useUpdateSlotContinueStatusMutation,
} from 'src/services/media/SlotDefinitionServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import SlotManagementListing from './SlotManagementListing'
// import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
// import SlotRunWrapper from '../update/SlotRunWrapper'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/slotManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const SlotManagementListingWrapper = () => {
    const navigate = useNavigate()
    // const [isOpenDialog, setIsOpenDialog] = useState(false)
    const slotManagementState: any = useSelector(
        (state: RootState) => state.slotManagement
    )
    const [showDropdown, setShowDropdown] = useState(false)
    // const [runState, setRunState] = useState('')
    const [currentId, setCurrentId] = useState('')
    const { page, rowsPerPage, searchValue, items } = slotManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [updatePausePlay] = useUpdateSlotContinueStatusMutation()

    const [deleteSlotMangement] = useDeleteSlotMangementMutation()
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationSlotQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['slotName', 'channelLabel', 'groupNameLabel', 'tapeLabel'],
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

    const handlePausePlay = (id: string) => {
        updatePausePlay(id).then((res: any) => {
            if (res?.data?.status) {
                showToast('success', 'Slot Updated successfully!')
                navigate('/media/slot/defination')
            } else {
                showToast('error', res?.data?.message)
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'slotName',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_SLOT_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.slotName} </span>
            ),
        },
        {
            field: 'groupNameLabel',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_CHANNEL_GROUP,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.groupNameLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_CHANNEL_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.channelLabel} </span>
            ),
        },
        {
            field: 'tapeLabel',
            headerName: 'Tape Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_TAPE_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.tapeLabel} </span>
            ),
        },
        {
            field: 'slotStartTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_START_TIME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotStartTime).format('hh:mm a')} </span>
            ),
        },
        {
            field: 'slotEndTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_END_TIME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotEndTime).format('hh:mm a')} </span>
            ),
        },
        {
            field: 'pausePlay',
            headerName: 'Pause / Play',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_PAUSE_PLAY,
            renderCell: (row: SlotManagementListResponse) => (
                <span>
                    {' '}
                    {row.slotContinueStatus ? (
                        <span>
                            <CiPause1
                                onClick={() => handlePausePlay(row?._id)}
                                size={30}
                                className="cursor-pointer"
                            />{' '}
                            PLAYING
                        </span>
                    ) : (
                        <span>
                            <CiPlay1
                                onClick={() => handlePausePlay(row?._id)}
                                size={30}
                                className="cursor-pointer"
                            />
                            STOPPED
                        </span>
                    )}{' '}
                </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/slot/edit/${row?._id}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Slot ',
                            text: 'Do you want to delete Slot ?',
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
        //alert(currentId)
        deleteSlotMangement(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Slot deleted successfully!')
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
            {/* <> */}
            <div className="h-full">
                <SlotManagementListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </div>
            {/* </> */}
        </>
    )
}

export default SlotManagementListingWrapper
