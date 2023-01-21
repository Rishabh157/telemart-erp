import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ItemListResponse } from "src/models/Item.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ItemListing from "./ItemListing";

const columns: columnTypes[] = [
    {
        field: "itemImage",
        headerName: "Attribute Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: ItemListResponse) => <span> {row.itemImage} </span>,
    },
    {
        field: "itemCode",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.itemCode} </span>;
        },
    },
    {
        field: "itemName",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.itemName} </span>;
        },
    },
    {
        field: "category",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.category} </span>;
        },
    },
    {
        field: "subCategory",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.subCategory} </span>;
        },
    },
    {
        field: "weight",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.weight} </span>;
        },
    },
    {
        field: "barcode",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ItemListResponse) => {
            return <span className="text-primary-main "> {row.barcode} </span>;
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
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        itemName: "Himanshu",
        itemImage: "red",
        itemCode: "Color",
        category: "Jain",
        subCategory: "Mandsaur",
        weight: "M.P.",
        barcode: "8574859685",
    },

];

const ItemListingWrapper = () => {
    // const vendorweight: any = useSelector((weight: Rootweight) => weight.vendor);

    // const { page, rowsPerPage } = vendorweight;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "itemImage", "barcode"],
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
                <ItemListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default ItemListingWrapper;
