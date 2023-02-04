import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-456001ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { PurchaseOrderListResponse } from "src/models/PurchaseOrder.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import PurchaseOrderListing from "./PurchaseOrderListing";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/456001ux/slices/vendorSlice";
// import { AppDispatch, RootestimateDeliveryDate } from "src/456001ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";

const columns: columnTypes[] = [
    {
        field: "poCode",
        headerName: "PO Code",
        flex: "flex-[1_1_0%]",
        renderCell: (row: PurchaseOrderListResponse) => <span> {row.poCode} </span>,
    },
    {
        field: "itemName",
        headerName: "Item Name",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: PurchaseOrderListResponse) => {
            return <span> {row.itemName} </span>;
        },
    },
    {
        field: "quantity",
        headerName: "Qnty.",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: PurchaseOrderListResponse) => {
            return <span> {row.quantity} </span>;
        },
    },
    {
        field: "price",
        headerName: "Price",  
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: PurchaseOrderListResponse) => {
            return <span> {row.price} </span>;
        },
    },
    {
        field: "vendor",
        headerName: "Vendor",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: PurchaseOrderListResponse) => {
            return <span> {row.vendor} </span>;
        },
    },
    {
        field: "estimateDeliveryDate",
        headerName: "Est. Delivery Date",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: PurchaseOrderListResponse) => {
            return <span> {row.estimateDeliveryDate} </span>;
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
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        _id : 1, 
        barcode: "8574859685",
    },

    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        _id : 2,
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
    },
    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 3,
    },

    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 4,
    },
    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        _id : 5,
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
    },

    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 6
    },
    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 7
    },

    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 8
    },
    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 9
    },

    {
        quantity: "12",
        poCode: "456001",
        itemName: "Alcoban",
        price : "1200",
        vendor: "Himanshu",
        estimateDeliveryDate: "12 Dec 23",
        barcode: "8574859685",
        _id : 10
    },
];

const PurchaseOrderListingWrapper = () => {
    // const vendorestimateDeliveryDate: any = useSelector((estimateDeliveryDate: RootestimateDeliveryDate) => estimateDeliveryDate.vendor);

    // const { page, rowsPerPage } = vendorestimateDeliveryDate;

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
    //     isPaginationRequi456001: true,
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
                <PurchaseOrderListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default PurchaseOrderListingWrapper;
