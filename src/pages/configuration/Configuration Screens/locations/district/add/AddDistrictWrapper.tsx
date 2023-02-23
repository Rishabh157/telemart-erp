import React from 'react'
import AddDistrictDialog from './AddDistrictDialog'

type Props = {
    onClose: () => void
}

const AddDistrictWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddDistrictDialog onClose={onClose} />
        </>
    )
}

export default AddDistrictWrapper
