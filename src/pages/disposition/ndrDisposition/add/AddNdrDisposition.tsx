import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { FormInitialValues } from './AddNdrDispositionWrapper'
import {
    smstypeOptions,
    emailTypeOptions,
    priorityOptions,
    ndrSubDispositionsTypeOptions,
    rtoAttemptTypeOptions,
} from 'src/utils/constants/customeTypes'
import { handleValidCharchater } from 'src/utils/methods/charchterMethods'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddNdrDisposition = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'NDR Disposition',
            path: '/dispositions/ndr-disposition',
        },
        {
            label: 'Add ',
        },
    ]

    const dispatch = useDispatch()

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="p-4 flex flex-col gap-2  ">
            {/* Breadcrumbs */}
            <div>
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading> Add </ATMPageHeading>
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
                        {/* languageName */}
                        <ATMTextField
                            required
                            name="ndrDisposition"
                            value={values.ndrDisposition}
                            label="Disposition Name"
                            placeholder="Name"
                            onChange={(e: any) => {
                                // Check if the pressed key is backspace
                                if (
                                    e.nativeEvent.inputType ===
                                    'deleteContentBackward'
                                ) {
                                    // If backspace, remove the last character
                                    handleSetFieldValue(
                                        'ndrDisposition',
                                        e.target.value
                                    )
                                } else {
                                    // If not backspace, perform character validation
                                    if (!values.ndrDisposition) {
                                        handleSetFieldValue(
                                            'ndrDisposition',
                                            e.target.value
                                        )
                                    } else {
                                        handleValidCharchater(e) &&
                                            handleSetFieldValue(
                                                'ndrDisposition',
                                                e.target.value
                                            )
                                    }
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            options={smstypeOptions()}
                            name="smsType"
                            textTransform=""
                            value={values.smsType}
                            label="SMS Type"
                            onChange={(e) => handleSetFieldValue('smsType', e)}
                        />

                        <ATMSelectSearchable
                            required
                            options={emailTypeOptions()}
                            name="emailType"
                            value={values.emailType}
                            label="Email Type"
                            onChange={(e) =>
                                handleSetFieldValue('emailType', e)
                            }
                        />
                        <ATMSelectSearchable
                            required
                            name="priority"
                            value={values.priority}
                            label="Priority"
                            options={priorityOptions()}
                            onChange={(e) => handleSetFieldValue('priority', e)}
                        />

                        <ATMSelectSearchable
                            required
                            options={rtoAttemptTypeOptions()}
                            name="rtoAttempt"
                            value={values.rtoAttempt}
                            label="RTO Attempt"
                            textTransform=""
                            onChange={(e) =>
                                handleSetFieldValue('rtoAttempt', e)
                            }
                        />

                        <ATMSelectSearchable
                            required
                            isMulti
                            options={ndrSubDispositionsTypeOptions()}
                            name="subDispositions"
                            value={values.subDispositions}
                            label="Sub Disposition"
                            onChange={(e) =>
                                handleSetFieldValue('subDispositions', e)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNdrDisposition
