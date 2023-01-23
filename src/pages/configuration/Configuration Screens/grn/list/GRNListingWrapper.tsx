import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-515ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { GRNListResponse } from "src/models/GRN.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import GRNListing from "./GRNListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/515ux/slices/vendorSlice";
// import { AppDispatch, Rootweight } from "src/515ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "poCode",
        headerName: "PO Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: GRNListResponse) => <span> {row.poCode} </span>,
    },
    {
        field: "itemName",
        headerName: "Item Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: GRNListResponse) => {
            return <span className="text-primary-main "> {row.itemName} </span>;
        },
    },
    {
        field: "receivingQuantity",
        headerName: "Recieving Qnty.",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: GRNListResponse) => {
            return <span className="text-primary-main "> {row.receivingQuantity} </span>;
        },
    },
    {
        field: "goodQuantity",
        headerName: "Good Qnty.",  
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: GRNListResponse) => {
            return <span className="text-primary-main "> {row.goodQuantity} </span>;
        },
    },
    {
        field: "defectiveQuantity",
        headerName: "Defective Qnty.",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: GRNListResponse) => {
            return <span className="text-primary-main "> {row.defectiveQuantity} </span>;
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
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },
    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

    {
        receivingQuantity: "100",
        poCode: "515",
        itemName: "Something",
        goodQuantity : "10000",
        defectiveQuantity: "0",
        weight: "M.P.",
        barcode: "8574859685",
    },

];

const GRNListingWrapper = () => {
    // const vendorweight: any = useSelector((weight: Rootweight) => weight.vendor);

    // const { page, rowsPerPage } = vendorweight;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "poCode", "barcode"],
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
    //     isPaginationRequi515: true,
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
                <GRNListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default GRNListingWrapper;
