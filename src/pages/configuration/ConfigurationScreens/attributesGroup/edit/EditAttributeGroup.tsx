// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { useDispatch } from 'react-redux'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTransferList from 'src/components/UI/atoms/ATMTransferList/ATMTransferList'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { FormInitialValues } from './EditAttributeGroupWrapper'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    attributeOptions: [] | any
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

const EditAttributeGroup = ({
    formikProps,
    apiStatus,
    attributeOptions = [],
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [flag, setFlag] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<
        { label: string; value: string }[]
    >([])

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.attributes, flag])

    const transferListProps = {
        name: 'attributes',
        options: filteredOptions,
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
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Edit </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
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
                    <div className="px-3 pt-2 grow pb-9 ">
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
