/// ==============================================
// Filename:DealersRatioListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetInquiryQuery } from 'src/services/InquiryService'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

// |-- Redux --|
import { FaExclamation } from 'react-icons/fa'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import { DealersRatioListResponse } from 'src/models'
import { RootState } from 'src/redux/store'
import AddDealersRatioWapper from '../add/AddDealersRatioWapper'
import DealerRatioListing from './DealerRatioListing'

const DealersRatioListingWrapper = () => {
    const [isOpenDialog, setIsOpenDialog] = React.useState(false)

    const inquiryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { page, rowsPerPage, searchValue, filterValue } = inquiryState

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { items } = useGetCustomListingData<DealersRatioListResponse>({
        useEndPointHook: useGetInquiryQuery({
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
        }),
    })

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
