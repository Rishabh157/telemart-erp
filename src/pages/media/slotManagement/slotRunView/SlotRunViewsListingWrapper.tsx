/// ==============================================
// Filename:SlotRunViewsListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import moment from 'moment'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { FaExclamation } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SlotManagementListResponse } from 'src/models/Slot.model'
import SlotManagementListing from './SlotRunViewtListing'
// import {
//     // useDeleteSlotMangementMutation,
//     useGetPaginationSlotQuery,
// } from 'src/services/media/SlotDefinitionServices'
// import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
// import { showToast } from 'src/utils'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import SlotRunWrapper from '../update/SlotRunWrapper'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'
// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/slotManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useGetPaginationSlotViewQuery } from 'src/services/media/SlotsViewServices'

const SlotRunViewsListingWrapper = () => {
    // const navigate = useNavigate()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const slotManagementState: any = useSelector(
        (state: RootState) => state.slotManagement
    )
    // const [showDropdown, setShowDropdown] = useState(false)
    const [runState, setRunState] = useState('')
    // const [currentId, setCurrentId] = useState('')
    const { page, rowsPerPage, searchValue, items } = slotManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // const [deleteSlotMangement] = useDeleteSlotMangementMutation()
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationSlotViewQuery({
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

    const columns: columnTypes[] = [
        {
            field: 'slotName',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.slotName} </span>
            ),
        },
        {
            field: 'groupNameLabel',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.groupNameLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.channelLabel} </span>
            ),
        },
        {
            field: 'tapeLabel',
            headerName: 'Tape Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.tapeLabel} </span>
            ),
        },
        {
            field: 'slotStartTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotStartTime).format('hh:mm a')} </span>
            ),
        },
        {
            field: 'slotEndTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotEndTime).format('hh:mm a')} </span>
            ),
        },
        {
            field: 'slotRun',
            headerName: 'Run Status',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="">
                    <button
                        onClick={(e) => {
                            setRunState(row._id)
                            setIsOpenDialog(true)
                        }}
                        className={`text-slate-600 font-bold m-1  transition-all duration-[600ms] ${
                            row.runStatus === true
                                ? 'hover:bg-green-100'
                                : row.runStatus === false
                                ? 'hover:bg-red-100'
                                : 'hover:bg-orange-100'
                        } p-2 rounded-full border  ${
                            row.runStatus === true
                                ? 'border-green-500'
                                : row.runStatus === false
                                ? 'border-red-500'
                                : 'border-orange-500'
                        }`}
                    >
                        {row.runStatus === true ? (
                            <TiTick />
                        ) : row.runStatus === false ? (
                            <FaTimes />
                        ) : (
                            <FaExclamation />
                        )}
                    </button>
                    {/* )} */}
                </div>
            ),
            align: 'end',
        },
    ]

    return (
        <>
            {/* <> */}
            <div className="h-full">
                <SlotManagementListing
                    columns={columns}
                    rows={items}
                    // setShowDropdown={setShowDropdown}
                />
                <DialogLogBox
                    isOpen={isOpenDialog}
                    buttonClass="cursor-pointer"
                    handleClose={() => {
                        setIsOpenDialog(false)
                    }}
                    component={
                        <SlotRunWrapper
                            id={runState}
                            setIsOpenDialog={setIsOpenDialog}
                        />
                    }
                />
            </div>
            {/* </> */}
        </>
    )
}

export default SlotRunViewsListingWrapper
