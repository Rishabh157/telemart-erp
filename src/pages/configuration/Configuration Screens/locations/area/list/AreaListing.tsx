import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddAreaWrapper from '../add/AddAreaWrapper'

type Props = {
    areas: any[]
}

const AreaListing = ({
    areas
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);

    return (
        <>
            <LocationListView
                listHeading='Area'
                listData={areas}
                onAddClick={() => { setisOpenAddForm(true) }}
            />

            {
                isOpenAddForm && (
                    <AddAreaWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }

        </>
    )
}

export default AreaListing
