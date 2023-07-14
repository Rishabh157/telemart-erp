/// ==============================================
// Filename:GRNListingWrapper.tsx
// Type: List Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from "react-router-dom";

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { GRNListResponse } from 'src/models/GRN.model'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import GRNListing from './GRNListing'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
// import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
    // setFilterValue,
} from 'src/redux/slices/GRNSlice'
import { RootState, AppDispatch } from 'src/redux/store'
// import {
//   setFilterValue,
//   setIsTableLoading,
//   setItems,
//   setSearchValue,
//   setTotalItems,
// } from "src/redux/slices/GRNSlice";

const columns: columnTypes[] = [
    {
        field: 'poCode',
        headerName: 'PO Code',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: GRNListResponse) => <span> {row.poCode} </span>,
    },
    {
        field: 'itemName',
        headerName: 'Item Name',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.itemName} </span>
        },
    },
    {
        field: 'receivingQuantity',
        headerName: 'Received Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row?.receivedQuantity} </span>
        },
    },
    {
        field: 'goodQuantity',
        headerName: 'Good Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row.goodQuantity} </span>
        },
    },
    {
        field: 'defectiveQuantity',
        headerName: 'Defective Qnty.',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: GRNListResponse) => {
            return <span> {row.defectiveQuantity} </span>
        },
    },
    // {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     flex: 'flex-[0.5_0.5_0%]',
    //     renderCell: (row: any) => (
    //         <ActionPopup
    //             isView
    //             isEdit
    //             isDelete
    //             handleOnAction={() => {
    //                 // setShowDropdown(!showDropdown)
    //                 // setCurrentId(row?._id)
    //             }}
    //         />
    //     ),
    //     align: 'end',
    // },
]

const GRNListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()

    const grnState: any = useSelector((state: RootState) => state.grn)
    const { page, rowsPerPage, searchValue, items, filterValue } = grnState
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )
    const { data, isLoading, isFetching } = useGetPaginationGRNQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['poCode', 'itemName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: 'poCode',
                value: filterValue,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])
    //

    // useEffect(() => {
    //   if (poCode) {
    //    dispatch(setFilterValue([poCode]));
    //   }
    // }, [poCode]);

    return (
        <>
            <SideNavLayout>
                <GRNListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.grn,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                />
            </SideNavLayout>
        </>
    )
}

export default GRNListingWrapper
