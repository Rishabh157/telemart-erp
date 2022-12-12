import React, { useState } from 'react'
import ViewLayout from 'src/components/layouts/ViewLayout/ViewLayout'
import { BiBlock, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineRise } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import DealerInfoCard from '../components/dealerInfoCard/DealerInfoCard'
import ListItemCard from '../components/listItemCard/ListItemCard'

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

const ViewDealer = () => {

    const dealerState: any = useSelector((state: RootState) => state.dealer)
    const {
        items
    } = dealerState

    const [searchValue, setSearchValue] = useState("");

    return (
        <ViewLayout
            infoCard={<DealerInfoCard />}
            listData={items}
            tabs={tabsData}
            renderListItem={(item: any) => <ListItemCard item={item} key={item._id} />}
            actionIcons={actionIcons}
            searchValue={searchValue}
            onSearch={(value) => setSearchValue(value)}
        />
    )
}

export default ViewDealer
