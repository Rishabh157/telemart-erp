import React from 'react'
import AddTehsilDialog from './AddTehsilDialog'

type Props = {
    onClose: () => void
}

const AddTehsilWrapper = ({
    onClose
}: Props
) => {
    return (
        <>
            <AddTehsilDialog onClose={onClose} />
        </>
    )
}

export default AddTehsilWrapper
