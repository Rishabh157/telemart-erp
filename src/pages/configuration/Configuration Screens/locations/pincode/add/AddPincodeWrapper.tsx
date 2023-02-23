import React from 'react'
import AddPincodeDialog from './AddPincodeDialog'

type Props = {
    onClose: () => void
}

const AddPincodeWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddPincodeDialog onClose={onClose} />
        </>
    )
}

export default AddPincodeWrapper
