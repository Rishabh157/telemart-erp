// Filename:AddAttributeGroup.tsx
// Type: Add Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddAttributeGroupWrapper'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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
        label: 'Add',
    },
]

const AddAttributeGroup = ({ formikProps, allItems, apiStatus }: Props) => {
    const [allOptions, setAllOtions] = useState([])
    const [flag, setFlag] = useState(true)
    const attributeOptions = allItems?.map((ele: any) => {
        return { label: ele.attributeName, value: ele._id }
    })
    useEffect(() => {
        if (flag && attributeOptions?.length) {
            setFlag(false)
            setAllOtions(attributeOptions)
        }
    }, [flag, attributeOptions])

    const { values, setFieldValue } = formikProps
    const options: { label: string; value: string }[] = allOptions

    const transferListProps = {
        name: 'attributes',
        options,
        right: values.attributes,
        setRight: (newValue: { label: string; value: string }[]) =>
            setFieldValue('attributes', newValue),
        leftSideTitle: 'All Attributes',
        rightSideTitle: 'Attributes to add',
    }

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100%-55px)]">
            <div className="p-4 h-[calc(100%-55px)] flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Attributes Group </ATMPageHeading>
                </div>

                <div className="grow h-[100%] bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat py-2">
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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pb-9 pt-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}
                            <ATMTextField
                                required
                                name="group_name"
                                value={values.group_name}
                                label="Group Name"
                                placeholder="Group Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'group_name',
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="h-[300px] mt-8">
                            {options ? (
                                <ATMTransferList {...transferListProps} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAttributeGroup
