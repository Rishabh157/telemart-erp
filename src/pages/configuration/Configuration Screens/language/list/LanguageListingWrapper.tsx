import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-123456ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { LanguageListResponse } from "src/models/Language.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/123456ux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/123456ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import LanguageListing from "./LanguageListing";

const columns: columnTypes[] = [
    {
        field: "languageName",
        headerName: "Category Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: LanguageListResponse) => <span> {row.languageName} </span>,
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
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        languageName: "123456",
        categoryName: "Chips",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

];

const LanguageListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const { page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "languageName", "mobile"],
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
                <LanguageListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default LanguageListingWrapper;
