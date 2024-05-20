/// ==============================================
// Filename:InwardEcomTabsListingWrapper.tsx
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
import { InwardRequestEcomListResponse } from 'src/models/InwardRequest.model'
// import { useGetVendorsQuery } from "src/services/VendorServices";
import InwardRequestListing from './InwardEcomTabs'
import { HiDotsHorizontal } from 'react-icons/hi'

// |-- Redux --|
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/IntwardRequestSlice";
// import { AppDispatch, RootState } from "src/redux/store";

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const columns: columnTypes[] = [
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
    },
    {
        field: 'ecomName',
        headerName: 'Ecommerce Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestEcomListResponse) => (
            <span> {row.ecomName} </span>
        ),
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestEcomListResponse) => (
            <span> {row.productName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestEcomListResponse) => (
            <span> {row.quantity} </span>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: InwardRequestEcomListResponse) => {
            return <span> {row.address} </span>
        },
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: InwardRequestEcomListResponse) => {
            return <span> {row.creationDate} </span>
        },
    },
]

const rows = [
    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 1,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 2,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 3,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 4,
    },
    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 5,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 6,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 7,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 8,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 9,
    },

    {
        ecomName: 'Amozon',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 10,
    },
]

const InwardEcomTabsListingWrapper = () => {
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
            <InwardRequestListing columns={columns} rows={rows} />
            {/* </SideNavLayout> */}
        </>
    )
}

export default InwardEcomTabsListingWrapper
