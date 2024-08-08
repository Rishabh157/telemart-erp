// |-- Built-in Dependencies --|
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import MainLayout from 'src/components/layouts/MainLayout/MainLayout'

// |-- Redux --|
import { FormInitialValues } from './CreateOrderWrapper'
import { FormikProps } from 'formik'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const CreateOrder = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch()

    // Hooks
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const callTypeOptions = [
        {
            label: 'Inbound',
            value: 'INBOUND',
        },
        {
            label: 'Outbound',
            value: 'OUTBOUND',
        },
        {
            label: 'Manual',
            value: 'MANUAL',
        },
    ]

    return (
        <MainLayout>
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                {/* <div className="font-bold text-black ">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div> */}

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Page Details </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Create Order Details
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                                onClick={() => formikProps.handleSubmit()}
                            >
                                Redirect
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4 pb-3">
                            <ATMTextField
                                required
                                disabled
                                readOnly
                                name="userName"
                                InfoTitle="please Enter full name "
                                value={values?.userName}
                                label="User Name"
                                placeholder="Enter username"
                                onChange={(e) => {}}
                            />

                            <ATMTextField
                                required
                                name="didNumber"
                                InfoTitle="please Enter full name "
                                value={values?.didNumber}
                                label="DID Number"
                                placeholder="Enter Did Number"
                                onChange={(e) => {
                                    handleSetFieldValue(
                                        'didNumber',
                                        e.target.value
                                    )
                                }}
                            />

                            <ATMTextField
                                required
                                name="campaignName"
                                InfoTitle="please Enter full name "
                                value={values?.campaignName}
                                label="Campaign"
                                placeholder="Campaign Name"
                                onChange={(e) => {
                                    handleSetFieldValue(
                                        'campaignName',
                                        e.target.value
                                    )
                                }}
                            />

                            <ATMTextField
                                required
                                name="mobileNumber"
                                value={values?.mobileNumber}
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'mobileNumber',
                                            e.target.value
                                        )
                                    }
                                }}
                            />

                            {/* Branch Name */}
                            <ATMSelectSearchable
                                required
                                name="callType"
                                label="Calltype"
                                options={callTypeOptions}
                                value={values?.callType}
                                onChange={(e) => {
                                    handleSetFieldValue('callType', e)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreateOrder
