import React, { useEffect } from 'react'
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineRise } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import DealerInfoCard from '../components/dealerInfoCard/DealerInfoCard'
import ListItemCard from '../components/listItemCard/ListItemCard'
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { useGetDealersQuery } from 'src/services/DealerServices'
import { setItems, setSearchValue } from 'src/redux/slices/dealerSlice'
import { RootState } from 'src/redux/store'

const tabsData = [
    {
        label: 'General Information',
        icon: BsArrowRepeat,
        path: 'general-information',
    },
    {
        label: 'Warehouse',
        icon: MdOutlinePeopleAlt,
        path: 'warehouse',
    },
    {
        label: 'Sale Order',
        icon: AiOutlineRise,
        path: 'sale-order',
    },
    {
        label: 'Ledger',
        icon: MdOutlinePeopleAlt,
        path: 'ledger',
    },
    {
        label: 'Activity',
        icon: MdOutlinePeopleAlt,
        path: 'activities',
    },
    {
        label: 'PinCode',
        icon: MdOutlinePeopleAlt,
        path: 'pincode',
    },
    {
        label: 'Schemes',
        icon: MdOutlinePeopleAlt,
        path: 'scheme',
    },
]

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
    const dispatch = useDispatch()
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
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        // console.log(data?.data)
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
                        vendorName: 'Himanshu',
                        mobile: '8574859685',
                    }}
                    actionIcons={actionIcons}
                />
            }
            listData={listData}
            tabs={tabsData}
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
