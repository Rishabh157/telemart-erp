// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DealersSchemeListResponse } from 'src/models/DealerScheme.model'
import {
    useDeactiveDealerSchemeMutation,
    useGetDealerSchemeQuery,
} from 'src/services/DealerSchemeService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealerSchemeListing from './DealerSchemeListing'

import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const ListDealerSchemeTabWrapper = () => {
    useUnmountCleanup()
    const [showDropdown, setShowDropdown] = useState(false)

    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerSchemeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = dealerSchemeState

    const navigate = useNavigate()
    const { items } = useGetCustomListingData<DealersSchemeListResponse>({
        useEndPointHook: useGetDealerSchemeQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['schemeName'],
            page: page,
            filterBy: [
                {
                    fieldName: 'dealerId',
                    value: dealerId,
                },
            ],
            dateFilter: {},
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.25_0.25_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                >
                    <>
                        {/* ACTION_DEALER_DEALER_SCHEME_EDIT */}
                        {isAuthorized(
                            UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_EDIT
                        ) && (
                            <button
                                onClick={() => {
                                    navigate(
                                        `/dealers/${dealerId}/scheme/edit/${row?._id}`
                                    )
                                }}
                                className="block w-full text-left px-2 py-1  hover:bg-gray-100"
                            >
                                Edit
                            </button>
                        )}
                    </>
                </ActionPopup>
            ),
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_SCHEME_LIST_SCHEME_NAME,
            renderCell: (row: DealersSchemeListResponse) => (
                <span> {row.schemeName} </span>
            ),
        },

        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[0.25_0.25_0%]',
            name: UserModuleNameTypes.DEALER_SCHEME_LIST_SCHEME_PRICE,
            renderCell: (row: DealersSchemeListResponse) => {
                return <span> {row.price} </span>
            },
        },
        {
            field: 'details',
            headerName: 'Available Pincode',
            flex: 'flex-[2_2_0%]',
            name: UserModuleNameTypes.DEALER_SCHEME_LIST_AVAILABLE_PINCODE,
            renderCell: (row: DealersSchemeListResponse) => (
                <Stack direction="row" spacing={1}>
                    {row?.pincodes?.map((ele, index) => {
                        if (index < 6) {
                            return (
                                <Chip
                                    key={index}
                                    label={ele}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        }
                        if (index === 10) {
                            return (
                                <Chip
                                    key={index}
                                    label={'...'}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        } else {
                            return null
                        }
                    })}
                </Stack>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.DEALER_SCHEME_LIST_SCHEME_STATUS,
            renderCell: (row: DealersSchemeListResponse) => {
                return (
                    <span className="block w-full text-left px-2 py-1 cursor-pointer">
                        {isAuthorized(
                            UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME_STATUS_ACTIVE_DEACTIVE
                        ) ? (
                            row.isActive ? (
                                <Chip
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Deactive Scheme',
                                            text: `Do you want to ${
                                                row.isActive
                                                    ? 'Deactive'
                                                    : 'Active'
                                            }`,
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleDeactive(row?._id)
                                                    : setShowDropdown(false)
                                            },
                                        })
                                    }}
                                    className="cursor-pointer"
                                    label="Active"
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                />
                            ) : (
                                <Chip
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Deactive Scheme',
                                            text: `Do you want to ${
                                                row.isActive
                                                    ? 'Deactive'
                                                    : 'Active'
                                            }`,
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleDeactive(row?._id)
                                                    : setShowDropdown(false)
                                            },
                                        })
                                    }}
                                    className="cursor-pointer"
                                    label="Deactive"
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        ) : (
                            <Chip
                                className="cursor-pointer"
                                label={row.isActive ? 'Active' : 'Deactive'}
                                color={row.isActive ? 'success' : 'error'}
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </span>
                )
            },
        },
    ]

    const [deactiveDealerScheme] = useDeactiveDealerSchemeMutation()

    const handleDeactive = (rowId: string) => {
        setShowDropdown(false)
        deactiveDealerScheme(rowId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Status changed successfully!')
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
            <DealerSchemeListing columns={columns} rows={items} />
        </>
    )
}

export default ListDealerSchemeTabWrapper
