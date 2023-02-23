import React from 'react'
import AddCountryDialog from './AddCountryDialog'

type Props = {
    onClose: () => void
}

const AddCountryWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddCountryDialog onClose={onClose} />
        </>
    )
}

export default AddCountryWrapper
