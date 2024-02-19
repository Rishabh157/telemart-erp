import React from 'react'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { FormInitialValues } from './CustomerComplainWrapper'
import { FormikProps } from 'formik'
import CustomerComplainHeader from './components/CustomerComplainHeader'
import { CustomerDetailsPropsTypes } from './CustomerComplainWrapper'
import CustomerComplainOrderDetailsWrapper from './components/CustomerComplainOrderDetails/CustomerComplainOrderDetailsWrapper'
import ComplaintListingWrapper from './components/ComplaintListing/ComplaintListingWrapper'
import { CiBoxList } from 'react-icons/ci'
import { MdOutlineFormatListNumbered } from 'react-icons/md'

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
    const [selectedOrderId, setSelectedOrderId] = React.useState<string>('LLL')
    const [activeTab, setActiveTab] = React.useState<string>('ORDER')

    return (
        <div className="bg-white px-4">
            {/* <CallerPageTopNav agentName={values.agentName as string} /> */}
            <CustomerComplainHeader
                values={values}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                customerDetails={customerDetails}
            />

            {/* Tabs */}
            <div className="flex gap-x-4">
                <div
                    className={`flex cursor-pointer font-semibold p-1 rounded ${
                        activeTab === 'ORDER' && 'bg-[#03314e] text-white'
                    }`}
                    onClick={() => setActiveTab('ORDER')}
                >
                    <div className=" text-sm mr-2 mt-1 ">
                        <CiBoxList />
                    </div>
                    <div className="text-sm">Orders</div>
                </div>
                <div
                    className={`flex cursor-pointer font-semibold p-1 rounded ${
                        activeTab === 'COMPLAINT' && 'bg-[#03314e] text-white'
                    }`}
                    onClick={() => setActiveTab('COMPLAINT')}
                >
                    <div className=" text-sm mr-2 mt-1 ">
                        <MdOutlineFormatListNumbered />
                    </div>
                    <div className="text-sm">Complains</div>
                </div>
            </div>

            {activeTab === 'ORDER' &&
                (selectedOrderId !== '' ? (
                    <CustomerComplainOrderDetailsWrapper
                        orderId={selectedOrderId}
                    />
                ) : (
                    <div className="border-[1px] border-grey-700 h-auto overflow-y-scroll">
                        <ATMTable
                            headerClassName="bg-[#cdddf2] py-2 text-white z-0"
                            columns={column || []}
                            rows={customerDetails?.orderListing}
                            onRowClick={(row) => setSelectedOrderId(row?._id)}
                        />
                    </div>
                ))}

            {/* Listing Of Complaint When Complaint tab is active */}
            {activeTab === 'COMPLAINT' && <ComplaintListingWrapper />}
        </div>
    )
}

export default CustomerComplain
