/// ==============================================
// Filename:InquiryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { InquiryListResponse } from 'src/models'
import { useGetInquiryQuery } from 'src/services/InquiryService'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setTotalItems,
} from 'src/redux/slices/inquirySlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { isAuthorized } from 'src/utils/authorization'

const InquiryListingWrapper = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const inquiryState: any = useSelector((state: RootState) => state.inquiry)
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const {
        page,
        rowsPerPage,
        searchValue,
        items,
        filterValue,
        totalItems,
        isTableLoading,
    } = inquiryState

    const { data, isLoading, isFetching } = useGetInquiryQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['inquiryNumber'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'dispositionLevelThreeId',
                value: filterValue,
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
    }, [isLoading, isFetching, data, dispatch])

    const columns: columnTypes[] = [
        {
            field: 'inquiryNumber',
            headerName: 'Inquiry No',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_INQUIRY_NUMBER,
            renderCell: (row: InquiryListResponse) => (
                <span className="text-primary-main ">
                    # {row.inquiryNumber}{' '}
                </span>
            ),
        },
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_DID_NUMBER,
            renderCell: (row: InquiryListResponse) => (
                <span> {row.didNo} </span>
            ),
        },

        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_MOBILE_NUMBER,
            renderCell: (row: InquiryListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },

        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[2_2_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_,
            renderCell: (row: InquiryListResponse) => (
                <span className="text-primary-main ">
                    {' '}
                    {row.deliveryCharges}{' '}
                </span>
            ),
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[2_2_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_DISCOUNT,
            renderCell: (row: InquiryListResponse) => (
                <span className="text-primary-main "> {row.discount} </span>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.NAV_INQUIRY_LIST_TOTAL,
            renderCell: (row: InquiryListResponse) => (
                <span className="text-slate-800"> &#8377; {row.total} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView={isAuthorized(UserModuleNameTypes.ACTION_NAV_INQUIRY_VIEW)}
                    handleViewActionButton={() => {
                        navigate(`/inquiry/view/${currentId}`)
                    }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                />
            ),
            align: 'end',
        },
    ]

    // const handleDelete = () => {
    //     setShowDropdown(false)
    //     // deleteOrdercurrentId).then((res) => {
    //     //     if ('data' in res) {
    //     //         if (res?.data?.status) {
    //     //             showToast('success', 'Order deleted successfully!')
    //     //         } else {
    //     //             showToast('error', res?.data?.message)
    //     //         }
    //     //     } else {
    //     //         showToast(
    //     //             'error',
    //     //             'Something went wrong, Please try again later'
    //     //         )
    //     //     }
    //     // })
    // }

    return (
        <SideNavLayout>
            <div className="px-4 h-[calc(100vh-55px)] ">
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading> Inquiry</ATMPageHeading>
                </div>

                <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                    {/*Table Header */}
                    <ATMTableHeader
                        searchValue={searchValue}
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                    // isFilter
                    // isRefresh
                    // onFilterDispatch={() => dispatch(setFilterValue([]))}
                    />

                    {/* Table */}
                    <div className="grow overflow-auto  ">
                        <ATMTable
                            columns={columns}
                            rows={items}
                            // isCheckbox={true}
                            selectedRows={selectedRows}
                            onRowSelect={(selectedRows) =>
                                setSelectedRows(selectedRows)
                            }
                            isLoading={isTableLoading}
                        />
                    </div>

                    <div className="h-[60px] flex items-center justify-end border-t border-slate-300">
                        <ATMPagination
                            page={page}
                            rowCount={totalItems}
                            rows={items}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(newPage) =>
                                dispatch(setPage(newPage))
                            }
                        />
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default InquiryListingWrapper
