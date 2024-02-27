/// ==============================================
// Filename:CompitorManagementListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 03, 2023
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
import { CompetitorManagementListResponse } from 'src/models/CompetitorManagement.model'

import {
    useDeletegetCompetitorMutation,
    useGetPaginationcompetitorQuery,
} from 'src/services/media/CompetitorManagementServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import MediaLayout from '../../MediaLayout'
import CompetitorManagementListing from './CompetitorManagementListing'
// |-- Redux --|
import moment from 'moment'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/competitorManagementSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const CompetitorManagementListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteCompetitor] = useDeletegetCompetitorMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const competitorManagementState: any = useSelector(
        (state: RootState) => state.competitor
    )

    const { page, rowsPerPage, searchValue, items } = competitorManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const columns: columnTypes[] = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPETITOR_LIST_DATE,
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {moment(row.date).format('DD/MM/YYYY')} </span>
            ),
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPETITOR_LIST_START_TIME,
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {formatTimeTo12Hour(row.startTime)} </span>
            ),
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPETITOR_LIST_START_END,
            align: 'center',
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {formatTimeTo12Hour(row.endTime)} </span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.COMPETITOR_LIST_PRODUCT_NAME,
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
            name: UserModuleNameTypes.COMPETITOR_LIST_MOBILE_NO,
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.mobileNumber} </span>
            ),
        },

        {
            field: 'schemePrice',
            headerName: 'Price/MRP',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.COMPETITOR_LIST_PRICE_MRP,
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.schemePrice} </span>
            ),
        },
        {
            field: 'competitorName',
            headerName: 'Competitor Name',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            name: UserModuleNameTypes.COMPETITOR_LIST_COMPETITOR_NAME,
            renderCell: (row: CompetitorManagementListResponse) => (
                <span> {row.competitorName} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_COMPETITOR_EDIT
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_COMPETITOR_DELETE
                    )}
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
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </MediaLayout>
        </>
    )
}

export default CompetitorManagementListingWrapper
