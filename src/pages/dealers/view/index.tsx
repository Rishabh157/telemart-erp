/// ==============================================
// Filename:index.tsx
// Type: Index Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineRise } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RiBillLine } from 'react-icons/ri'
import {useParams} from 'react-router-dom'

// |-- Internal Dependencies --|
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import DealerInfoCard from '../components/dealerInfoCard/DealerInfoCard'
import ListItemCard from '../components/listItemCard/ListItemCard'
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import { useGetDealersQuery } from 'src/services/DealerServices'

// |-- Redux --|
import { setItems, setSearchValue } from 'src/redux/slices/dealerSlice'
import { RootState, AppDispatch } from 'src/redux/store'
import { showAllowedTabs } from 'src/userAccess/getAuthorizedModules'
import { UserModuleNameTypes } from 'src/models/userAccess/UserAccess.model'


const actionIcons = [
    {
        icon: BiMessageDetail,
        onClick: () => {
            alert('Msg')
        },
        label: 'Message',
    },
    {
        icon: BiBlock,
        onClick: () => {
            alert('Block')
        },
        label: 'Block',
    },
]

const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Dealers',
        path: '/dealers',
    },
    {
        label: 'Current Dealer',
    },
]

const ViewDealer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const params = useParams();
    const dId = params.dealerId;
    console.log(dId, "index")

    
const tabsData = [
    {
        label: 'General Information',
        icon: BsArrowRepeat,
        path: `/dealers/${dId}/general-information`,
        name: 'GENERAL_INFORMATION',
    },
    {
        label: 'Warehouse',
        icon: MdOutlinePeopleAlt,
        path: `/dealers/${dId}/warehouse`,
        name: 'DEALER_WAREHOUSE',
    },
    {
        label: 'Sale Order',
        icon: AiOutlineRise,
        path: `/dealers/${dId}/sale-order`,
        name: 'DEALER_SALE_ORDER',
    },
    {
        label: 'Ledger',
        icon: MdOutlinePeopleAlt,
        path: `/dealers/${dId}/ledger`,
        name: 'DEALER_LEDGER',
    },
    {
        label: 'Orders Ledger',
        icon: RiBillLine,
        path: `/dealers/${dId}/order-ledger`,
        name: 'DEALER_ORDER_LEDGER',
    },
    {
        label: 'Activity',
        icon: MdOutlinePeopleAlt,
        path: `/dealers/${dId}/activities`,
        name: 'DEALER_ACTIVITY',
    },
    {
        label: 'PinCode',
        icon: MdOutlinePeopleAlt,
        path: `/dealers/${dId}/pincode`,
        name: 'DEALER_PINCODE',
    },
    {
        label: 'Schemes',
        icon: MdOutlinePeopleAlt,
        path: `/dealers/${dId}/scheme`,
        name: 'DEALER_SCHEME',
    },
    // {
    //     label: 'Supervisor',
    //     icon: MdOutlinePeopleAlt,
    //     path: 'supervisor',
    // },
]

    const allowedTabs = showAllowedTabs(
        checkUserAccess,
        UserModuleNameTypes.dealer,
        tabsData,
        userData?.userRole || 'ADMIN'
    )

    const dealerState: any = useSelector((state: RootState) => state.dealer)
    const { page, rowsPerPage, items } = dealerState
    const { searchValue }: any = useSelector((state: RootState) => state.dealer)
    const { data, isFetching, isLoading } = useGetDealersQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['firstName', 'lastName'],
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
        isPaginationRequired: false,
    })

    useEffect(() => {
        dispatch(setItems(data?.data || []))
    }, [isFetching, isLoading, data, dispatch])

    const listData = items?.map((ele: any, index: any) => {
        return {
            dealerName: ele.firstName + ' ',
            _id: ele._id,
            mobile: ele.registrationAddress.phone,
        }
    })

    return (
        <ViewLayout
            infoCard={
                <DealerInfoCard
                    dealerData={{
                        isActive: true,
                        vendorName: '',
                        mobile: '',
                    }}
                    actionIcons={actionIcons}
                />
            }
            listData={listData}
            tabs={allowedTabs}
            renderListItem={(item: any) => (
                <ListItemCard item={item} key={item._id} />
            )}
            searchValue={searchValue}
            onSearch={(newValue: any) => dispatch(setSearchValue(newValue))}
            breadcrumbs={breadcrumbs}
        />
    )
}

export default ViewDealer
