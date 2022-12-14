import React from 'react'
import AddAreaDialog from './AddAreaDialog'

type Props = {
    onClose: () => void
}

const AddAreaWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddAreaDialog onClose={onClose} />
        </>
    )
}

export default AddAreaWrapper
