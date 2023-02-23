import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddTehsilWrapper from '../add/AddTehsilWrapper'

type Props = {
    tehsils: any[]
}

const TehsilListing = ({
    tehsils
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);


    return (
        <>
            <LocationListView
                listHeading='Tehsils'
                listData={tehsils}
                onAddClick={() => { setisOpenAddForm(true) }}

            />

            {
                isOpenAddForm && (
                    <AddTehsilWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }

        </>
    )
}

export default TehsilListing
