import React, { useEffect, useState } from 'react'
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineRise } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import VendorInfoCard from '../components/vendorInfoCard/VendorInfoCard'
import ListItemCard from '../components/listItemCard/ListItemCard'
import { useGetVendorByIdQuery, useGetVendorsQuery } from 'src/services/VendorServices'
import { setItems } from 'src/redux/slices/vendorSlice'
import { useParams } from 'react-router-dom'

const tabsData = [
    {
        label: 'Orders',
        icon: BsArrowRepeat,
        path: 'orders'
    },
    {
        label: 'Activities',
        icon: AiOutlineRise,
        path: 'activities'
    },
    {
        label: 'Delivery Boys',
        icon: MdOutlinePeopleAlt,
        path: 'delivery-boys'
    }
]

const actionIcons = [
    {
        icon: BiMessageDetail,
        onClick: () => { alert('Msg') }
    },
    {
        icon: BiBlock,
        onClick: () => { alert('Block') }
    }
]

const ViewVendor = () => {
    const { vendorId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const vendorState: any = useSelector((state: RootState) => state.vendor)
    const {
        items
    } = vendorState

    const [searchValue, setSearchValue] = useState("");

    const { data, isFetching, isLoading } = useGetVendorsQuery(


        {
            "limit": 10,
            "searchValue": "",
            "params": [
                "vendorName",
                "dealerCode",
                "mobile"
            ],
            "page": 1,
            "filterBy": [
                {
                    "fieldName": "",
                    "value": []
                }
            ],
            "dateFilter": {
                "start_date": "",
                "end_date": "",
                "dateFilterKey": ""
            },
            "orderBy": "createdAt",
            "orderByValue": -1,
            "isPaginationRequired": true

        }
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setItems(data || []))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching])

    const { data: vendorData } = useGetVendorByIdQuery(vendorId)

    return (
        <ViewLayout
            infoCard={<VendorInfoCard vendorData={vendorData} />}
            listData={items}
            tabs={tabsData}
            renderListItem={(item: any) => <ListItemCard item={item} key={item._id} />}
            actionIcons={actionIcons}
            searchValue={searchValue}
            onSearch={(value) => setSearchValue(value)}
        />
    )
}

export default ViewVendor
