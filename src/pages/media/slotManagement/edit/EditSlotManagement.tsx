import React from 'react'
import { FormikProps } from 'formik'

import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTimePicker from 'src/components/UI/atoms/formFields/ATMTimePicker/ATMTimePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMRadioButton from 'src/components/UI/atoms/formFields/ATMRadioButton/ATMRadioButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { FormInitialValues } from './EditSlotManagementWrapper'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        categoryOption: SelectOption[]
        channelMgtOptions: SelectOption[]
        tapeMangementOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Slot Management',
        path: '/media/slot',
    },
    {
        label: 'Update Slot',
    },
]

const EditSlotManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    // const {
    //     data: stateData,
    //     isLoading: stateIsLoading,
    //     isFetching: stateIsFetching,
    // } = useGetAllStateByCountryQuery(formikProps.values.country, {
    //     skip: !formikProps.values.country,
    // })
    // const {
    //     data: districtData,
    //     isLoading: districtIsLoading,
    //     isFetching: districtIsFetching,
    // } = useGetAllDistrictByStateQuery(formikProps.values.state, {
    //     skip: !formikProps.values.state,
    // })
    // useEffect(() => {
    //     dispatch(setAllStates(stateData?.data))
    // }, [stateData, stateIsLoading, stateIsFetching, dispatch])

    //district
    // useEffect(() => {
    //     dispatch(setAllDistrict(districtData?.data))
    // }, [districtData, districtIsLoading, districtIsFetching, dispatch])

    dropdownOptions = {
        ...dropdownOptions,
        // stateOption: allStates?.map((schemeItem: any) => {
        //     return {
        //         label: schemeItem?.stateName,
        //         value: schemeItem?._id,
        //     }
        // }),
        // districtOptions: allDistricts?.map((ele: any) => {
        //     return { label: ele?.districtName, value: ele?._id }
        // }),
    }

    // const options = ['FIXED', 'FLEXIBLE']
    const options = [
        {
            label: 'Fixed',
            value: 'FIXED',
        },
        {
            label: 'Flexible',
            value: 'FLEXIBLE',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
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
                    <ATMPageHeading> Update Slot</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">Slot Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="slotName"
                                value={values.slotName}
                                label="Slot Name"
                                required
                                placeholder="Slot Name"
                                onChange={(e) => {
                                    //console.log(e.target.value)
                                    handleSetFieldValue(
                                        'slotName',
                                        e.target.value
                                    )
                                }}
                            />
                            <ATMSelectSearchable
                                name="channelGroupId"
                                value={values.channelGroupId}
                                onChange={(e) =>
                                    handleSetFieldValue('channelGroupId', e)
                                }
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />
                            <div className="">
                                <ATMRadioButton
                                    name="type"
                                    label="Type"
                                    options={options}
                                    value={values.type}
                                    onChange={(value) => {
                                        handleSetFieldValue('type', value)
                                    }}
                                    required={true}
                                />
                            </div>
                            <div className="">
                                <ATMSelectSearchable
                                    name="channelNameId"
                                    required
                                    value={values.channelNameId}
                                    onChange={(e) =>
                                        handleSetFieldValue('channelNameId', e)
                                    }
                                    options={dropdownOptions.channelMgtOptions}
                                    label="Channel Name"
                                />
                            </div>
                            <ATMSelectSearchable
                                name="tapeNameId"
                                required
                                value={values.tapeNameId}
                                onChange={(e) =>
                                    handleSetFieldValue('tapeNameId', e)
                                }
                                options={dropdownOptions.tapeMangementOptions}
                                label="Tape Name"
                            />
                            <ATMTextField
                                name="channelTrp"
                                value={values.channelTrp}
                                label="Channel Trp   "
                                placeholder="Channel Trp "
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'channelTrp',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextArea
                                name="remarks"
                                value={values.remarks}
                                label="Remarks "
                                placeholder="Remarks "
                                onChange={(newValue) =>
                                    handleSetFieldValue('remarks', newValue)
                                }
                            />{' '}
                        </div>
                        <div className="px-3 pt-5">
                            <div className=" text-lg pb-2 font-medium text-primary-main">
                                Slot Details
                            </div>
                            <div className="grid grid-cols-3 gap-2 items-end  pb-5">
                                <div className="flex-[3_3_0%]">
                                    <ATMDatePicker
                                        name="slotDate"
                                        value={values.slotDate}
                                        label="Date"
                                        dateTimeFormat="MM/DD/YY ddd"
                                        onChange={(newValue) =>
                                            handleSetFieldValue(
                                                'slotDate',
                                                newValue
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex-[3_3_0%]">
                                    <ATMTimePicker
                                        name="slotEndTime"
                                        value={values.slotEndTime || null}
                                        label="Enddate Time"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotEndTime',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                                <div className="flex-[3_3_0%]">
                                    <ATMTimePicker
                                        name={'slotStartTime'}
                                        value={values.slotStartTime || null}
                                        label="Startdate Time"
                                        onChange={(newValue) => {
                                            handleSetFieldValue(
                                                'slotStartTime',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSlotManagement
