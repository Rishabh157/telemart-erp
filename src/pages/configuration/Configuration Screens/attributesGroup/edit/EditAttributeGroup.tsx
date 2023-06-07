/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditAttributeGroupWrapper'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    allItems: any
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Attributes Group',
        path: '/configurations/attributes-group',
    },
    {
        label: 'Add ',
    },
]

const EditAttributeGroup = ({ formikProps, allItems, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const [flag, setFlag] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<
        { label: string; value: string }[]
    >([])
    const attributeOptions = allItems?.map((ele: any) => {
        return { label: ele.attributeName, value: ele._id }
    })
    useEffect(() => {
        if (attributeOptions?.length) setFlag(true)
    }, [attributeOptions])

    useEffect(() => {
        if (flag) {
            const result = attributeOptions?.filter((obj: any) => {
                return !values.attributes.some(
                    (obj2) =>
                        obj2.label === obj.label && obj2.value === obj.value
                )
            })
            setFilteredOptions(result || [])
        }
    }, [values.attributes, flag])

    const transferListProps = {
        name: 'attributes',
        options: filteredOptions,
        right: values.attributes,
        setRight: (newValue: { label: string; value: string }[]) =>
            setFieldValue('attributes', newValue),
        leftSideTitle: 'All Atrributes',
        rightSideTitle: 'Attributes to add',
    }
    return (
        <div className="h-[calc(100%-55px)]">
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
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pb-9 pt-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}
                            <ATMTextField
                                name="group_name"
                                value={values.group_name}
                                label="Group Name"
                                placeholder="Group Name"
                                onChange={(e) =>
                                    setFieldValue('group_name', e.target.value)
                                }
                            />
                        </div>

                        <div className="h-[300px] mt-8 overflow-auto ">
                            {filteredOptions ? (
                                <ATMTransferList {...transferListProps} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAttributeGroup
