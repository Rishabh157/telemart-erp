import React,{useEffect}from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { TaxesListResponse } from "src/models/taxes.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import TaxesListing from "./TaxesListing";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetTaxesQuery } from "src/services/TaxesService";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from "src/redux/slices/vendorSlice";


const TaxesListingWrapper = () => {
     const taxState: any = useSelector((state: RootState) => state.tax);

    const { page, rowsPerPage ,items} = taxState;

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetTaxesQuery({
        limit: rowsPerPage,
        searchValue: "",
        params: ["tax"],
        page: page,
        filterBy: [
            {
                fieldName: "",
                value: [],
            },
        ],
        dateFilter: {},
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
    const columns: columnTypes[] = [
        {
            field: "tax",
            headerName: "Tax",
            flex: "flex-[1.5_1.5_0%]",
            renderCell: (row: TaxesListResponse) => {
                return <span > {row.tax} </span>;
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
    
    
    return (
        <>
            <ConfigurationLayout>
                <TaxesListing columns={columns} rows={items} />
            </ConfigurationLayout>
        </>
    );
};

export default TaxesListingWrapper;
