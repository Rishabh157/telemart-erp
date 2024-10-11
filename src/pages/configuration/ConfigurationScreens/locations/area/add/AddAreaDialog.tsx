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
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useGetAllCountryQuery } from 'src/services/CountryService'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'
import { useGetAllPincodeByTehsilQuery } from 'src/services/PinCodeService'

// |-- Types --|
type Props = {
    onClose: () => void
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

const AddAreaDialog = ({ onClose, formikProps, formType, apiStatus }: Props) => {
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

    const { options: pincodeOptions } = useCustomOptions({
        useEndPointHook: useGetAllPincodeByTehsilQuery(values?.tehsilId, {
            skip: !values?.tehsilId
        }),
        keyName: 'pincode',
        value: '_id',
    })

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            <DialogTitle className="text-primary-main">
                {formType === 'ADD' ? 'Add' : 'Edit'} Area
            </DialogTitle>
            <DialogContent className='h-[50vh]'>

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
                        <ATMSelectSearchable
                            label="Pincode"
                            selectLabel="pincode"
                            name="pincodeId"
                            value={values?.pincodeId}
                            options={pincodeOptions}
                            onChange={(e) => {
                                setFieldValue('pincodeId', e || '')
                            }}
                        />
                    </>
                }

                <FieldArray name="area">
                    {({ push, remove }) => {
                        return (
                            <>
                                <div className="grid grid-cols-2 gap-3 gap-y-5">
                                    {values?.area?.map(
                                        (item, index) => {
                                            const { areaName } = item
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-1 items-end"
                                                >
                                                    <ATMTextField
                                                        required
                                                        disabled={formType === 'EDIT'}
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
                                {formType === 'ADD' && <div className="flex justify-self-start py-9">
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
                                </div>}
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
