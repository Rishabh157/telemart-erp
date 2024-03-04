/// ==============================================
// Filename:WebsitePageListingWrapper.tsx
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
import { WebsitePageListResponse } from 'src/models/website/WebsitePage.model'
import {
    useDeleteWebsitePageMutation,
    useGetPaginationWebsitePageQuery,
} from 'src/services/websites/WebsitePageServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

import WebsitePageListing from './WebsitePageListing'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websitePageSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const WebsitePageListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deletePage] = useDeleteWebsitePageMutation()
    const [currentId, setCurrentId] = useState('')

    const [showDropdown, setShowDropdown] = useState(false)
    const WebsitePageState = useSelector(
        (state: RootState) => state.websitePage
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items, filterValue } =
        WebsitePageState
    const columns: columnTypes[] = [
        {
            field: 'pageName',
            headerName: 'Page Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsitePageListResponse) => (
                <span> {row.pageName} </span>
            ),
            name: UserModuleNameTypes.WEBSITES_PAGES_LIST_WEBSITES_PAGES_NAME,
        },
        {
            field: 'pageUrl',
            headerName: 'Page Url',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsitePageListResponse) => (
                <span> {row.pageUrl} </span>
            ),
            name: UserModuleNameTypes.WEBSITES_PAGES_LIST_PAGE_URL,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_PAGES_ONE_EDIT
                    )}
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_PAGES_ONE_VIEW
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_PAGES_ONE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleViewActionButton={() => {
                        navigate(`/all-websites/website-page/view/${currentId}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/all-websites/website-page/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Website-Page',
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

    const { data, isFetching, isLoading } = useGetPaginationWebsitePageQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['pageName'],
        page: page,
        filterBy: [
            {
                fieldName: 'websiteId',
                value: filterValue,
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
        deletePage(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Website-Page deleted successfully!')
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
            <WebsitePageListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default WebsitePageListingWrapper
