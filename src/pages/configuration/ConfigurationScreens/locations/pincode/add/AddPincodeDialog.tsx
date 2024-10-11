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
import { FormInitialValues } from './AddPincodeWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { useGetAllCourierMasterQuery } from 'src/services/CourierMasterService'
import PrirorityTable from '../../PrirorityTable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'


// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'EDIT' | 'ADD'
}

const AddPincodeDialog = ({
    onClose,
    formikProps,
    apiStatus,
    formType,
}: Props) => {
    const { values, setFieldValue } = formikProps

    // Hook
    const { options: countryOptions } = useCustomOptions({
        useEndPointHook: useGetAllCountryQuery(''),
        keyName: 'countryName',
        value: '_id',
    })

    const { options: stateOptions } = useCustomOptions({
        useEndPointHook: useGetAllStateByCountryQuery(values?.countryId, {
            skip: !values?.countryId
        }),
        keyName: 'stateName',
        value: '_id',
    })

    const { options: districtOptions } = useCustomOptions({
        useEndPointHook: useGetAllDistrictByStateQuery(values?.stateId, {
            skip: !values?.stateId
        }),
        keyName: 'districtName',
        value: '_id',
    })

    const { options: tehsilOptions } = useCustomOptions({
        useEndPointHook: useGetAllTehsilByDistrictQuery(values?.districtId, {
            skip: !values?.districtId
        }),
        keyName: 'tehsilName',
        value: '_id',
    })

    const { options: couriersOptions } = useCustomOptions({
        useEndPointHook: useGetAllCourierMasterQuery(''),
        keyName: 'courierName',
        value: '_id',
    })

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">
                {formType === 'EDIT' ? 'Edit' : 'Add'} Pincode
            </DialogTitle>
            <DialogContent className='h-[50vh]'>



                <div>

                    {formType === 'EDIT' &&
                        <>
                            <ATMSelectSearchable
                                label="Country"
                                selectLabel="country"
                                name="countryId"
                                value={values?.countryId}
                                options={countryOptions}
                                onChange={(e) => {
                                    setFieldValue('countryId', e || '')
                                }}
                            />
                            <ATMSelectSearchable
                                label="State"
                                selectLabel="state"
                                name="stateId"
                                value={values?.stateId}
                                options={stateOptions}
                                onChange={(e) => {
                                    setFieldValue('stateId', e || '')
                                }}
                            />
                            <ATMSelectSearchable
                                label="District"
                                selectLabel="district"
                                name="districtId"
                                value={values?.districtId}
                                options={districtOptions}
                                onChange={(e) => {
                                    setFieldValue('districtId', e || '')
                                }}
                            />
                            <ATMSelectSearchable
                                label="Tehsil"
                                selectLabel="tehsil"
                                name="tehsilId"
                                value={values?.tehsilId}
                                options={tehsilOptions}
                                onChange={(e) => {
                                    setFieldValue('tehsilId', e || '')
                                }}
                            />
                        </>
                    }

                    <ATMTextField
                        required
                        disabled={formType === 'EDIT'}
                        name="pincode"
                        value={values.pincode}
                        onChange={(e) => {
                            setFieldValue('pincode', e.target.value)
                        }}
                        placeholder="Pincode"
                        label="Pincode Number"
                        className="mt-0 rounded"
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
                </div>
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
                    className="border border-primary-main text-primary-main px-3 py-2 rounded"
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

export default AddPincodeDialog
