import React, { useState, useEffect } from 'react'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { renderorderStatus } from 'src/utils/renderOrderStatus'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { InquiryListResponse } from 'src/models'
import { useGetInquiryQuery } from 'src/services/InquiryService'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setRowsPerPage,
    setIsTableLoading,
    setItems,
    setPage,
    setSearchValue,
    setTotalItems,
    //setFilterValue,
} from 'src/redux/slices/inquirySlice'
import { useNavigate } from 'react-router-dom'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

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

    const { page, rowsPerPage, searchValue, items, filterValue, totalItems,isTableLoading } =
        inquiryState

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
            renderCell: (row: InquiryListResponse) => (
                <span> {row.didNo} </span>
            ),
        },

        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: InquiryListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },
        {
            field: 'batchNo',
            headerName: 'Batch Assigned',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: InquiryListResponse) => {
                return renderorderStatus(row.batchNo?.length)
            },
        },
        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[2_2_0%]',
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
            renderCell: (row: InquiryListResponse) => (
                <span className="text-primary-main "> {row.discount} </span>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[1.5_1.5_0%]',
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
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(`/inquiry/view/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            View
                        </button>
                    </>
                </ActionPopup>
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
            <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
                <div className="flex justify-between items-center h-[45px]">
                    <ATMPageHeading> Inquiry</ATMPageHeading>
                </div>

                <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
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
                        isFilter
                        // isRefresh
                        // onFilterDispatch={() => dispatch(setFilterValue([]))}
                    />

                    {/* Table */}
                    <div className="grow overflow-auto  ">
                        <ATMTable
                            columns={columns}
                            rows={items}
                            isCheckbox={true}
                            selectedRows={selectedRows}
                            onRowSelect={(selectedRows) =>
                                setSelectedRows(selectedRows)
                            }
                            isLoading={isTableLoading}

                        />
                    </div>

                    <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
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
