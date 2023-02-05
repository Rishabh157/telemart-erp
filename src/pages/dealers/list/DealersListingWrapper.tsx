import React, { useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { DealersListResponse } from "src/models/Dealer.model";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from "src/redux/slices/vendorSlice";
import { AppDispatch, RootState } from "src/redux/store";
import { useGetVendorsQuery } from "src/services/VendorServices";
import DealersListing from "./DealersListing";

const columns: columnTypes[] = [
    {
        field: "dealerCode",
        headerName: "Dealer Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: DealersListResponse) => <span> {row.dealerCode} </span>,
    },
    {
        field: "firmName",
        headerName: "Firm Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: DealersListResponse) => {
            return <span > {row.firmName} </span>;
        },
    },
    {
        field: "firstName",
        headerName: "First Name",
        flex: "flex-[1_1_0%]",
        renderCell: (row: DealersListResponse) => (
            <span > {row.firstName} </span>
        ),
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: DealersListResponse) => {
            return <span > {row.lastName} </span>;
        },
    },
    {
        field: "mobile",
        headerName: "Phone",
        flex: "flex-[1_1_0%]",
    },
    {
        field: "district",
        headerName: "District",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: DealersListResponse) => {
            return <span > {row.district} </span>;
        },
    },
    {
        field: "state",
        headerName: "State",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: DealersListResponse) => {
            return <span > {row.state} </span>;
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
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 1
    },

    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 2
    },
    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 3

    },

    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 4
    },
    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 5
    },

    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 6
    },
    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 7
    },

    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 8
    },
    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 9
    },

    {
        firstName: "Himanshu",
        dealerCode: "HJ108",
        firmName: "Codiotic",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 10
    },
];

const DealersListingWrapper = () => {
    const vendorState: any = useSelector((state: RootState) => state.vendor);

    const { page, rowsPerPage } = vendorState;

    const dispatch = useDispatch<AppDispatch>();
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetVendorsQuery({
        limit: rowsPerPage,
        searchValue: "",
        params: ["dealerName", "dealerCode", "mobile"],
        page: page,
        filterBy: [
            {
                fieldName: "",
                value: [],
            },
        ],
        dateFilter: {
            start_date: "",
            end_date: "",
            dateFilterKey: "",
        },
        orderBy: "createdAt",
        orderByValue: -1,
        isPaginationRequired: true,
    });

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false));
            dispatch(setItems(data || []));
            dispatch(setTotalItems(data?.totalItems || 4));
        } else {
            dispatch(setIsTableLoading(true));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data]);

    return (
        <>
            <SideNavLayout>
                <DealersListing columns={columns} rows={rows} />
            </SideNavLayout>
        </>
    );
};

export default DealersListingWrapper;
