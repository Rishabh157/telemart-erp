// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

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
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const SlotManagementListingWrapper = () => {
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
    const [updatePausePlay] = useUpdateSlotContinueStatusMutation()
    const [deleteSlotMangement] = useDeleteSlotMangementMutation()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationSlotQuery({
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
                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_SLOT_MANAGEMENT_DELETE
                    )}
                    handleOnAction={() => {
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
                                return res.isConfirmed ? handleDelete() : null
                            },
                        })
                    }}
                />
            ),
        },
        {
            field: 'slotName',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_SLOT_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row?.slotName} </span>
            ),
        },
        {
            field: 'groupNameLabel',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_CHANNEL_GROUP,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row?.groupNameLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_CHANNEL_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row?.channelLabel} </span>
            ),
        },
        {
            field: 'tapeLabel',
            headerName: 'Tape Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_TAPE_NAME,
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row?.tapeLabel} </span>
            ),
        },
        {
            field: 'slotStartTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_START_TIME,
            renderCell: (row: SlotManagementListResponse) => (
                <span>
                    {moment(row?.slotStartTime, 'hh:mm A').format('hh:mm A')}
                </span>
            ),
        },
        {
            field: 'slotEndTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SLOT_MANAGEMENT_LIST_END_TIME,
            renderCell: (row: SlotManagementListResponse) => (
                <span>
                    {moment(row?.slotEndTime, 'hh:mm A').format('hh:mm A')}
                </span>
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
                    {row?.slotContinueStatus ? (
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
    ]

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

    const handleDelete = () => {
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
        <div className="h-full">
            <SlotManagementListing columns={columns} rows={items} />
        </div>
    )
}

export default SlotManagementListingWrapper
