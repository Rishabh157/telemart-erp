// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
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

import WebsiteTagListing from './WebsiteTagListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const WebsiteTagListingWrapper = () => {
    useUnmountCleanup()
    const navigate = useNavigate()
    const [deleteWebsiteTags] = useDeleteWebsiteTagsMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteTagsState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { userData } = useSelector((state: RootState) => state?.auth)
    const { page, rowsPerPage, searchValue } = WebsiteTagsState

    // pagination api
    const { items } = useGetCustomListingData<WebsiteTagsListResponse[]>({
        useEndPointHook: useGetPaginationWebsiteTagsQuery({
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
        }),
    })

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
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_TAGS_EDIT
                    )}
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_TAGES_VIEW
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_TAGS_DELETE
                    )}
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
        },
        {
            field: 'metaKeyword',
            headerName: 'Meta Keyword',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_TAGS_LIST_WEBSITES_META_KEYWORD,
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row?.metaKeyword} </span>
            ),
        },
        {
            field: 'metaOgType',
            headerName: 'Meta OG Type',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_TAGS_LIST_META_OG_TYPE,
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row?.metaOgType} </span>
            ),
        },
        {
            field: 'metaTwitterTitle',
            headerName: 'Meta Twitter Title',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_TAGS_LIST_META_TWITTER_TITLE,
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row?.metaTwitterTitle} </span>
            ),
        },
        {
            field: 'metaTwitterCard',
            headerName: 'Meta Twitter Card',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_TAGS_LIST_META_TWITTER_CARD,
            renderCell: (row: WebsiteTagsListResponse) => (
                <span> {row?.metaTwitterCard} </span>
            ),
        },
    ]
    return (
        <WebsiteTagListing
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default WebsiteTagListingWrapper
