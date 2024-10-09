// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { FieldArray, FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddAreaWrapper'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { HiPlus } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddAreaDialog = ({ onClose, formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">Add Area</DialogTitle>
            <DialogContent>
                {/* <ATMTextField
                    required
                    name="area"
                    value={values.area}
                    onChange={(e) => {
                        setFieldValue('area', e.target.value)
                    }}
                    placeholder="Name "
                    label="Area Name"
                /> */}

                <FieldArray name="area">
                    {({ push, remove }) => {
                        return (
                            <>
                                <div className="grid grid-cols-2 gap-3 gap-y-5">
                                    {values.area?.map(
                                        (item, index) => {
                                            const { areaName } = item
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-1 items-end"
                                                >
                                                    <ATMTextField
                                                        required
                                                        type="text"
                                                        name={`area[${index}].areaName`}
                                                        value={areaName}
                                                        label="Area"
                                                        placeholder="Area Name"
                                                        onChange={(e) => {
                                                            setFieldValue(`area[${index}].areaName`, e.target.value)
                                                        }}
                                                        className="mt-0 rounded"
                                                    />

                                                    {/* BUTTON - Delete */}
                                                    {values.area?.length >
                                                        1 && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        remove(
                                                                            index
                                                                        )
                                                                    }}
                                                                    className="p-2 bg-red-500 text-white rounded"
                                                                >
                                                                    <MdDeleteOutline className="text-2xl" />
                                                                </button>
                                                            </div>
                                                        )}
                                                </div>
                                            )
                                        }
                                    )}
                                </div>

                                {/* BUTTON - Add More Area */}
                                <div className="flex justify-self-start py-9">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            push({
                                                areaName: ''
                                            })
                                        }
                                        className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                    >
                                        <HiPlus size="20" /> Add More
                                    </button>
                                </div>
                            </>
                        )
                    }}
                </FieldArray>

            </DialogContent>
            <DialogActions>
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="border border-primary-main text-primary-main px-3 py-2 rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <ATMLoadingButton
                    className="w-24"
                    onClick={() => formikProps.handleSubmit()}
                    isLoading={apiStatus}
                >
                    Submit
                </ATMLoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default AddAreaDialog
