// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddBarcodeWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import moment from 'moment'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetVendorsQuery } from 'src/services/VendorServices'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    productGroupOption: SelectOption[]
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Barcode',
        path: '/configurations/barcode',
    },
    {
        label: 'Add Barcode',
    },
]

const AddBarcode = ({ formikProps, apiStatus, productGroupOption }: Props) => {


    const [vendorId, setVendorId] = React.useState<string>('');
    const { values, setFieldValue } = formikProps

    // Get all vendors
    const { options: vendorOptions } = useCustomOptions({
        useEndPointHook: useGetVendorsQuery(''),
        keyName: 'companyName',
        value: '_id',
    })

    const dispatch = useDispatch()

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <MainLayout>
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Barcode </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Product Group
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">

                            <ATMSelectSearchable
                                required
                                name="vendorId"
                                value={vendorId}
                                // selectLabel=''
                                label="Vendor"
                                isValueWithLable
                                options={vendorOptions}
                                onChange={(e) => {
                                    setVendorId(e?.value)
                                    handleSetFieldValue('vendorId', e?.label)
                                }}
                            />


                            <ATMTextField
                                required
                                name="lotNumber"
                                maxLength={6}
                                value={values.lotNumber}
                                label="Batch Number"
                                placeholder="Batch Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'lotNumber',
                                            e.target.value
                                        )
                                    }
                                }}
                            />

                            <ATMTextField
                                required
                                name="invoiceNumber"
                                value={values.invoiceNumber}
                                label="Invoice Number"
                                placeholder="Invoice Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'invoiceNumber',
                                            e.target.value
                                        )
                                    }
                                }}
                            />

                            <ATMSelectSearchable
                                required
                                name="productGroup"
                                value={values.productGroup}
                                label="Product Group"
                                onChange={(e) =>
                                    handleSetFieldValue('productGroup', e)
                                }
                                options={productGroupOption}
                            />

                            <ATMTextField
                                required
                                name="quantity"
                                value={values.quantity}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'quantity',
                                            e.target.value
                                        )
                                    }
                                }}
                            />

                            <div className='mt-5'>
                                <ATMDatePicker
                                    label="Expiry Date"
                                    name="expiryDate"
                                    value={values.expiryDate}
                                    placeholder='DD/MM/YYYY'
                                    dateTimeFormat="DD/MM/YYYY"
                                    onChange={(e) => {
                                        setFieldValue(
                                            'expiryDate',
                                            moment(e).format('YYYY-MM-DD')
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default AddBarcode
