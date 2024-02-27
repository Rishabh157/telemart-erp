/// ==============================================
// Filename:ListWebsiteTagsListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 06, 2023
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
import { WebsiteTagsListResponse } from 'src/models/website/WebsiteTags.model'
import {
    useDeleteWebsiteTagsMutation,
    useGetPaginationWebsiteTagsQuery,
} from 'src/services/websites/WebsiteTagsServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WebsiteLayout from '../../WebsiteLayout'
import WebsiteTagListing from './WebsiteTagListing'

// |-- Redux --|
import {
    UserModuleNameTypes
} from 'src/models/userAccess/UserAccess.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websiteTagsSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const WebsiteTagListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    //const {state} = useLocation()
    //const {websiteId} = state
    const [deleteWebsiteTags] = useDeleteWebsiteTagsMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteTagsState: any = useSelector(
        (state: RootState) => state.websiteTags
    )

    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items } = WebsiteTagsState

    const columns: columnTypes[] = [
        {
            field: 'metaKeyword',
            headerName: 'Meta Keyword',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaKeyword} </span>
            ),
        },
        {
            field: 'metaOgType',
            headerName: 'Meta OG Type',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaOgType} </span>
            ),
        },
        {
            field: 'metaTwitterTitle',
            headerName: 'Meta Twitter Title',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaTwitterTitle} </span>
            ),
        },
        {
            field: 'metaTwitterCard',
            headerName: 'Meta Twitter Card',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row.metaTwitterCard} </span>
            ),
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.websiteTags}
                    isView
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`/all-websites/website-tags/${currentId}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/all-websites/website-tags/edit/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Tags',
                            text: 'Do you want to delete Tags',
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
    const { data, isFetching, isLoading } = useGetPaginationWebsiteTagsQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['metaKeyword'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
            {
                fieldName: 'companyId',
                value: userData?.companyId,
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

    const handleDelete = () => {
        setShowDropdown(false)
        deleteWebsiteTags(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Tag deleted successfully!')
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
            <WebsiteLayout>
                <WebsiteTagListing
                  columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsiteLayout>
        </>
    )
}

export default WebsiteTagListingWrapper
