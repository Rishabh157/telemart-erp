import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { CartonBoxListResponse } from "src/models/CartonBox.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import CartonBoxListing from "./CartonBoxListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "boxName",
        headerName: "Box Name",  
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: CartonBoxListResponse) => {
            return <span > {row.boxName} </span>;
        },
    },
     {
        field: "innerItemCount",
        headerName: "Inner Items Count",
        flex: "flex-[1_1_0%]",
        renderCell: (row: CartonBoxListResponse) => <span> {row.innerItemCount} </span>,
    },
    {
        field: "dimensions",
        headerName: "Dimensions",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: CartonBoxListResponse) => {
            return <span > {row.dimensions} </span>;
        },
    },
    {
        field: "boxWeight",
        headerName: "Box Weight (in gm's)",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: CartonBoxListResponse) => {
            return <span > {row.boxWeight} </span>;
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
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
        _id :1
    },

    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
        _id :2
    },
    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
        _id :3
    },

    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        _id :4,
        barcode: "8574859685",
    },
    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        _id :5,
        weight: "100",
        barcode: "8574859685",
    },

    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        _id :6,
        weight: "100",
        barcode: "8574859685",
    },
    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
        _id :7
    },

    {
        boxWeight: "100",
        innerItemCount: "4454",
        _id :8,
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
    },
    {
        boxWeight: "100",
        innerItemCount: "4454",
        _id :9,
        dimensions: "10 * 10 * 10",
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
    },

    {
        boxWeight: "100",
        innerItemCount: "4454",
        dimensions: "10 * 10 * 10",
        _id :10,
        boxName : "Item Box",
        subCategory: "Mandsaur",
        weight: "100",
        barcode: "8574859685",
    },

];

const CartonBoxListingWrapper = () => {
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
                <CartonBoxListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default CartonBoxListingWrapper;
