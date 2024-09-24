// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

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

    // Helper function to check if any value is present
    const shouldSkipApi = Object.values(filerDealerServiceability).some(
        (value) => value !== null && value !== undefined
    );

    const { page, rowsPerPage } = dealerInventoryState

    console.log('shouldSkipApi: ', shouldSkipApi);
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
            },
            {
                skip: !shouldSkipApi, // Skip the query if any value is present
            }
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
            headerName: 'Pincodes',
            flex: 'flex-[1_5_0%]',
            renderCell: renderCell,
        },
        {
            field: 'dealerName',
            headerName: 'Dealer Name',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => (
                <div className='text-center'>
                    {row?.dealerName} <br />
                    <span className='text-primary-main'>
                        ( {row?.dealerCode} )
                    </span>
                </div>
            )
        },
        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1_5_0%]',
            renderCell: (row: any) => <span>{row?.schemeName}</span>,
        },
    ]

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
