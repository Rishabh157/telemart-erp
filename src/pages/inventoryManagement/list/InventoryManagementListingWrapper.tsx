/// ==============================================
// Filename:InventoryManagementListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
//import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import moment from 'moment'
//import { Chip, Stack } from '@mui/material'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { InventoryManagementListResponse } from 'src/models/InventoryManagement.model'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import InventoryManagementListing from './InventoryManagementListing'
import { useGetInventoryManagementQuery  } from 'src/services/InventoryManagementService'
//import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
//import { showToast } from 'src/utils'

//import ActionPopup from 'src/components/utilsComponent/ActionPopup'

// |-- Redux --|
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/InventoryManagementSlice'

const InventoryManagementListingWrapper = () => {
    //const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const inventoryManagementState: any = useSelector(
        (state: RootState) => state.inventoryManagement
    )
    const { page, rowsPerPage, searchValue, items } = inventoryManagementState
    const { userData }: any = useSelector((state: RootState) => state.auth)
    //const [showDropdown, setShowDropdown] = useState(false)
    //const [currentId, setCurrentId] = useState('')

    const { data, isLoading, isFetching } = useGetInventoryManagementQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['dummy1'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

   
    const columns: columnTypes[] = [
        {
            field: 'dummy1',
            headerName: 'Dummy 1',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: InventoryManagementListResponse) => (
                <span> DUMMY </span>
            ),
        },
        {
            field: 'dummy2',
            headerName: 'Dummy 2',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: InventoryManagementListResponse) => {
                return <span> DUMMY </span>
            },
        },
        // {
        //     field: 'quantity',
        //     headerName: 'Quantity',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         return <span> {row.purchaseOrder.quantity} </span>
        //     },
        // },
        // {
        //     field: 'rate',
        //     headerName: 'rate',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         return <span> {row.purchaseOrder.rate} </span>
        //     },
        // },
        // {
        //     field: 'vendor',
        //     headerName: 'Vendor',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         return <span> {row.vendorLabel} </span>
        //     },
        // },
        // {
        //     field: 'warehouseLabel',
        //     headerName: 'ware house',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         return <span> {row.warehouseLabel} </span>
        //     },
        // },
        // {
        //     field: 'estimateDeliveryDate',
        //     headerName: 'Est. Delivery Date',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         return (
        //             <span>
        //                 {' '}
        //                 {moment(row.purchaseOrder.estReceivingDate).format(
        //                     'DD/MM/YYYY'
        //                 )}{' '}
        //             </span>
        //         )
        //     },
        // },
        // {
        //     field: 'approval.approvalLevel',
        //     headerName: 'Approval level',
        //     flex: 'flex-[1_1_0%]',
        //     renderCell: (row: InventoryManagementListResponse) => {
        //         const approvalLength = row?.approval?.length
        //         return (
        //             <span className="z-10">
        //                 {' '}
        //                 <Stack direction="row" spacing={1}>
        //                     {approvalLength === 0 ? (
        //                         <button
        //                             id="btn"
        //                             className=" overflow-hidden cursor-pointer z-0"
        //                             onClick={() => {
        //                                 showConfirmationDialog({
        //                                     title: 'Approve level 1',
        //                                     text: 'Do you want to Approve PO  ?',
        //                                     showCancelButton: true,
        //                                     next: (res) => {
        //                                         return res.isConfirmed
        //                                             ? handleComplete(
        //                                                   row?._id,
        //                                                   1
        //                                               )
        //                                             : false
        //                                     },
        //                                 })
        //                             }}
        //                         >
        //                             <Chip
        //                                 label="Level 0"
        //                                 color="error"
        //                                 variant="outlined"
        //                                 size="small"
        //                                 clickable={true}
        //                             />
        //                         </button>
        //                     ) : approvalLength === 1 ? (
        //                         <button
        //                             id="btn"
        //                             className="cursor-pointer"
        //                             onClick={() => {
        //                                 showConfirmationDialog({
        //                                     title: 'Approve level 2',
        //                                     text: 'Do you want to Approve PO  ?',
        //                                     showCancelButton: true,
        //                                     next: (res) => {
        //                                         return res.isConfirmed
        //                                             ? handleComplete(
        //                                                   row?._id,
        //                                                   2
        //                                               )
        //                                             : false
        //                                     },
        //                                 })
        //                             }}
        //                         >
        //                             <Chip
        //                                 label="Level 1"
        //                                 color="warning"
        //                                 variant="outlined"
        //                                 size="small"
        //                                 clickable={true}
        //                             />
        //                         </button>
        //                     ) : (
        //                         <button
        //                             id="btn"
        //                             disabled={approvalLength >= 2}
        //                             className="cursor-pointer"
        //                         >
        //                             <Chip
        //                                 label="Approved"
        //                                 color="success"
        //                                 variant="outlined"
        //                                 size="small"
        //                                 clickable={true}
        //                             />
        //                         </button>
        //                     )}
        //                 </Stack>{' '}
        //             </span>
        //         )
        //     },
        //     // renderCell: (row: InventoryManagementListResponse) => {
        //     //   const approvalLength = row?.approval?.length;
        //     //   return (
        //     //     <span>
        //     //       {" "}
        //     //       {approvalLength === 0
        //     //         ? "no lvl"
        //     //         : approvalLength
        //     //         ? row?.approval[0]?.approvalLevel
        //     //         : row?.approval[1]?.approvalLevel}{" "}
        //     //     </span>
        //     //   );
        //     // },
        // },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.8_0.8_0%]',
        //     renderCell: (row: any) => (
        //         <ActionPopup
        //             isView
        //             isEdit
        //             handleViewActionButton={() => {
        //                 navigate(`/inventory-management/view/${currentId}`)
        //             }}
        //             handleEditActionButton={() => {
        //                 navigate(`/inventory-management/edit/${currentId}`, {
        //                     state: { poCode: row?.poCode },
        //                 })
        //             }}
        //             handleOnAction={() => {
        //                 setShowDropdown(!showDropdown)
        //                 setCurrentId(row?._id)
        //             }}
        //         >
        //             <>
        //                 <button
        //                     onClick={() => {
        //                         navigate('/grn/add?', {
        //                             state: {
        //                                 poCode: row?.poCode,
        //                                 itemId: row?.purchaseOrder.itemId,
        //                                 itemName: row?.purchaseOrder.itemName,
        //                                 quantity: row?.purchaseOrder.quantity,
        //                                 companyId: row?.companyId,
        //                             },
        //                         })
        //                     }}
        //                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        //                 >
        //                     Generate GRN
        //                 </button>
        //                 <button
        //                     onClick={() => {
        //                         dispatch(setFilterValue([row?.poCode]))
        //                         navigate('/grn', {
        //                             state: {
        //                                 poCode: row?.poCode,
        //                                 // itemId: row?.purchaseOrder.itemId,
        //                                 // itemName: row?.purchaseOrder.itemName,
        //                                 // quantity: row?.purchaseOrder.quantity,
        //                                 // companyId: row?.companyId,
        //                             },
        //                         })
        //                     }}
        //                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        //                 >
        //                     View GRN
        //                 </button>
        //             </>
        //         </ActionPopup>
        //     ),
        //     align: 'end',
        // },
    ]

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

    //console.log(items)

    return (
        <>
            <SideNavLayout>
                <InventoryManagementListing
                    columns={columns}
                    rows={items || []}
                    //setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default InventoryManagementListingWrapper
