// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddHouseArrestFormWrapper'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import { useGetAllInitialCallTwoByCallTypeAndOneId } from 'src/hooks/useGetAllInitialCallTwoByCallTypeAndOneId'
import { useGetAllInitialCallThreeByCallTypeAndTwoId } from 'src/hooks/useGetAllInitialCallThreeByCallTypeAndTwoId'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useGetAllInitialByCallType } from 'src/hooks/useGetAllInitialByCallType'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'House Arrest',
        path: '/request/house-arrest',
    },
    {
        label: 'Add House Arrest',
    },
]

const AddHouseArrestForm = ({ formikProps, apiStatus }: Props) => {
    const GET_IC_TWO_OPTION_BY_IC_ONE = 'DELIVERYBOYHOUSEARRESTCASE'
    const [icOneId, setIcOneId] = useState<string>('')

    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()

    // Get IC1 Option By Only Call Type
    const { initialCallOneByCallType, isDataLoading } =
        useGetAllInitialByCallType('COMPLAINT')

    // Set the Ic one value for getting ic
    useEffect(() => {
        if (!isDataLoading) {
            const foundedIcOne = initialCallOneByCallType?.find(
                (ele: any) => ele?.originalLabel === GET_IC_TWO_OPTION_BY_IC_ONE
            )
            setIcOneId(foundedIcOne?.value)
        }
    }, [isDataLoading, initialCallOneByCallType])

    // Get IC2 Option By Call Type And IC1 _id
    const {
        initialCallTwoByCallTypeAndOneId,
        isDataLoading: isInitialCallTwoDataLoaading,
    } = useGetAllInitialCallTwoByCallTypeAndOneId(icOneId, 'COMPLAINT')

    // Get IC3 Option By Call Type And IC2 _id
    const {
        initialCallThreeByCallTypeAndTwoId,
        isDataLoading: isInitialCallThreeDataLoaading,
    } = useGetAllInitialCallThreeByCallTypeAndTwoId(
        values.initialCallTwo,
        'COMPLAINT'
    )

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100vh-120px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> House Arrest </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            House Arrest Details
                        </div>
                        {/* BUTTON - Add SO */}
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
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-3">
                            <ATMTextField
                                label="Order Number"
                                name="orderNumber"
                                value={values.orderNumber}
                                placeholder="Enter order number"
                                labelClass="text-slate-700 text-sm font-medium mb-1"
                                extraClassField="mt-1"
                                className="shadow bg-white rounded mt-0"
                                onChange={(e) =>
                                    handleValidNumber(e) &&
                                    handleSetFieldValue(
                                        'orderNumber',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMSelectSearchable
                                required
                                componentClass="mt-1"
                                label="IC2"
                                size="xs"
                                labelSize="xs"
                                selectLabel="select IC2"
                                name="initialCallTwo"
                                value={values.initialCallTwo || ''}
                                options={initialCallTwoByCallTypeAndOneId}
                                isLoading={isInitialCallTwoDataLoaading}
                                onChange={(e) => {
                                    setFieldValue('initialCallTwo', e || '')
                                }}
                            />

                            <ATMSelectSearchable
                                required
                                componentClass="mt-1"
                                label="IC3"
                                size="xs"
                                labelSize="xs"
                                selectLabel="select IC3"
                                name="initialCallThree"
                                value={values.initialCallThree || ''}
                                options={initialCallThreeByCallTypeAndTwoId}
                                isLoading={isInitialCallThreeDataLoaading}
                                onChange={(e) => {
                                    handleSetFieldValue('initialCallThree', e)
                                }}
                            />

                            <ATMTextArea
                                required
                                label="Remark"
                                minRows={4}
                                name="remark"
                                value={values.remark}
                                placeholder="remark"
                                className="rounded"
                                onChange={(newValue: string) =>
                                    setFieldValue('remark', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHouseArrestForm
