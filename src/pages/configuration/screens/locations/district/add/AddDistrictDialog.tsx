import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

type Props = {
    onClose: () => void
}

const AddDistrictDialog = ({
    onClose,
}: Props
) => {
    return (
        <>
            <Dialog
                open={true}
                onClose={onClose}
                fullWidth
            >
                <DialogTitle className='text-primary-main' > Add District </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <ATMTextField
                                name=""
                                value=""
                                onChange={() => { }}
                                placeholder="Enter a district name"
                                label='District Name'
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='border border-primary-main text-primary-main px-3 py-2 rounded'
                    > Cancel
                    </button>
                    <button type='button' className='bg-primary-main text-white px-3 py-2 rounded' > Submit </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddDistrictDialog
