/// ==============================================
// Filename:InwardCompanyTabsListingWrapper.tsx
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
import { InwardRequestCompanyListResponse } from 'src/models/InwardRequest.model'
// import { useGetVendorsQuery } from "src/services/VendorServices";
import InwardRequestListing from './InwardCompanyTabs'
import { HiDotsHorizontal } from 'react-icons/hi'

// |-- Redux --|
// import {
//   setIsTableLoading,
//   setItems,
//   setTotalItems,
// } from "src/redux/slices/InwardRequestSlice";
// import { AppDispatch, RootState } from "src/redux/store";

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const columns: columnTypes[] = [
    {
        field: 'companyName',
        headerName: 'Company Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestCompanyListResponse) => (
            <span> {row.companyName} </span>
        ),
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestCompanyListResponse) => (
            <span> {row.productName} </span>
        ),
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: InwardRequestCompanyListResponse) => (
            <span> {row.quantity} </span>
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: InwardRequestCompanyListResponse) => {
            return <span> {row.address} </span>
        },
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: InwardRequestCompanyListResponse) => {
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
        companyName: 'Telemart',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 1,
    },

    {
        companyName: '',
        productName: 'Herbal Black Oil',
        quantity: '500',
        address: '',
        creationDate: '',
        _id: 2,
    },

    {
        companyName: '',
        productName: 'Har jod',
        quantity: '200',
        address: '',
        creationDate: '',
        _id: 3,
    },

    {
        companyName: '',
        productName: 'tribal oil',
        quantity: '400',
        address: '',
        creationDate: '',
        _id: 4,
    },
    {
        companyName: '',
        productName: 'Dhua Dhar',
        quantity: '600',
        address: '',
        creationDate: '',
        _id: 5,
    },

    {
        companyName: 'Saptel',
        productName: 'Alco ban',
        quantity: '1000',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 6,
    },

    {
        companyName: '',
        productName: 'Dhua Dhar',
        quantity: '456',
        address: '',
        creationDate: '',
        _id: 7,
    },

    {
        companyName: 'India Mart',
        productName: 'Alco ban',
        quantity: '468',
        address: '123 Warehouse, Indore',
        creationDate: '21-07-2023',
        _id: 8,
    },

    {
        companyName: '',
        productName: 'Herbal oil',
        quantity: '100',
        address: '',
        creationDate: '',
        _id: 9,
    },

    {
        companyName: 'Sapthrishi herbals',
        productName: '',
        quantity: '70',
        address: '',
        creationDate: '',
        _id: 10,
    },
]

const InwardCompanyTabsListingWrapper = () => {
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

export default InwardCompanyTabsListingWrapper
