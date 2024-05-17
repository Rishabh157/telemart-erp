// |-- Built-in Dependencies --|
import React, { useState } from 'react'
// |-- External Dependencies --|
import { useSelector } from 'react-redux'
// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { useGetPaginationComplaintQuery } from 'src/services/CallerService'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import ComplainListing from './ComplainListing'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import SingleComplaintListingLogsWrapper from 'src/pages/CustomerComplain/components/ComplaintListing/SingleComplaintLogs/SingleComplaintListingLogsWrapper'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

const ComplainListingWrapper = () => {
    useUnmountCleanup()
    const [currentId, setCurrentId] = useState('')
    const [isFlowDialogShow, setIsFlowDialogShow] =
        React.useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const complainState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { userData } = useGetLocalStorage()

    const {
        page,
        rowsPerPage,
        searchValue,
        dateFilter,
        orderNumberSearch,
        complaintNumberSearch,
    } = complainState
    const { items } = useGetCustomListingData<any>({
        useEndPointHook: useGetPaginationComplaintQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['customerNumber'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId,
                },
                {
                    fieldName: 'orderNumber',
                    value: orderNumberSearch,
                },
                {
                    fieldName: 'complaintNumber',
                    value: complaintNumberSearch,
                },
            ],
            dateFilter: dateFilter,
            orderBy: 'createdAt',
            orderByValue: -1,
            isPaginationRequired: true,
        }),
    })

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isCustomBtn
                    customBtnText="Flow"
                    handleCustomActionButton={() => {
                        setIsFlowDialogShow(true)
                    }}
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                />
            ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] capitalize',
            renderCell: (row: any) => <span> {row.orderNumber} </span>,
            name: UserModuleNameTypes.COMPLAIN_LIST_ORDER_NO,
        },
        {
            field: 'complaintNumber',
            headerName: 'Complaint Number',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] capi',
            name: UserModuleNameTypes.COMPLAIN_LIST_COMPAINT,
            renderCell: (row: any) => <span> {row?.complaintNumber} </span>,
        },
        {
            field: 'complaintbyLabel',
            headerName: 'Complaint Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] capitalize',
            name: UserModuleNameTypes.COMPLAIN_LIST_COMPLAINT_LABEL,
            renderCell: (row: any) => (
                <span>
                    {' '}
                    {row.complaintbyLabel ? row.complaintbyLabel : 'NA'}
                </span>
            ),
        },

        {
            field: 'schemeName',
            headerName: 'Scheme',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[150px] capitalize',
            name: UserModuleNameTypes.COMPLAIN_LIST_SCHEME,
            renderCell: (row: any) => <span> {row.schemeName} </span>,
        },
        {
            field: 'initialCallOneLabel',
            headerName: 'Initial Call One Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px] capitalize',
            name: UserModuleNameTypes.COMPLAIN_LIST_INITIAL_CALL_ONE_LABEL,
            renderCell: (row: any) => <span> {row.initialCallOneLabel} </span>,
        },
        {
            field: 'initialCallTwoLabel',
            headerName: 'Initial Call Two Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px] capitalize',
            name: UserModuleNameTypes.COMPLAIN_LIST_INITIAL_CALL_TWO_LABEL,
            renderCell: (row: any) => <span> {row.initialCallTwoLabel} </span>,
        },
        {
            field: 'initialCallThreeLabel',
            headerName: 'Initial Call Three Label',
            flex: 'flex-[1_1_0%]',
            extraClasses: 'min-w-[250px] capitalize',
            name: UserModuleNameTypes.COMPLAIN_LIST_INITIAL_CALL_THEREE_LABEL,
            renderCell: (row: any) => (
                <span> {row.initialCallThreeLabel} </span>
            ),
        },
    ]

    return (
        <SideNavLayout>
            <ComplainListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
            {/* Closed Complaint Flow */}
            <DialogLogBox
                isOpen={isFlowDialogShow}
                handleClose={() => {
                    setIsFlowDialogShow(false)
                }}
                component={
                    <div className="py-4 px-4">
                        <SingleComplaintListingLogsWrapper
                            complaintId={currentId}
                        />
                    </div>
                }
            />
        </SideNavLayout>
    )
}

export default ComplainListingWrapper
