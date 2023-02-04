import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-Offerux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SchemeListResponse } from "src/models/scheme.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import SchemeListing from "./SchemeListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/Offerux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/Offerux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    
    {
        field: "schemeCode",
        headerName: "Scheme Code",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span > {row.schemeCode} </span>;
        },
    },
    {
        field: "schemeName",
        headerName: "Scheme Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: SchemeListResponse) => <span> {row.schemeName} </span>,
    },
    
    {
        field: "category",
        headerName: "Category",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span > {row.category} </span>;
        },
    },

    {
        field: "subCategory",
        headerName: "Sub Category",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span > {row.subCategory} </span>;
        },
    },
    {
        field: "price",
        headerName: "Price",  
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span > {row.price} </span>;
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: "flex-[0.5_0.5_0%]",
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                {" "}
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{" "}
            </button>
        ),
        align: "end",
    },
];

const rows = [
    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
        _id : 1
    },

    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        _id : 2,
        barcode: "8574859685",
    },
    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
        _id : 3
    },

    {
        category: "Chocolate",
        schemeName: "Offer",
        _id : 4,
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Chocolate",
        _id : 5,
       schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        _id : 6,
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        _id : 7,
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        _id : 8,
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        _id : 9,
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Chocolate",
        schemeName: "Offer",
        schemeCode: "off20",
        price : "200",
        subCategory: "Biscuits",
        weight: "M.P.",
        _id : 10,
        barcode: "8574859685",
    },];

const SchemeListingWrapper = () => {
    // const vendorweight: any = useSelector((weight: Rootweight) => weight.vendor);

    // const { page, rowsPerPage } = vendorweight;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "schemeName", "barcode"],
    //     page: page,
    //     filterBy: [
    //         {
    //             fieldName: "",
    //             value: [],
    //         },
    //     ],
    //     dateFilter: {
    //         start_date: "",
    //         end_date: "",
    //         dateFilterKey: "",
    //     },
    //     orderBy: "createdAt",
    //     orderByValue: -1,
    //     isPaginationRequiOffer: true,
    // });

    // useEffect(() => {
    //     if (!isFetching && !isLoading) {
    //         dispatch(setIsTableLoading(false));
    //         dispatch(setItems(data || []));
    //         dispatch(setTotalItems(data?.totalItems || 4));
    //     } else {
    //         dispatch(setIsTableLoading(true));
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoading, isFetching, data]);

    return (
        <>
            <ConfigurationLayout>
                <SchemeListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default SchemeListingWrapper;
