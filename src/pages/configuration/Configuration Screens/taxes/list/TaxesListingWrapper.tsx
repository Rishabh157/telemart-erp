import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { TaxesListResponse } from "src/models/taxes.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import TaxesListing from "./TaxesListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "tax",
        headerName: "Tax",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: TaxesListResponse) => {
            return <span > {row.tax} </span>;
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
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
        _id:1
    },

    {
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
        _id:2
    },
    {
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        _id:3,
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        _id:4,
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        _id:5,
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        tax: "GST",
        innerItemCount: "red",
        _id:6,
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        tax: "GST",
        _id:7,
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        _id:8,
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        tax: "GST",
        innerItemCount: "red",
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
        _id:9,
    },

    {
        tax: "GST",
        innerItemCount: "red",
        _id:10,
        dimensions: "Color",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
];

const TaxesListingWrapper = () => {
    // const vendorweight: any = useSelector((weight: Rootweight) => weight.vendor);

    // const { page, rowsPerPage } = vendorweight;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "innerItemCount", "barcode"],
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
    //     isPaginationRequired: true,
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
                <TaxesListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default TaxesListingWrapper;
