import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './ViewDispositionThreeWrapper'
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
        label: ' Disposition Three',
        path: '/dispositions/disposition-three',
    },
    {
        label: 'View',
    },
]

const ViewDispositionThree = ({ formikProps }: Props) => {
    const { values } = formikProps

    // dropdownOptions = {
    //     ...dropdownOptions,
    // }

    return (
        <div >
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
                        <div className="grid gap-2 text-l">
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    <span>Disposition Name:</span>
                                </label>
                                <span >
                                    {values.dispositionName}
                                </span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Disposition One:
                                </label>
                                <span>{values.dispositionOneId}</span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Disposition Two:
                                </label>
                                <span>{values.dispositionTwoId}</span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    SMS Type:
                                </label>
                                <span>
                                    {values?.smsType?.replaceAll('_', ' ') ||
                                        'NA'}
                                </span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Email Type:
                                </label>
                                <span>
                                    {values?.emailType?.replaceAll('_', ' ') ||
                                        'NA'}
                                </span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Whatsapp Template:
                                </label>
                                <span>
                                    {values?.whatsApp?.replaceAll('_', ' ') ||
                                        'NA'}
                                </span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Priority:
                                </label>
                                <span>{values?.priority || 'NA'}</span>
                            </div>
                            <div className="flex mb-2">
                                <label className="w-60 font-medium text-l">
                                    Applicable Criteria:
                                </label>
                                <div className="flex  gap-3">
                                    {values.applicableCriteria.map(
                                        (criteria) => (
                                            <div
                                                key={criteria}
                                                className="flex gap-x-4 items-center"
                                            >
                                                <ImCheckboxChecked
                                                    size={22}
                                                    color="#87A922"
                                                />
                                                <span className="gap-8">
                                                    {criteria?.replaceAll(
                                                        '_',
                                                        ' '
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* Render other fields as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDispositionThree
