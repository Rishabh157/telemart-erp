import { FormikProps } from 'formik'
import React, { useEffect } from 'react'
import { FormInitialValues } from './AddChannelManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllStateByCountryQuery } from 'src/services/StateService'
import { RootState } from 'src/redux/store'
import { setAllStates } from 'src/redux/slices/statesSlice'
import { setAllDistrict } from 'src/redux/slices/districtSlice'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
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
        path: '/media/channel-management',
    },
    {
        label: 'Add Channel',
    },
]

const AddChannelManagement = ({
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
    const {
        data: stateData,
        isLoading: stateIsLoading,
        isFetching: stateIsFetching,
    } = useGetAllStateByCountryQuery(formikProps.values.country, {
        skip: !formikProps.values.country,
    })
    const {
        data: districtData,
        isLoading: districtIsLoading,
        isFetching: districtIsFetching,
    } = useGetAllDistrictByStateQuery(formikProps.values.state, {
        skip: !formikProps.values.state,
    })
    useEffect(() => {
        dispatch(setAllStates(stateData?.data))
    }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    //district
    useEffect(() => {
        dispatch(setAllDistrict(districtData?.data))
    }, [districtData, districtIsLoading, districtIsFetching, dispatch])

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
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading>
                        {' '}
                        Add New Channel (Changes Area field)
                    </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Channel Details
                        </div>

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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="channelName"
                                value={values.channelName}
                                label="Channel Name"
                                required
                                placeholder="Channel Name"
                                onChange={(e) =>
                                    setFieldValue('channelName', e.target.value)
                                }
                            />
                            <ATMSelectSearchable
                                name="channelGroupId"
                                required
                                value={values.channelGroupId}
                                onChange={(e) =>
                                    setFieldValue('channelGroupId', e)
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
                                    setFieldValue('channelCategory', value)
                                }
                            />{' '}
                            <ATMTextArea
                                name="address"
                                value={values.address}
                                label="Address Name"
                                placeholder="Address Name"
                                onChange={(e) => setFieldValue('address', e)}
                            />
                            <ATMTextField
                                name="contactPerson"
                                value={values.contactPerson}
                                label="Contact Person"
                                placeholder="Contact Person"
                                onChange={(e) =>
                                    setFieldValue(
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
                                    setFieldValue('designation', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="phone"
                                value={values.phone}
                                label="Phone"
                                placeholder="Phone"
                                onChange={(e) =>
                                    setFieldValue('phone', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="mobile"
                                value={values.mobile}
                                label="Mobile   "
                                placeholder="Mobile "
                                onChange={(e) =>
                                    setFieldValue('mobile', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="website"
                                value={values.website}
                                label="Website "
                                placeholder="Website "
                                onChange={(e) =>
                                    setFieldValue('website', e.target.value)
                                }
                            />{' '}
                            <ATMTextField
                                name="email"
                                value={values.email}
                                label="Email Id"
                                placeholder="Email Id"
                                onChange={(e) =>
                                    setFieldValue('email', e.target.value)
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
                                    setFieldValue('country', value)
                                }}
                            />
                            <ATMSelectSearchable
                                options={dropdownOptions.stateOption || []}
                                name="state"
                                required
                                value={values.state}
                                label="State"
                                onChange={(value) =>
                                    setFieldValue('state', value)
                                }
                            />
                            <ATMSelectSearchable
                                options={dropdownOptions.districtOptions || []}
                                name="area"
                                required
                                value={values.area}
                                label="Area"
                                onChange={(value) =>
                                    setFieldValue('area', value)
                                }
                            />
                            <ATMSelectSearchable
                                options={dropdownOptions.languageOption}
                                name="language"
                                value={values.language}
                                label="Language"
                                onChange={(value) =>
                                    setFieldValue('language', value)
                                }
                            />
                            <ATMTextField
                                name="paymentType"
                                required
                                value={values.paymentType}
                                label="Payment Type"
                                placeholder="Payment Type"
                                onChange={(e) =>
                                    setFieldValue('paymentType', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChannelManagement
