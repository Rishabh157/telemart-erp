import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-Alcobanux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ASRListResponse } from "src/models/ASR.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import ASRListing from "./ASRListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/Alcobanux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/Alcobanux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "itemName",
        headerName: "Item Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: ASRListResponse) => <span> {row.itemName} </span>,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ASRListResponse) => {
            return <span className="text-primary-main "> {row.quantity} </span>;
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
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        boxWeight: "Himanshu",
        itemName: "Alcoban",
        quantity: "12",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

];

const ASRListingWrapper = () => {
    // const vendorweight: any = useSelector((weight: Rootweight) => weight.vendor);

    // const { page, rowsPerPage } = vendorweight;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "itemName", "barcode"],
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
    //     isPaginationRequiAlcoban: true,
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
                <ASRListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default ASRListingWrapper;
