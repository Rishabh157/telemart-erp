// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { IconType } from 'react-icons'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import InwardCompanyTabs from './CourierReturnabsListingTabs'
import { getCourierRtoRequestStatusOptions } from 'src/utils/constants/customeTypes'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetCourierReturnQuery } from 'src/services/CourierReturnService'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { CourierReturnListResponse } from 'src/models/CourierReturn.model'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ChangeCourierRequestStatusWrapper from './changeRequestStatus/ChangeCourierRequestStatusWrapper'
import { isAuthorized } from 'src/utils/authorization'

// |-- Types --|
export type Tabs = {
    label: string
    icon: IconType
    path?: string
}

const CourierReturnabsListingWrapper = () => {
    useUnmountCleanup()
    const [currentId, setSetCurrentId] = React.useState<string | null>(null)
    const [currentStatus, setCurrentStatus] = React.useState<string>('')

    const listingPagination: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPagination

    const params = useParams()
    const warehouseId = params.id
    const courierRequestStatus = getCourierRtoRequestStatusOptions()

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetCourierReturnQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['shippingProvider', 'requestStatus'],
            page: page,
            filterBy: [
                {
                    fieldName: 'warehouseId',
                    value: warehouseId,
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
            headerName: 'Action',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: CourierReturnListResponse) => (
                <ActionPopup
                    handleOnAction={() => {}}
                    isCustomBtn={isAuthorized(
                        UserModuleNameTypes.ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_CHANGE_STATUS
                    )}
                    customBtnText="Change Status"
                    handleCustomActionButton={() => {
                        setSetCurrentId(row?._id)
                        setCurrentStatus(row?.requestStatus)
                    }}
                />
            ),
        },
        {
            field: 'shippingProvider',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_LIST_SHIPPING_PROVIDER_NAME,
            headerName: 'Shipping Provider Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: CourierReturnListResponse) => (
                <span>{row?.shippingProvider}</span>
            ),
        },
        {
            field: 'requestStatus',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_LIST_SHIPPING_REQUEST_STATUS,
            headerName: 'Request Status',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CourierReturnListResponse) => (
                <span>
                    {
                        courierRequestStatus?.find(
                            (ele) => ele?.value === row?.requestStatus
                        )?.label
                    }
                </span>
            ),
        },
        {
            field: 'orderNumber',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_LIST_ORDER_NUMBER,
            headerName: 'Order Number',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CourierReturnListResponse) => (
                <span className="text-primary-main "># {row.orderNumber}</span>
            ),
        },
        {
            field: 'comment',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_LIST_COMMENT,
            headerName: 'Comment',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CourierReturnListResponse) => (
                <span> {row?.comment} </span>
            ),
        },
        {
            field: 'createdAt',
            name: UserModuleNameTypes.TAB_WAREHOUSE_INWARD_INVENTORIES_COURIER_RETURN_CREATE_DATE,
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: CourierReturnListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
    ]

    return (
        <>
            <InwardCompanyTabs columns={columns} rows={items} />
            <DialogLogBox
                isOpen={currentId ? true : false}
                fullWidth={true}
                buttonClass="cursor-pointer"
                maxWidth="sm"
                handleClose={() => setSetCurrentId(null)}
                component={
                    <ChangeCourierRequestStatusWrapper
                        requestId={currentId as string}
                        currentStatus={currentStatus}
                        setIsShow={() => setSetCurrentId(null)}
                    />
                }
            />
        </>
    )
}

export default CourierReturnabsListingWrapper
