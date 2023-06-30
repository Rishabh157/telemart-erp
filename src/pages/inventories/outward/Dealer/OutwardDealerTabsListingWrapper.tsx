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
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { OutwardRequestListResponse } from 'src/models/OutwardRequest.model'
// import { useGetVendorsQuery } from "src/services/VendorServices";
import OutwardRequestListing from './OutwardDealerTabs'

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
        field: 'productName',
        headerName: 'Product Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestListResponse) => (
            <span> {row.productName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestListResponse) => (
            <span> {row.quantity} </span>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OutwardRequestListResponse) => {
            return <span> {row.address} </span>
        },
    },
    // {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     flex: 'flex-[0.5_0.5_0%]',
    //     renderCell: (row: any) => (
    //         <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
    //             {' '}
    //             <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
    //         </button>
    //     ),
    //     align: 'end',
    // },
]

const rows = [
    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 1,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 2,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 3,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 4,
    },
    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 5,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 6,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 7,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 8,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 9,
    },

    {
        productName: 'Slim24',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        mobile: '8574859685',
        _id: 10,
    },
]



const OutwardDealerTabsListingWrapper = () => {
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
                <OutwardRequestListing
                    columns={columns}
                    rows={rows}
                />
            {/* </SideNavLayout> */}
        </>
    )
}

export default OutwardDealerTabsListingWrapper
