/// ==============================================
// Filename:WebListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 05, 2023
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
import { WebsiteListResponse } from 'src/models/website/Website.model'
import {
    useDeletegetWebsiteMutation,
    useGetPaginationWebsiteQuery,
} from 'src/services/websites/WebsiteServices'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WebsiteLayout from '../../WebsiteLayout'
import WebsiteListing from './WebsitetListing'

// |-- Redux --|
import {
    UserModuleNameTypes
} from 'src/models/userAccess/UserAccess.model'
import { setFilterValue } from 'src/redux/slices/website/websiteBlogSlice'
import { setFilterValue as setPageFilterValue } from 'src/redux/slices/website/websitePageSlice'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/website/websiteSlice'
import { AppDispatch, RootState } from 'src/redux/store'

const WebstieListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteWebsite] = useDeletegetWebsiteMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteState: any = useSelector((state: RootState) => state.website)
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { page, rowsPerPage, searchValue, items } = WebsiteState
    const columns: columnTypes[] = [
        {
            field: 'productName',
            headerName: 'Website Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteListResponse) => (
                <span> {row.productName} </span>
            ),
        },
        {
            field: 'gaTagIp',
            headerName: 'GA Tag',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteListResponse) => (
                <span> {row.gaTagIp} </span>
            ),
        },
        {
            field: 'url',
            headerName: 'URL',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteListResponse) => <span> {row.url} </span>,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    moduleName={UserModuleNameTypes.website}
                    isEdit
                    isDelete
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/all-websites/website/${currentId}`)
                    }}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Website',
                            text: 'Do you want to delete',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed
                                    ? handleDelete()
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                dispatch(setFilterValue(currentId))
                                navigate('/all-websites/website-blog/add', {
                                    state: {
                                        websiteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Add Blog
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setFilterValue(currentId))
                                navigate('/all-websites/website-blog', {
                                    state: {
                                        websiteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            View Blog
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setFilterValue(currentId))
                                navigate('/all-websites/website-page/add', {
                                    state: {
                                        siteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Add Page
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setPageFilterValue(currentId))
                                navigate('/all-websites/website-page', {
                                    state: {
                                        siteId: currentId,
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                        >
                            View Page
                        </button>
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetPaginationWebsiteQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['productName', 'url'],
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
        deleteWebsite(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Website deleted successfully!')
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
                <WebsiteListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </WebsiteLayout>
        </>
    )
}

export default WebstieListingWrapper
