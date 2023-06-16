import React, { useEffect, useState } from 'react'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websiteBlogSlice'
import WebsiteLayout from '../../WebsiteLayout'
import ListWebsiteBlog from './ListWebsiteBlog'
import { WebsiteBlogListResponse } from 'src/models/website/WebsiteBlog.model'
import {
    useDeletegetWebsiteBlogMutation,
    useGetPaginationWebsiteBlogQuery,
} from 'src/services/websites/WebsiteBlogServices'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

const ListWebsiteBlogWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    //const {state} = useLocation()
    //const {websiteId} = state
    const [deleteWebsiteBlog] = useDeletegetWebsiteBlogMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteBlogState: any = useSelector(
        (state: RootState) => state.websiteBlog
    )
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items, filterValue } =
        WebsiteBlogState

    const columns: columnTypes[] = [
        {
            field: 'blogName',
            headerName: 'Blog Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogName} </span>
            ),
        },
        {
            field: 'blogTitle',
            headerName: 'Blog Title',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogTitle} </span>
            ),
        },
        {
            field: 'blogSubtitle',
            headerName: 'Blog Subtitle',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteBlogListResponse) => (
                <span> {row.blogSubtitle} </span>
            ),
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
                            navigate(`/all-websites/website-blog/${currentId}`)
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                                onClick={() => {
                                    navigate(
                                        `/all-websites/website-blog/view/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
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
    const { data, isFetching, isLoading } = useGetPaginationWebsiteBlogQuery({
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

    return (
        <>
            <WebsiteLayout>
                <ListWebsiteBlog
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsiteLayout>
        </>
    )
}

export default ListWebsiteBlogWrapper
