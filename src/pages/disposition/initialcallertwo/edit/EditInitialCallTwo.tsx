import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'
import { complaintTypeOptions } from 'src/utils/constants/customeTypes'
import { FormInitialValues } from './EditInitialCallTwoWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const EditInitialCallTwo = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Initial Call Two',
            path: '/dispositions/initialCall-two',
        },
        {
            label: 'Edit',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { options :initicalCallOneOptions } = useCustomOptions({
        useEndPointHook: useGetAllinitialCallerOneQuery(
            values.callType,
            {
                skip: !values.callType,
            }
        ),
        keyName: 'initialCallDisplayName',
        value: '_id',
    })
    return (
        <div className="p-4 flex flex-col gap-2  ">
            {/* Breadcrumbs */}
            <div className="">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading> Edit </ATMPageHeading>
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium"> Details </div>

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
                        <div className="mt-2">
                            <ATMSelectSearchable
                                required
                                name="callType"
                                labelSpan="mb-2"
                                label="Call Type"
                                componentClass="mt-2"
                                value={values.callType}
                                options={complaintTypeOptions()}
                                onChange={(newValue: any) => {
                                    handleSetFieldValue('callType', newValue)
                                }}
                            />
                        </div>

                        <ATMSelectSearchable
                            required
                            options={initicalCallOneOptions}
                            name="initialCallOneId"
                            value={values.initialCallOneId}
                            label="Initial Call One"
                            labelClass="text-slate-700 text-sm font-medium"
                            componentClass="mt-4 rounded"
                            onChange={(e) =>
                                handleSetFieldValue('initialCallOneId', e)
                            }
                        />

                        <ATMTextField
                            required
                            readOnly
                            disabled
                            name="initialCallName"
                            value={values.initialCallDisplayName}
                            placeholder=" Name"
                            label="Initial Call Name"
                            labelClass="text-slate-700 text-sm font-medium mt-1"
                            className="mt-1 rounded"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'initialCallName',
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditInitialCallTwo
