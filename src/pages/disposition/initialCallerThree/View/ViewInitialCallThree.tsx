import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './ViewInitialCallThreeWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { ImCheckboxChecked } from 'react-icons/im'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Initial Call Three',
        path: '/dispositions/initialCall-three',
    },
    {
        label: 'View',
    },
]

const ViewInitialCallThree = ({ formikProps }: Props) => {
    const { values } = formikProps

    return (
        <div className="p-4 flex flex-col gap-2  ">
            {/* Breadcrumbs */}
            <div >
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading> View</ATMPageHeading>
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium">Details</div>

                    {/* BUTTON - Add Button */}
                </div>

                {/* Form */}
                <div className="grow py-8 px-3 ">
                    <div className="grid  gap-2 text-l">
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                <span>Initialcall Name:</span>
                            </label>
                            <span >{values?.initialCallName}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Initialcall One:
                            </label>
                            <span>{values?.initialCallOneId}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Initialcall Two:
                            </label>
                            <span>{values?.initialCallTwoId}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Sms Type:
                            </label>
                            <span>{values?.smsType?.replaceAll('_', ' ')}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Email Type:
                            </label>
                            <span className="capitalize">
                                {values?.emailType?.replaceAll('_', ' ')}
                            </span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Cancel Flag:
                            </label>
                            <span>{values?.cancelFlag ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Pnd:
                            </label>
                            <span>{values?.isPnd ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex mb-2">
                            <label className="w-60 font-medium text-l">
                                Return Type:
                            </label>
                            <div className="flex  gap-3">
                                {values?.returnType?.map((criteria) => (
                                    <div
                                        key={criteria}
                                        className="flex gap-x-4 items-center"
                                    >
                                        <ImCheckboxChecked
                                            size={22}
                                            color="#87A922"
                                        />
                                        <span>{criteria}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Render other fields as needed */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewInitialCallThree
