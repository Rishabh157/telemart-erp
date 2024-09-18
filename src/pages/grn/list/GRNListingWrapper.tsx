// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { GRNListResponse } from 'src/models/GRN.model'
import { useGetPaginationGRNQuery } from 'src/services/GRNService'
import GRNListing from './GRNListing'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { isAuthorized } from 'src/utils/authorization'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


const GRNListingWrapper = () => {
    useUnmountCleanup()

    const [currentId, setCurrentId] = useState<string>('');
    const navigate = useNavigate()

    // state
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPaginationGRNQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['poCode', 'itemName'],
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
        }),
    })


    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_GRN_EDIT
                    )}
                    handleEditActionButton={() => {
                        navigate(`/grn/edit/${currentId}`)
                    }}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                />

            ),
        },
        {
            field: 'poCode',
            headerName: 'PO Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: GRNListResponse) => <span> {row?.poCode} </span>,
            name: UserModuleNameTypes.GRN_LIST_PO_CODE,
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.GRN_LIST_ITEM_NAME,
            renderCell: (row: GRNListResponse) => {
                return <span> {row?.itemName} </span>
            },
        },
        {
            field: 'receivedQuantity',
            headerName: 'Received Qnty.',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.GRN_LIST_RECEVIED_QUANTITY,
            renderCell: (row: GRNListResponse) => {
                return <span> {row?.receivedQuantity} </span>
            },
        },
        {
            field: 'goodQuantity',
            headerName: 'Good Qnty.',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.GRN_LIST_GOOD_QUANTITY,
            renderCell: (row: GRNListResponse) => {
                return <span> {row?.goodQuantity} </span>
            },
        },
        {
            field: 'defectiveQuantity',
            headerName: 'Defective Qnty.',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.GRN_LIST_DEFECTIVE_QUANTITY,
            renderCell: (row: GRNListResponse) => {
                return <span> {row?.defectiveQuantity} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GRN_LIST_CREATED_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: GRNListResponse) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
        {
            field: 'updatedAt',
            headerName: 'updated Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.GRN_LIST_UPDATED_DATE,
            extraClasses: 'min-w-[150px]',
            renderCell: (row: GRNListResponse) => (
                <div className="py-0">
                    <div className="text-[12px] text-slate-700 font-medium">
                        {moment(row?.updatedAt).format('DD MMM YYYY')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                        {moment(row?.updatedAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
    ]

    return (
        <SideNavLayout>
            <GRNListing columns={columns} rows={items} />
        </SideNavLayout>
    )
}

export default GRNListingWrapper
