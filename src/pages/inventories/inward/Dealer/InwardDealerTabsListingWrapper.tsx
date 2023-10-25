/// ==============================================
// Filename:OutwardDealerTabsListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
// import { HiDotsHorizontal } from 'react-icons/hi'
// import { MdOutbond } from 'react-icons/md'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { OutwardRequestDealerListResponse } from 'src/models/OutwardRequest.model'
// import { useGetVendorsQuery } from "src/services/VendorServices";
import OutwardRequestListing from './InwardDealerTabs'
import { HiDotsHorizontal } from 'react-icons/hi'

// |-- Redux --|
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/OutwardRequestSlice";
// import { AppDispatch, RootState } from "src/redux/store";

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const columns: columnTypes[] = [
    {
        field: 'dealerName',
        headerName: 'Dealer Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestDealerListResponse) => (
            <span> {row.dealerName} </span>
        ),
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestDealerListResponse) => (
            <span> {row.accApproved} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestDealerListResponse) => (
            <span> {row.accApprovedAt} </span>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OutwardRequestDealerListResponse) => {
            return <span> {row.accApproved} </span>
        },
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OutwardRequestDealerListResponse) => {
            return <span> {row.createdAt} </span>
        },
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                {' '}
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
            </button>
        ),
        align: 'end',
    },
]

const rows = [
    {
        dealerName: 'Akash Gupta',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 1,
    },

    {
        dealerName: '',
        productName: 'Herbal Black Oil',
        quantity: '500',
        address: '',
        creationDate: '',
        _id: 2,
    },

    {
        dealerName: '',
        productName: 'Har jod',
        quantity: '200',
        address: '',
        creationDate: '',
        _id: 3,
    },

    {
        dealerName: '',
        productName: 'tribal oil',
        quantity: '400',
        address: '',
        creationDate: '',
        _id: 4,
    },
    {
        dealerName: '',
        productName: 'Dhua Dhar',
        quantity: '600',
        address: '',
        creationDate: '',
        _id: 5,
    },

    {
        dealerName: 'Prateek lahoti',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 6,
    },

    {
        dealerName: '',
        productName: 'Dhua Dhar',
        quantity: '456',
        address: '',
        creationDate: '',
        _id: 7,
    },

    {
        dealerName: 'Rajesh Sharma',
        productName: 'Alco ban',
        quantity: '468',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 8,
    },

    {
        dealerName: '',
        productName: 'Herbal oil',
        quantity: '100',
        address: '',
        creationDate: '',
        _id: 9,
    },

    {
        dealerName: 'Tribal Black Oil',
        productName: '',
        quantity: '70',
        address: '',
        creationDate: '',
        _id: 10,
    },
]

const InwardDealerTabsListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const {  page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //   limit: rowsPerPage,
    //   searchValue: "",
    //   params: ["quantityName", "quantityCode", "mobile"],
    //   page: page,
    //   filterBy: [
    //     {
    //       fieldName: "",
    //       value: [],
    //     },
    //   ],
    //   dateFilter: {
    //     start_date: "",
    //     end_date: "",
    //     dateFilterKey: "",
    //   },
    //   orderBy: "createdAt",
    //   orderByValue: -1,
    //   isPaginationRequired: true,
    // });

    // useEffect(() => {
    //   if (!isFetching && !isLoading) {
    //     dispatch(setIsTableLoading(false));
    //     dispatch(setItems(data || []));
    //     dispatch(setTotalItems(data?.totalItems || 4));
    //   } else {
    //     dispatch(setIsTableLoading(true));
    //   }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoading, isFetching, data]);

    return (
        <>
            {/* <SideNavLayout> */}
            <OutwardRequestListing columns={columns} rows={rows} />
            {/* </SideNavLayout> */}
        </>
    )
}

export default InwardDealerTabsListingWrapper
