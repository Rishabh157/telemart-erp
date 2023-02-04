import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react--ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ProductsListResponse } from "src/models/Products.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/-ux/slices/vendorSlice";
// import { AppDispatch, RootsubCategory } from "src/-ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ProductsListing from "./ProductsListing";

const columns: columnTypes[] = [
    {
        field: "productImage",
        headerName: "Product Image",
        flex: "flex-[1_1_0%]",
        renderCell: (row: ProductsListResponse) => <span> {row.productImage} </span>,
    },
    
    {
        field: "productCode",
        headerName: "Product Code ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductsListResponse) => {
            return <span > {row.productCode} </span>;
        },
    },
    {
        field: "productName",
        headerName: "Product Name ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductsListResponse) => {
            return <span > {row.productName} </span>;
        },
    },
    {
        field: "category",
        headerName: "Category  ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductsListResponse) => {
            return <span > {row.category} </span>;
        },
    },
    {
        field: "subCategory",
        headerName: "Sub Category  ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductsListResponse) => {
            return <span > {row.subCategory} </span>;
        },
    },
    {
        field: "weight ",
        headerName: "Weight (in gms) ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductsListResponse) => {
            return <span > {row.weight} </span>;
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
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 1
    },

    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 2
    },
    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 3
    },

    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 4
    },
    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 5
    },

    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 6
    },
    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 7
    },

    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 8
    },
    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 9
    },

    {
        firstName: "Himanshu",
        productImage: "-",
        productName: "DrinkStop",
        productCode: "123",
        category: "Something",
        subCategory: "Something",
        weight: "100",
        _id : 10
    },
  
];

const ProductsListingWrapper = () => {
    // const vendorsubCategory: any = useSelector((subCategory: RootsubCategory) => subCategory.vendor);

    // const { page, rowsPerPage } = vendorsubCategory;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "productImage", "weight"],
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
    //     isPaginationRequi-: true,
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
                <ProductsListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default ProductsListingWrapper;
