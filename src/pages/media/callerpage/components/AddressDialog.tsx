/// ==============================================
// Filename:AddressDialog.tsx
// Type: List Component
// Last Updated: SEPTEMBER 25, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetInquiryUnAuthQuery } from 'src/services/InquiryService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
    //setFilterValue,
} from 'src/redux/slices/inquirySlice'
import { DealersRatioListResponse } from 'src/models'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import CallerButton from './CallerButton'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

type AddressDialogTypes = {
    isShow: boolean
    onClose: () => void
}

const AddressDialog = ({ isShow, onClose }: AddressDialogTypes) => {
    // const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    // const [selectedRows, setSelectedRows] = useState([])
    // const [currentId, setCurrentId] = useState('')
    // const [showDropdown, setShowDropdown] = useState(false)

    const inquiryState: any = useSelector((state: RootState) => state.inquiry)
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const {
        page,
        rowsPerPage,
        searchValue,
        // items,
        filterValue,
        // totalItems,
        // isTableLoading,
    } = inquiryState

    const { data, isLoading, isFetching } = useGetInquiryUnAuthQuery({
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
            field: 'state',
            headerName: 'State',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'district',
            headerName: 'District',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'taluk',
            headerName: 'Taluk',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'post',
            headerName: 'Post',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     flex: 'flex-[1_5_0%]',
        //     renderCell: (row: DealersRatioListResponse) => (
        //         // <span> {row.mobileNo} </span>
        //     ),
        // },
    ]

    const rows: any = [
        {
            pincode: '452009',
            dealerCount: '3',
        },
        {
            pincode: '452002',
            dealerCount: '3',
        },
        {
            pincode: '452001',
            dealerCount: '3',
        },
        {
            pincode: '452008',
            dealerCount: '3',
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
        <>
            <DialogLogBox
                isOpen={isShow}
                buttonClass="cursor-pointer"
                maxWidth="sm"
                handleClose={onClose}
                component={
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="col-span-6">
                                <ATMTextField
                                    label="State"
                                    placeholder="Enter State"
                                    size="small"
                                    name="state"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="District"
                                    placeholder="Enter City"
                                    size="small"
                                    name="district"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Taluk/Tehsil"
                                    placeholder="Enter Taluk"
                                    size="small"
                                    name="taluk"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Area"
                                    placeholder="Enter Area"
                                    size="small"
                                    name="area"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-6">
                                <ATMTextField
                                    label="Pincode"
                                    placeholder="Enter Pincode"
                                    size="small"
                                    name="pincode"
                                    value={''}
                                    onChange={(e) => {
                                        // setPinCodeSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-span-2 pt-2 flex justify-center items-end">
                                <CallerButton
                                    text="Search"
                                    type="button"
                                    className="text-[12px] py-[9px]"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                        <div className="grow overflow-auto mt-4 border-[1px] border-slate-200">
                            <ATMTable
                                columns={columns}
                                rows={rows}
                                // isCheckbox={true}
                                // selectedRows={selectedRows}
                                // onRowSelect={(selectedRows) =>
                                //     setSelectedRows(selectedRows)
                                // }
                                // setShowDropdown={setShowDropdown}
                            />
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default AddressDialog
