import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddStateWrapper from '../add/AddStateWrapper'

type Props = {
    states: any[]
}

const StateListing = ({
    states
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);


    return (
        <>
            <LocationListView
                listHeading='States'
                listData={states}
                onAddClick={() => { setisOpenAddForm(true) }}
            />

            {
                isOpenAddForm && (
                    <AddStateWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }
        </>
    )
}

export default StateListing
