import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { SchemeListResponse } from "src/models/scheme.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import SchemeListing from "./SchemeListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "schemeName",
        headerName: "Attribute Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: SchemeListResponse) => <span> {row.schemeName} </span>,
    },
    {
        field: "schemeCode",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span className="text-primary-main "> {row.schemeCode} </span>;
        },
    },
    {
        field: "category",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span className="text-primary-main "> {row.category} </span>;
        },
    },
    {
        field: "price",
        headerName: "Attribute Type",  
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span className="text-primary-main "> {row.price} </span>;
        },
    },
    {
        field: "subCategory",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: SchemeListResponse) => {
            return <span className="text-primary-main "> {row.subCategory} </span>;
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
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        category: "Himanshu",
        schemeName: "red",
        schemeCode: "Color",
        price : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

];

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
                <SchemeListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default SchemeListingWrapper;
