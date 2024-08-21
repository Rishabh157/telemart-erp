// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { AiOutlineRise } from 'react-icons/ai'
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import ListItemCard from '../components/listItemCard/ListItemCard'
import VendorInfoCard from '../components/vendorInfoCard/VendorInfoCard'
// import { useParams } from "react-router-dom";
import { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import { useGetPaginationVendorsQuery } from 'src/services/VendorServices'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const tabsData = [
    {
        label: 'General Information',
        icon: BsArrowRepeat,
        path: 'general-information',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_GENERAL_INFORMATION,
    },
    {
        label: 'PO',
        icon: AiOutlineRise,
        path: 'purchase-order',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_PURCHASE_ORDER,
    },

    {
        label: "RTV's",
        icon: MdOutlinePeopleAlt,
        path: 'return-to-vendor',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_RETURN_TO_VENDOR,
    },
    {
        label: 'Ledger',
        icon: MdOutlinePeopleAlt,
        path: 'ledger',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_VENDOR_LEDGER,
    },
    {
        label: 'Inventory',
        icon: MdOutlinePeopleAlt,
        path: 'inventory',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_VENDOR_LEDGER,
    },
    {
        label: 'Activity',
        icon: MdOutlinePeopleAlt,
        path: 'activities',
        name: UserModuleNameTypes.ACTION_VENDOR_VIEW_ACTIVITY,
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
        label: 'Vendors',
        path: '/vendors',
    },
    {
        label: 'Current Vendor',
    },
]

const ViewVendor = () => {
    useUnmountCleanup()
    const [searchValue, setSearchValue] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)
    const allowedTabs = tabsData
        ?.filter((nav) => {
            return isAuthorized(nav?.name as keyof typeof UserModuleNameTypes)
        })
        ?.map((tab) => tab)
    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationVendorsQuery({
            limit: 100,
            searchValue: searchValue,
            params: [
                'companyType',
                'ownerShipType',
                'vendorCode',
                'companyName',
            ],
            page: 1,
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

    const listData = items?.map((ele: any) => {
        return {
            vendorName: ele?.companyName,
            _id: ele?._id,
            mobile: ele?.registrationAddress?.phone,
        }
    })

    return (
        <ViewLayout
            infoCard={
                <VendorInfoCard
                    vendorData={{
                        isActive: true,
                        vendorName: '',
                        mobile: '',
                        firmName: '',
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
            onSearch={(value) => setSearchValue(value)}
            breadcrumbs={breadcrumbs}
        />
    )
}

export default ViewVendor
