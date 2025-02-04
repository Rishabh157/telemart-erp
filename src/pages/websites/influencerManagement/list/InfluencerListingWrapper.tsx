// |-- Built-in Dependencies --|
import { useState } from 'react'

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
import InfluencerListing from './InfluencerListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'
import { setFilterValue } from 'src/redux/slices/website/websiteBlogSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const InfluencerListingWrapper = () => {
    useUnmountCleanup()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [deleteWebsite] = useDeletegetWebsiteMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const WebsiteState: any = useSelector(
        (state: RootState) => state.listingPagination
    )

    const { page, rowsPerPage, searchValue } = WebsiteState

    // pagination api
    const { items } = useGetCustomListingData<[]>({
        useEndPointHook: useGetPaginationWebsiteQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['productName', 'url'],
            page: page,
            filterBy: [
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
    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[1.8_1.8_0%]',
            renderCell: (row: any) => (
                // <div className="relative">
                //     <button
                //         onClick={(e) => {
                //             e.stopPropagation()
                //             setShowDropdown(!showDropdown)
                //             setCurrentId(row?._id)
                //         }}
                //         className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                //     >
                //         {' '}
                //         <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                //     </button>
                //     {showDropdown && currentId === row?._id && (
                //         <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10  w-24">

                //         </div>
                //     )}
                // </div>

                <ActionPopup
                    moduleName={UserModuleNameTypes.website}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(`/all-websites/Website/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => {
                                navigate('/all-websites/website-blog/add', {
                                    state: {
                                        siteId: currentId,
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
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </>
                </ActionPopup>
            ),
        },
        {
            field: 'productName',
            headerName: 'Website Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: WebsiteListResponse) => (
                <span> {row?.productName} </span>
            ),
        },
    ]
    return (
        <>
            <InfluencerListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </>
    )
}

export default InfluencerListingWrapper
