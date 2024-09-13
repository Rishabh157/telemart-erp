// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddTehsilWrapper'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCourierMasterQuery } from 'src/services/CourierMasterService'
import PrirorityTable from '../../PrirorityTable'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const AddTehsilDialog = ({
    onClose,
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue } = formikProps

    const { options: couriersOptions } = useCustomOptions({
        useEndPointHook: useGetAllCourierMasterQuery(''),
        keyName: 'courierName',
        value: '_id',
    })

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">
                {formType === 'EDIT' ? 'Edit' : 'Add'} Tehsil
            </DialogTitle>

            <DialogContent className='h-[50vh]'>
                <ATMTextField
                    required
                    disabled={formType === 'EDIT'}
                    name="tehsilName"
                    value={values.tehsilName}
                    onChange={(e) => {
                        setFieldValue('tehsilName', e.target.value)
                    }}
                    placeholder="Enter a tehsil name"
                    label="Tehsil Name"
                />

                <ATMSelectSearchable
                    name="preferredCourier"
                    required
                    label="Preferred Courier"
                    value={values.preferredCourier || ''}
                    options={couriersOptions}
                    isMulti
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('preferredCourier', e)
                    }}
                />

                <ATMSwitchButton
                    label="Fixed"
                    name="isFixed"
                    value={values.isFixed}
                    title1="YES"
                    title2="NO"
                    onChange={(e) => {
                        setFieldValue('isFixed', e)
                    }}
                />

                {values?.preferredCourier?.length ? (
                    <PrirorityTable
                        preferredCourier={values?.preferredCourier}
                    />
                ) : null}
            </DialogContent>

            <DialogActions>
                <button
                    type="button"
                    onClick={() => onClose()}
                    className="px-3 py-2 border rounded border-primary-main text-primary-main"
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

export default AddTehsilDialog
