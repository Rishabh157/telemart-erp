// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../add/AddCourierMasterWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCourierTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    formType: 'ADD' | 'EDIT'
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Courier master',
        path: '/configurations/courier',
    },
    {
        label: 'Add',
    },
]

const transportTypeOptions = [
    {
        label: 'Air',
        value: 'AIR',
    },
    {
        label: 'Surface',
        value: 'SURFACE',
    },
]

const AddCourierMaster = ({ formikProps, apiStatus, formType }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading>
                        {formType === 'ADD' ? 'Add' : 'Update'}
                    </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

                        {/* BUTTON - Edit Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${true ? 'disabled:opacity-25' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 pt-2 grow pb-9 ">
                        <div className="grid grid-cols-3 gap-4">
                            <ATMTextField
                                required
                                disabled={formType === 'EDIT'}
                                name="courierName"
                                value={values.courierName}
                                label="Courier Name"
                                placeholder="Courier Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'courierName',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMSelectSearchable
                                required
                                options={getCourierTypeOptions()}
                                name="courierType"
                                value={values.courierType}
                                label="Courier Type"
                                isDisabled={
                                    formType === 'EDIT' &&
                                    !values.isApiAvailable
                                }
                                onChange={(value: any) => {
                                    handleSetFieldValue('courierType', value)

                                    if (formType === 'ADD' && value === 'API') {
                                        handleSetFieldValue(
                                            'isApiAvailable',
                                            true
                                        )
                                    }
                                }}
                            />

                            <ATMSelectSearchable
                                required
                                options={transportTypeOptions}
                                name="transportType"
                                value={values.transportType}
                                label="Transport Type"
                                onChange={(value: any) =>
                                    handleSetFieldValue('transportType', value)
                                }
                            />

                            {/* {formType === 'ADD' && (
                                <ATMSwitchButton
                                    name="isApiAvailable"
                                    value={values.isApiAvailable}
                                    label="Is Api Available"
                                    onChange={(value: any) => {
                                        handleSetFieldValue(
                                            'isApiAvailable',
                                            value
                                        )
                                    }}
                                />
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourierMaster
