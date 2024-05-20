// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { DealersPincodeListResponse } from 'src/models/DealerPinCode.model'
import {
    useDeleteDealerPincodeMutation,
    useGetDealerPincodeQuery,
} from 'src/services/DealerPincodeService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import DealerPincodeListing from './DealerPincodeListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const ListDealerPincodeTabWrapper = () => {
    useUnmountCleanup()

    const [showDropdown, setShowDropdown] = useState(false)
    const params = useParams()
    const dealerId: any = params.dealerId
    const dealerPincodeState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = dealerPincodeState

    const [deleteDealerPincode] = useDeleteDealerPincodeMutation()

    // pagination api
    const { items } = useGetCustomListingData<DealersPincodeListResponse[]>({
        useEndPointHook: useGetDealerPincodeQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['pincode'],
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

    const handleDeletePincode = (id: string, pincode: string) => {
        setShowDropdown(false)
        deleteDealerPincode({ id, pincode }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Pincode deleted successfully!')
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
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                    }}
                    isDelete={isAuthorized(
                        UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE_DELETE
                    )}
                    handleDeleteActionButton={() => {
                        showConfirmationDialog({
                            title: 'Delete Pincode',
                            text: 'Do you want to Delete',
                            showCancelButton: true,
                            next: (res: any) => {
                                return res.isConfirmed
                                    ? handleDeletePincode(row._id, row.pincode)
                                    : setShowDropdown(false)
                            },
                        })
                    }}
                >
                    {/* <button
                        onClick={() => {
                            showConfirmationDialog({
                                title: 'Delete Pincode',
                                text: 'Do you want to Delete',
                                showCancelButton: true,
                                next: (res: any) => {
                                    return res.isConfirmed
                                        ? handleDeletePincode(
                                              row._id,
                                              row.pincode
                                          )
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Delete
                    </button> */}
                </ActionPopup>
            ),
        },
        {
            field: 'Pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: DealersPincodeListResponse) => (
                <span> {row.pincode} </span>
            ),
        },

        {
            field: 'estTime',
            headerName: 'Estimated Time (in Min.)',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: DealersPincodeListResponse) => {
                return <span> {row.estTime} </span>
            },
        },
    ]

    return <DealerPincodeListing columns={columns} rows={items} />
}

export default ListDealerPincodeTabWrapper
