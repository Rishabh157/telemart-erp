import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddCountryWrapper from '../add/AddCountryWrapper'

type Props = {
    countries: any[]
}

const CountryListing = ({
    countries
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);


    return (
        <>
            <LocationListView
                listHeading='Country'
                listData={countries}
                onAddClick={() => { setisOpenAddForm(true) }}
            />

            {
                isOpenAddForm && (
                    <AddCountryWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }

        </>
    )
}

export default CountryListing
