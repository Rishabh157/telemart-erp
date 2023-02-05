import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { AttributesListResponse } from "src/models/Attrbutes.model";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
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
            return <span > {row.attributeType} </span>;
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
        _id : 1
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 2
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 3
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        _id : 3,
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
        _id : 4
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 5
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 6
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 7
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        mobile: "8574859685",
        _id : 8
    },

    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        state: "M.P.",
        _id : 9,
        mobile: "8574859685",
    },
    {
        firstName: "Himanshu",
        attributeName: "red",
        attributeType: "Color",
        lastName: "Jain",
        district: "Mandsaur",
        _id : 10,
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
