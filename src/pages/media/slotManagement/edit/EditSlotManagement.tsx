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
        label: ' Slot Management',
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

    const days = [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
    ]
    const optionss = days.map((ele: any) => {
        return {
            label: ele,
            value: ele,
        }
    })

    const options = ['FIXED', 'FLEXIBLE']

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Slot</ATMPageHeading>
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
                                    setFieldValue('slotName', e.target.value)
                                }}
                            />
                            <ATMSelectSearchable
                                name="channelGroupId"
                                value={values.channelGroupId}
                                onChange={(e) =>
                                    setFieldValue('channelGroupId', e)
                                }
                                options={dropdownOptions.channelGroupOptions}
                                label="Channel Group"
                            />
                            <div className="">
                                {/* <ATMMultiSelect
                                    name="days"
                                    value={selectedNames}
                                    onSelect={(e) => setSelectedNames(e.target.value)}
                                    required
                                    label='Days'
                                    options={days.map((week)=>week)}
                                    placeholder="days"
                                
                                    
                                /> */}
                                <ATMSelectSearchable
                                    name="days"
                                    value={values.days}
                                    onChange={(e) => {
                                        setFieldValue('days', e)
                                    }}
                                    options={optionss}
                                    label="Days"
                                    isMulti
                                />
                            </div>
                            <div className="">
                                <ATMRadioButton
                                    name="type"
                                    label="Type"
                                    options={options}
                                    value={values.type}
                                    onChange={(value) => {
                                        setFieldValue('type', value)
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
                                        setFieldValue('channelNameId', e)
                                    }
                                    options={dropdownOptions.channelMgtOptions}
                                    label="Channel Name"
                                />
                            </div>
                            <ATMSelectSearchable
                                name="tapeNameId"
                                required
                                value={values.tapeNameId}
                                onChange={(e) => setFieldValue('tapeNameId', e)}
                                options={dropdownOptions.tapeMangementOptions}
                                label="Tape Name"
                            />
                            <ATMTextField
                                name="channelTrp"
                                value={values.channelTrp}
                                label="Channel Trp   "
                                placeholder="Channel Trp "
                                onChange={(e) =>
                                    setFieldValue('channelTrp', e.target.value)
                                }
                            />
                            <ATMTextArea
                                name="remarks"
                                value={values.remarks}
                                label="Remarks "
                                placeholder="Remarks "
                                onChange={(newValue) =>
                                    setFieldValue('remarks', newValue)
                                }
                            />{' '}
                        </div>
                        <div className="px-3 pt-5">
                            <div className=" text-lg pb-2 font-medium text-primary-main">
                                Slot Details
                            </div>
                            <div className="flex gap-5 items-end  pb-5">
                                <div className="flex-[3_3_0%]">
                                    <ATMDatePicker
                                        name="slotDate"
                                        value={values.slotDate}
                                        label="Date"
                                        onChange={(newValue) =>
                                            setFieldValue('slotDate', newValue)
                                        }
                                    />
                                </div>
                                <div className="flex-[3_3_0%]">
                                    <ATMTimePicker
                                        name="slotEndTime"
                                        value={values.slotEndTime || null}
                                        label="Enddate Time"
                                        onChange={(newValue) => {
                                            setFieldValue(
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
                                            console.log(newValue)
                                            setFieldValue(
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
