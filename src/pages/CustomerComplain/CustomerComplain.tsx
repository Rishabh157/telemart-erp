import React from 'react'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CustomerComplainWrapper'
import { FormikProps } from 'formik'
import CustomerComplainHeader from './components/CustomerComplainHeader'
import { CustomerDetailsPropsTypes } from './CustomerComplainWrapper'
import CustomerComplainOrderDetails from './components/CustomerComplainOrderDetails'
// import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    customerDetails: CustomerDetailsPropsTypes
    column?: any[]
    rows?: any[]
}

const CustomerComplain: React.FC<Props> = ({
    formikProps,
    customerDetails,
    column,
}) => {
    const { values, setFieldValue, handleSubmit } = formikProps

    console.log('inside the state ', customerDetails)

    return (
        <div className="bg-white px-4">
            {/* <CallerPageTopNav agentName={values.agentName as string} /> */}
            <CustomerComplainHeader
                values={values}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                customerDetails={customerDetails}
            />

            {/* Data Table  */}
            <div className="border-[1px] border-grey-700 h-40 overflow-y-scroll">
                <ATMTable
                    headerClassName="bg-[#cdddf2] py-2 text-white z-0"
                    columns={column || []}
                    rows={customerDetails?.orderListing}
                    onRowClick={(row) => console.log('CLICK ROW', row)}
                />
            </div>

            <CustomerComplainOrderDetails
                values={values}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                customerDetails={customerDetails}
            />
        </div>
    )
}

export default CustomerComplain
