/// ==============================================
// Filename:CompitorManagementListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import MediaLayout from '../../MediaLayout'
import CompetitorManagementListing from './CompetitorManagementListing'
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'
import {
    useDeletegetCompetitorMutation,
    useGetPaginationcompetitorQuery,
} from 'src/services/media/CompetitorManagementServices'
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
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/competitorManagementSlice'
import moment from 'moment'


const CompetitorManagementListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteCompetitor] = useDeletegetCompetitorMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.competitor
    )
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const columns: columnTypes[] = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {moment(row.date).format('DD/MM/YYYY')} </span>
            ),
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {formatTimeTo12Hour(row.startTime)} </span>
            ),
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {formatTimeTo12Hour(row.endTime)} </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.productName} </span>
            ),
        },
        {
            field: 'mobileNumber',
            headerName: 'Mobile No.',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.mobileNumber} </span>
            ),
        },
        // {
        //     field: 'websiteLink',
        //     headerName: 'Website link',
        //     flex: 'flex-[1_1_0%]',
        //     align: 'center',
        //     renderCell: (row: CompetitorManagementListResponse) => (
        //         <span> {row.websiteLink} </span>
        //     ),
        // },

        {
            field: 'schemePrice',
            headerName: 'Price/MRP',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.schemePrice} </span>
            ),
        },
        {
            field: 'artist',
            headerName: 'Artist',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.artist} </span>
            ),
        },
        // {
        //     field: 'channelNameId',
        //     headerName: 'Channel Name',
        //     flex: 'flex-[1_1_0%]',
        //     align: 'center',
        //     renderCell: (row: CompetitorManagementListResponse) => (
        //         <span>{/* {row.channelNameId}  */}</span>
        //     ),
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.competitor}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/media/competitor/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Competitior',
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
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationcompetitorQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['competitorName'],
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

    function formatTimeTo12Hour(timeString: string) {
        const time = moment(timeString)
        return time.format('h:mm A')
    }

    const handleDelete = () => {
        setShowDropdown(false)
        deleteCompetitor(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Competitor deleted successfully!')
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
                <CompetitorManagementListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.competitor,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
