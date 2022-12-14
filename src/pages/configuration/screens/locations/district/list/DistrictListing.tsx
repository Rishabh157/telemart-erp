import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddDistrictWrapper from '../add/AddDistrictWrapper'

type Props = {
    districts: any[]
}

const DistrictListing = ({
    districts
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);

    return (
        <>
            <LocationListView
                listHeading='Districts'
                listData={districts}
                onAddClick={() => { setisOpenAddForm(true) }}

            />

            {
                isOpenAddForm && (
                    <AddDistrictWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }
        </>
    )
}

export default DistrictListing
