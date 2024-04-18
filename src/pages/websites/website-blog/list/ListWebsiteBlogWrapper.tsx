// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { WebsiteBlogListResponse } from 'src/models/website/WebsiteBlog.model'
import {
    useDeletegetWebsiteBlogMutation,
    useGetPaginationWebsiteBlogQuery,
} from 'src/services/websites/WebsiteBlogServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import ListWebsiteBlog from './ListWebsiteBlog'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ListWebsiteBlogWrapper = () => {
    useUnmountCleanup()

    const navigate = useNavigate()

    const [deleteWebsiteBlog] = useDeletegetWebsiteBlogMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteBlogState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, filterValue } = WebsiteBlogState

    // pagination api
    const { items } = useGetCustomListingData<WebsiteBlogListResponse[]>({
        useEndPointHook: useGetPaginationWebsiteBlogQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['blogName', 'blogTitle'],
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
    })

    const handleDelete = () => {
        setShowDropdown(false)
        deleteWebsiteBlog(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Blog deleted successfully!')
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
                        UserModuleNameTypes.ACTION_WEBSITES_BLOG_ONE_EDIT
                    )}
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_BLOG_ONE_VIEW
                    )}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_WEBSITES_BLOG_ONE_DELETE
                    )}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/all-websites/website-blog/${currentId}`)
                    }}
                    handleViewActionButton={() => {
                        navigate(`/all-websites/website-blog/view/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Blog',
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

        },
        {
            field: 'blogName',
            headerName: 'Blog Name',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_BLOG_LIST_WEBSITES_BLOG_NAME,
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogName} </span>
            ),
        },
        {
            field: 'blogTitle',
            headerName: 'Blog Title',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_BLOG_LIST_BLOG_TITLE,
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogTitle} </span>
            ),
        },
        {
            field: 'blogSubtitle',
            headerName: 'Blog Subtitle',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WEBSITES_BLOG_LIST_BLOG_SUBTITLE,
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogSubtitle} </span>
            ),
        },

    ]
    return (
        <ListWebsiteBlog
            columns={columns}
            rows={items}
            setShowDropdown={setShowDropdown}
        />
    )
}

export default ListWebsiteBlogWrapper
