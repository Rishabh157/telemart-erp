import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
// import { useDispatch, useSelector } from "react--ux";
// import { useNavigate } from "react-router-dom";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { ConfigurationCompanyListResponse } from "src/models/ConfigurationCompany.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
// import {
//     setIsTableLoading,
//     setItems,
//     setTotalItems,
// } from "src/-ux/slices/vendorSlice";
// import { AppDispatch, Rootaddress } from "src/-ux/store";
// import { useGetVendorsQuery } from "src/services/VendorServices";
import ConfigurationCompanyListing from "./ConfigurationCompanyListing";

const columns: columnTypes[] = [
    {
        field: "logo",
        headerName: "Company Logo",
        flex: "flex-[1_1_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => <span> {row.logo} </span>,
    },
    {
        field: "company_name",
        headerName: "Company Name ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => {
            return <span className="text-primary-main "> {row.company_name} </span>;
        },
    },
    {
        field: "website_url",
        headerName: "Website URL ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => {
            return <span className="text-primary-main "> {row.website_url} </span>;
        },
    },
    {
        field: "address",
        headerName: "Address ",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => {
            return <span className="text-primary-main "> {row.address} </span>;
        },
    },
    {
        field: "gst_no",
        headerName: "GST no.",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => {
            return <span className="text-primary-main "> {row.gst_no} </span>;
        },
    },
    {
        field: "phone_no",
        headerName: "Phone no.",
        flex: "flex-[1.5_1.5_0%]",
        renderCell: (row: ConfigurationCompanyListResponse) => {
            return <span className="text-primary-main "> {row.phone_no} </span>;
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
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },
    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

    {
        phone_no: "9302085050",
        logo: "-",
        company_name: "Something",
        website_url: "Jain.com",
        gst_no: "123",
        address: "M.P.",
        mobile: "8574859685",
    },

];

const ConfigurationCompanyListingWrapper = () => {
    // const vendoraddress: any = useSelector((address: Rootaddress) => address.vendor);

    // const { page, rowsPerPage } = vendoraddress;

    // const dispatch = useDispatch<AppDispatch>();
    // // const navigate = useNavigate();
    // const { data, isFetching, isLoading } = useGetVendorsQuery({
    //     limit: rowsPerPage,
    //     searchValue: "",
    //     params: ["dealerName", "logo", "mobile"],
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
                <ConfigurationCompanyListing columns={columns} rows={rows} />
            </ConfigurationLayout>
        </>
    );
};

export default ConfigurationCompanyListingWrapper;
