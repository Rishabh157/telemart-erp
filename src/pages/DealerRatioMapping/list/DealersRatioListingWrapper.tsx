/// ==============================================
// Filename:InquiryListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, {
    useEffect,
    // useState
} from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetInquiryQuery } from 'src/services/InquiryService'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
    //setFilterValue,
} from 'src/redux/slices/inquirySlice'
import DealerRatioListing from './DealerRatioListing'
import { DealersRatioListResponse } from 'src/models'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddDealersRatioWapper from '../add/AddDealersRatioWapper'
import { FaExclamation } from 'react-icons/fa'

const DealersRatioListingWrapper = () => {
    // Hooks
    // const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenDialog, setIsOpenDialog] = React.useState(false)

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
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <span className="text-primary-main ">{row.pincode}</span>
            ),
        },
        {
            field: 'dealerCount',
            headerName: 'Dealer Count',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: DealersRatioListResponse) => (
                <>
                    <div
                        className="relative"
                        onClick={() => setIsOpenDialog(true)}
                    >
                        <span> {row.dealerCount} </span>
                        <button>
                            <FaExclamation />
                        </button>
                    </div>
                </>
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
            <SideNavLayout>
                <DealerRatioListing columns={columns} rows={rows} tabs={[]} />
                <DialogLogBox
                    isOpen={isOpenDialog}
                    buttonClass="cursor-pointer"
                    handleClose={() => {
                        setIsOpenDialog(false)
                    }}
                    component={
                        <AddDealersRatioWapper
                            id={'runState'}
                            setIsOpenDialog={setIsOpenDialog}
                        />
                    }
                />
            </SideNavLayout>
        </>
    )
}

export default DealersRatioListingWrapper
