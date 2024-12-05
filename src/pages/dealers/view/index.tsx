// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { AiOutlineRise } from 'react-icons/ai'
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import {
    // useDispatch, 
    useSelector
} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { useGetDealersQuery } from 'src/services/DealerServices'
import DealerInfoCard from '../components/dealerInfoCard/DealerInfoCard'
import ListItemCard from '../components/listItemCard/ListItemCard'

// |-- Redux --|
import AccessDenied from 'src/AccessDenied'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import {
    // AppDispatch,
    RootState
} from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const tabsData = [
    {
        label: 'General Information',
        icon: BsArrowRepeat,
        path: `general-information`,
        name: UserModuleNameTypes.ACTION_DEALER_GENERAL_INFORMATION,
    },
    {
        label: 'Warehouse',
        icon: MdOutlinePeopleAlt,
        path: `warehouse`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_WAREHOUSE,
    },
    {
        label: 'Sale Order',
        icon: AiOutlineRise,
        path: `sale-order`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_SALE_ORDER,
    },
    {
        label: 'Ledger',
        icon: MdOutlinePeopleAlt,
        path: `ledger`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_LEDGER,
    },
    {
        label: 'Orders Ledger',
        icon: RiBillLine,
        path: `order-ledger`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_ORDER_LEDGER,
    },
    {
        label: 'Dealer Balance',
        icon: RiBillLine,
        path: `dealer-balance`,
        name: UserModuleNameTypes.ACTION_DEALER_BALANCE_REQUEST,
    },
    {
        label: 'Activity',
        icon: MdOutlinePeopleAlt,
        path: `activities`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_ACTIVITY,
    },
    {
        label: 'PinCode',
        icon: MdOutlinePeopleAlt,
        path: `pincode`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_PINCODE,
    },
    {
        label: 'Schemes',
        icon: MdOutlinePeopleAlt,
        path: `scheme`,
        name: UserModuleNameTypes.ACTION_DEALER_DEALER_SCHEME,
    },
    // {
    //     label: 'Supervisor',
    //     icon: MdOutlinePeopleAlt,
    //     path: 'supervisor',
    // },
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
    // const dispatch = useDispatch<AppDispatch>()
    const [dealerSearch, setDealerSearch] = useState<string>('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const navigate = useNavigate()
    const { dealerId } = useParams()

    useEffect(() => {
        const activeTab = window.location.pathname.split('/')[3]
        navigate(`/dealers/${dealerId}/${activeTab}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerId])

    const allowedTabs = tabsData
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)

    React.useEffect(() => {
        localStorage.removeItem('hasExecuted')
        if (userData?.userRole === 'ADMIN') {
            // navigate("open");
            return
        }
        const hasExecuted = localStorage.getItem('hasExecuted')

        if (hasExecuted) {
            return // Exit early if the function has been executed
        }

        for (const nav of tabsData) {
            const isValue = isAuthorized(
                nav?.name as keyof typeof UserModuleNameTypes
            )
            localStorage.setItem('hasExecuted', 'true')
            if (isValue) {
                navigate(nav.path)
                break
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const tabsRender = tabsData?.some((nav: any) => {
        return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
    })
    const dealerState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, } = dealerState

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetDealersQuery({
            limit: rowsPerPage,
            searchValue: dealerSearch,
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
        }),
    })

    const listData = items?.map((ele: any, index: any) => {
        return {
            dealerName: ele.firstName + ' ',
            _id: ele._id,
            mobile: ele.registrationAddress.phone,
        }
    })

    return (
        <>
            {tabsRender ? (
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
                    searchValue={dealerSearch}
                    onSearch={(newValue: any) => {
                        setDealerSearch(newValue)
                        // dispatch(setSearchValue(newValue))
                    }}
                    breadcrumbs={breadcrumbs}
                />
            ) : (
                <AccessDenied />
            )}
        </>
    )
}

export default ViewDealer
