import React from 'react'
import AddStateDialog from './AddStateDialog'

type Props = {
    onClose: () => void
}

const AddStateWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddStateDialog onClose={onClose} />
        </>
    )
}

export default AddStateWrapper
