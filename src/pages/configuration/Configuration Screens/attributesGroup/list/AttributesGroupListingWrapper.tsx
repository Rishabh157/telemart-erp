import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AttributesGroupListResponse } from "src/models/AttrbutesGroup.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/redux/slices/vendorSlice";
// import { AppDispatch, RootState } from "src/redux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import AttributesGroupListing from "./AttributesGroupListing";

const columns: columnTypes[] = [
    {
        field: "groupName",
        headerName: "Group Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: AttributesGroupListResponse) => <span> {row.groupName} </span>,
    },
    {
        field: "attribute",
        headerName: "Attribute ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: AttributesGroupListResponse) => {
            return <span > {row.attribute} </span>;
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
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 1
    },

    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 2
    },
    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 3
    },

    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 4
    },
    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
         _id : 5,
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        _id : 6,
        state: "M.P.",
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        _id : 7,
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 8,
    },
    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
         _id : 9,
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
    },

    {
        firstName: "Himanshu",
        groupName: "red",
        attribute: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 10,
    },
];

const AttributesGroupListingWrapper = () => {
    // const vendorState: any = useSelector((state: RootState) => state.vendor);

    // const { page, rowsPerPage } = vendorState;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "groupName", "mobile"],
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
                <AttributesGroupListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default AttributesGroupListingWrapper;
