// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { FormInitialValues } from './EditChannelManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { paymentTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Redux --|
// import { RootState } from 'src/redux/store'
// import { setAllStates } from 'src/redux/slices/statesSlice'
// import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
// import useStatesByCountry from 'src/hooks/useStatesByCountry'
// import useStateDistricts from 'src/hooks/useDistrictsByState'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        channelCategoryOptions: SelectOption[]
        countryOptions: SelectOption[]
        languageOptions: SelectOption[]
        stateOptions?: SelectOption[]
        districtOptions?: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Channel Management',
        path: '/media/channel',
    },
    {
        label: 'Add Channel',
    },
]

const EditChannelManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    // Initiate Method
    const dispatch = useDispatch()

    // Hook
    const { options: stateOptions } = useCustomOptions({
        useEndPointHook: useGetAllStateByCountryQuery(values.country || '', {
            skip: !values.country,
        }),
        keyName: 'stateName',
        value: '_id',
    })

    const { options: districtOptions } = useCustomOptions({
        useEndPointHook: useGetAllDistrictByStateQuery(values.state || '', {
            skip: !values.state,
        }),
        keyName: 'districtName',
        value: '_id',
    })

    dropdownOptions = {
        ...dropdownOptions,
        stateOptions,
        districtOptions,
    }

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="flex flex-col gap-2 p-4 ">
            {/* Breadcrumbs */}
            <div className="">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading> Update Channel</ATMPageHeading>
            </div>

            <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium">Channel Details</div>

                    {/* BUTTON - Add Button */}
                    <div>
                        <button
                            type="button"
                            disabled={apiStatus}
                            onClick={() => formikProps.handleSubmit()}
                            className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                apiStatus ? 'opacity-50' : ''
                            }`}
                        >
                            Update
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="px-3 py-2 grow pb-9 ">
                    <div className="grid grid-cols-3 gap-4">
                        <ATMTextField
                            name="channelName"
                            value={values.channelName}
                            label="Channel Name"
                            required
                            placeholder="Channel Name"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'channelName',
                                    e.target.value
                                )
                            }
                        />

                        <ATMSelectSearchable
                            name="channelGroupId"
                            required
                            value={values.channelGroupId}
                            options={dropdownOptions.channelGroupOptions}
                            label="Channel Group"
                            onChange={(e) =>
                                handleSetFieldValue('channelGroupId', e)
                            }
                        />

                        <ATMSelectSearchable
                            required
                            name="channelCategory"
                            value={values.channelCategory}
                            label="Channel Category "
                            options={dropdownOptions.channelCategoryOptions}
                            onChange={(value) =>
                                handleSetFieldValue('channelCategory', value)
                            }
                        />

                        <ATMTextField
                            name="contactPerson"
                            value={values.contactPerson}
                            label="Contact Person"
                            placeholder="Contact Person"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'contactPerson',
                                    e.target.value
                                )
                            }
                        />

                        <ATMTextField
                            name="designation"
                            required
                            value={values.designation}
                            label="Designation"
                            placeholder="Designation"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'designation',
                                    e.target.value
                                )
                            }
                        />

                        <ATMTextField
                            name="email"
                            value={values.email}
                            label="Email Id"
                            placeholder="Email Id"
                            onChange={(e) =>
                                handleSetFieldValue('email', e.target.value)
                            }
                        />

                        <ATMSelectSearchable
                            options={dropdownOptions.countryOptions}
                            name="country"
                            required
                            value={values.country}
                            label="Country "
                            // placeholder="Country"
                            onChange={(value) => {
                                handleSetFieldValue('country', value)
                            }}
                        />

                        <ATMSelectSearchable
                            options={dropdownOptions.stateOptions || []}
                            name="state"
                            required
                            value={values.state}
                            label="State"
                            onChange={(value) =>
                                handleSetFieldValue('state', value)
                            }
                        />

                        <ATMSelectSearchable
                            options={dropdownOptions.districtOptions || []}
                            name="district"
                            required
                            value={values.district}
                            label="District"
                            onChange={(value) =>
                                handleSetFieldValue('district', value)
                            }
                        />

                        <ATMSelectSearchable
                            required
                            options={dropdownOptions.languageOptions}
                            name="language"
                            value={values.language}
                            label="Language"
                            onChange={(value) =>
                                handleSetFieldValue('language', value)
                            }
                        />

                        <ATMSelectSearchable
                            options={paymentTypeOptions()}
                            required
                            name="paymentType"
                            value={values.paymentType}
                            label="Payment Type"
                            onChange={(value) =>
                                handleSetFieldValue('paymentType', value)
                            }
                        />

                        <ATMTextField
                            name="phone"
                            value={values.phone}
                            label="Phone"
                            placeholder="Phone"
                            onChange={(e) =>
                                handleSetFieldValue('phone', e.target.value)
                            }
                        />

                        <ATMTextField
                            name="mobile"
                            value={values.mobile}
                            label="Mobile   "
                            placeholder="Mobile "
                            onChange={(e) =>
                                handleSetFieldValue('mobile', e.target.value)
                            }
                        />

                        <ATMTextField
                            name="website"
                            value={values.website}
                            label="Website "
                            placeholder="Website "
                            onChange={(e) => {
                                handleSetFieldValue('website', e.target.value)
                            }}
                        />

                        <ATMTextArea
                            name="address"
                            value={values.address}
                            label="Address Name"
                            placeholder="Address Name"
                            onChange={(e) => handleSetFieldValue('address', e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditChannelManagement
