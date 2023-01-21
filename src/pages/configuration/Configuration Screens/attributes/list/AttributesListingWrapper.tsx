import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AttributesListResponse } from "src/models/Attrbutes.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import AttributesListing from "./AttributesListing";

const columns: columnTypes[] = [
    {
        field: "attributeName",
        headerName: "Attribute Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: AttributesListResponse) => <span> {row.attributeName} </span>,
    },
    {
        field: "attributeType",
        headerName: "Attribute Type",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: AttributesListResponse) => {
            return <span className="text-primary-main "> {row.attributeType} </span>;
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
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

];

const AttributesListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const { page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "attributeName", "mobile"],
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
                <AttributesListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default AttributesListingWrapper;
