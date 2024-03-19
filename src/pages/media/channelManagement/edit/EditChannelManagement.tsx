/// ==============================================
// Filename:EditChannelManagement.tsx
// Type: Edit Component
// Last Updated: JULY 03, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

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
import { RootState } from 'src/redux/store'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import useStatesByCountry from 'src/hooks/useStatesByCountry'
import useStateDistricts from 'src/hooks/useDistrictsByState'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        countryOption: SelectOption[]
        stateOption?: SelectOption[]
        districtOptions?: SelectOption[]
        languageOption: SelectOption[]
        categoryOption: SelectOption[]
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
    const dispatch = useDispatch()
    const { allStates }: any = useSelector((state: RootState) => state.states)
    const { allDistricts }: any = useSelector(
        (state: RootState) => state.district
    )
    const { stateByCountry } = useStatesByCountry(formikProps.values.country)

    const { stateDistricts } = useStateDistricts(formikProps.values.state)

    //district
    useEffect(() => {
        if (stateDistricts) {
            dispatch(setAllDistrict(stateDistricts))
        }
    }, [stateDistricts, dispatch])
    //state
    useEffect(() => {
        if (stateByCountry) {
            dispatch(setAllStates(stateByCountry))
        }
    }, [stateByCountry, dispatch])

    //district
    // useEffect(() => {
    //     if (!districtIsLoading && !districtIsFetching) {
    //         dispatch(setAllDistrict(districtData?.data))
    //     }
    // }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    dropdownOptions = {
        ...dropdownOptions,
        stateOption: allStates?.map((schemeItem: any) => {
            return {
                label: schemeItem?.stateName,
                value: schemeItem?._id,
            }
        }),
        districtOptions: allDistricts?.map((ele: any) => {
            return { label: ele?.districtName, value: ele?._id }
        }),
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
                        {/* FirstName */}
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
                            onChange={(e) =>
                                handleSetFieldValue('channelGroupId', e)
                            }
                            options={dropdownOptions.channelGroupOptions}
                            label="Channel Group"
                        />
                        <ATMSelectSearchable
                            options={dropdownOptions.categoryOption}
                            required
                            name="channelCategory"
                            value={values.channelCategory}
                            label="Channel Category "
                            onChange={(value) =>
                                handleSetFieldValue('channelCategory', value)
                            }
                        />{' '}
                        {/* <ATMTextArea
                                name="address"
                                value={values.address}
                                label="Address Name"
                                placeholder="Address Name"
                                onChange={(e) => handleSetFieldValue('address', e)}
                            /> */}
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
                            options={dropdownOptions.countryOption}
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
                            options={dropdownOptions.stateOption || []}
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
                            options={dropdownOptions.languageOption}
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
                            onChange={(e) =>
                                handleSetFieldValue('website', e.target.value)
                            }
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
