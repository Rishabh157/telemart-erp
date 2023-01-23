import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-123456ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ProductSubCategoryListResponse } from "src/models/ProductSubCategory.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/123456ux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/123456ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ProductSubCategoryListing from "./ProductSubCategoryListing";

const columns: columnTypes[] = [
    {
        field: "subCategoryCode",
        headerName: "Sub Category Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: ProductSubCategoryListResponse) => <span> {row.subCategoryCode} </span>,
    },
    {
        field: "parentCategory",
        headerName: "Parent Category ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductSubCategoryListResponse) => {
            return <span className="text-primary-main "> {row.parentCategory} </span>;
        },
    },
    {
        field: "subCategoryName",
        headerName: "Sub Category Name ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductSubCategoryListResponse) => {
            return <span className="text-primary-main "> {row.subCategoryName} </span>;
        },
    },
    {
        field: "applicableTaxes",
        headerName: "Applicable Taxes ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductSubCategoryListResponse) => {
            return <span className="text-primary-main "> {row.applicableTaxes} </span>;
        },
    },
    {
        field: "hsnCode",
        headerName: "HSN Code ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ProductSubCategoryListResponse) => {
            return <span className="text-primary-main "> {row.hsnCode} </span>;
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
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        subCategoryName: "Something",
        subCategoryCode: "123456",
        parentCategory: "Drink Stop",
        applicableTaxes: "GST",
        hsnCode: "1234",
        state: "M.P.",
        mobile: "8574859685",
    },

];

const ProductSubCategoryListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const { page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "subCategoryCode", "mobile"],
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
    //     isPaginationRequi123456: true,
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
                <ProductSubCategoryListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default ProductSubCategoryListingWrapper;
