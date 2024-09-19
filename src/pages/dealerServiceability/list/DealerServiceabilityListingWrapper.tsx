// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
// import { useGetDealersInventoryQuery } from 'src/services/BarcodeService'

// |-- Redux --|
import Chip from '@mui/material/Chip'

import { useState } from 'react'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { useGetCheckServiceabilityQuery } from 'src/services/DealerSchemeService'
import DealerServiceabilityListing from './DealerServiceabilityListing'

type DealerServiceabilityListingWrapperTypes = {
    count: number
    firstDocument: {
        _id: string
        productGroupId: string
        barcodeNumber: string
        outerBoxbarCodeNumber: string | null
        cartonBoxId: string | null
        barcodeGroupNumber: string
        lotNumber: string
        isUsed: boolean
        wareHouseId: string
        vendorId: string | null
        dealerId: string
        status: string
        companyId: string
        isDeleted: boolean
        isActive: boolean
        __v: number
        createdAt: string
        updatedAt: string
        productGroupLabel: string
        wareHouseLabel: string
    }
    productGroupId: string
}

const DealerServiceabilityListingWrapper = () => {
    // Hooks
    useUnmountCleanup()

    const dealerInventoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const [filerDealerServiceability, setFilerDealerServiceability] = useState({
        pincode: null,
        dealerId: null,
        schemeId: null,
    })
    const { page, rowsPerPage } = dealerInventoryState

    // pagination api
    const { items } = useGetCustomListingData<
        DealerServiceabilityListingWrapperTypes[]
    >({
        useEndPointHook: useGetCheckServiceabilityQuery(
            {
                query: {
                    limit: rowsPerPage,
                    page: page,
                },
                body: {
                    ...filerDealerServiceability,
                },
            }
            // {
            //     skip: !filerDealerServiceability, // Skip the query if `selectedDealer` is false
            // }
        ),
    })

    const renderCell = (row: any) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {row?.pincodes?.map((ele: any, index: any) => (
                <Chip
                    key={index}
                    label={ele}
                    color="primary"
                    variant="outlined"
                    size="small"
                    style={{ margin: '4px' }} // Optional: add margin for spacing
                />
            ))}
        </div>
    )

    const columns: columnTypes[] = [
        {
            field: 'pincode',
            headerName: 'pincodes',
            flex: 'flex-[1_5_0%]',
            renderCell: renderCell,

            // (row: any) => (
            //     <WrappedStack direction="row" spacing={1}>
            //     {row?.pincodes?.map((ele: any, index: any) => (
            //         <PincodeChip
            //             key={index}
            //             label={ele}
            //             color="primary"
            //             variant="outlined"
            //             size="small"
            //         />
            //     ))}
            // </WrappedStack>
            // ),
        },
        {
            field: 'dealerCode',
            headerName: 'Dealer Code',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => <span>{row?.dealerCode}</span>,
        },
        {
            field: 'dealerName',
            headerName: 'dealerName',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => <span>{row?.dealerName}</span>,
        },
        {
            field: 'schemeName',
            headerName: 'scheme Name',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => <span>{row?.schemeName}</span>,
        },
    ]

    console.log('items', items)

    return (
        <SideNavLayout>
            <DealerServiceabilityListing
                columns={columns}
                rows={items || []}
                setFilerDealerServiceability={setFilerDealerServiceability}
                filerDealerServiceability={filerDealerServiceability}
            />
        </SideNavLayout>
    )
}

export default DealerServiceabilityListingWrapper
