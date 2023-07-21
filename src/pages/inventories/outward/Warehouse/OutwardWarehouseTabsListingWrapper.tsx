/// ==============================================
// Filename:OutwardWarehouseTabsListingWrapper.tsx
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
import { OutwardRequestWarehouseListResponse } from 'src/models/OutwardRequest.model'
// import { useGetVendorsQuery } from "src/services/VendorServices";
import OutwardRequestListing from './OutwardWarehouseTabs'
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
        field: 'warehouseName',
        headerName: 'Warehouse Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestWarehouseListResponse) => (
            <span> {row.warehouseName} </span>
        ),
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestWarehouseListResponse) => (
            <span> {row.productName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: OutwardRequestWarehouseListResponse) => (
            <span> {row.quantity} </span>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OutwardRequestWarehouseListResponse) => {
            return <span> {row.address} </span>
        },
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: OutwardRequestWarehouseListResponse) => {
            return <span> {row.creationDate} </span>
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
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 1,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 2,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 3,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 4,
    },
    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 5,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 6,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 7,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 8,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 9,
    },

    {
        warehouseName: 'Palda warehouse',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 10,
    },
]

const OutwardWarehouseTabsListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const {  page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //   limit: rowsPerPage,
    //   searchValue: "",
    //   params: ["quantityName", "quantityCode", "creationDate"21-07-2023
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

export default OutwardWarehouseTabsListingWrapper
