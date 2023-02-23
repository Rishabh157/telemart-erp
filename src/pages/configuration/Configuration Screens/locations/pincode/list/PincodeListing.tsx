import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddPincodeWrapper from '../add/AddPincodeWrapper'

type Props = {
    pincodes: any[]
}

const PincodeListing = ({
    pincodes
}: Props
) => {

    const [isOpenAddForm, setisOpenAddForm] = useState(false);


    return (
        <>
            <LocationListView
                listHeading='Pincodes'
                listData={pincodes}
                onAddClick={() => { setisOpenAddForm(true) }}

            />
            {
                isOpenAddForm && (
                    <AddPincodeWrapper onClose={() => setisOpenAddForm(false)} />
                )
            }

        </>
    )
}

export default PincodeListing
