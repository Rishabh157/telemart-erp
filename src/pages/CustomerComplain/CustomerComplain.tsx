import { FormikProps } from 'formik'
import React from 'react'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import {
    CustomerDetailsPropsTypes,
    FormInitialValues,
} from './CustomerComplainWrapper'
import ComplaintListingWrapper from './components/ComplaintListing/ComplaintListingWrapper'
import CustomerComplainHeader from './components/CustomerComplainHeader'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import CustomerComplainOrderDetailsWrapper from './components/CustomerComplainOrderDetails/CustomerComplainOrderDetailsWrapper'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { CircularProgress } from '@mui/material'
import AddCustomerComplaintDetailsWrapper from './components/CustomerComplaintDetails/AddCustomerComplaintDetailsWrapper'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    customerDetails: CustomerDetailsPropsTypes
    column?: any[]
    rows?: any[]
    apiStatus: boolean
    contactNumber: string
}

const CustomerComplain: React.FC<Props> = ({
    formikProps,
    customerDetails,
    column,
    apiStatus,
    contactNumber,
}) => {
    const { values, setFieldValue, handleSubmit } = formikProps
    const [selectedOrderId, setSelectedOrderId] = React.useState<string>('')
    // const [activeTab, setActiveTab] = React.useState<string>('ORDER')
    const [
        isOpenCustomerComplaitDetailModel,
        setIsOpenCustomerComplaitDetailModel,
    ] = React.useState<boolean>(false)

    // Show Create Complain Modal
    const [isOpenCreateComplaitModel, setIsOpenCreateComplaitModel] =
        React.useState<boolean>(false)

    return (
        <SideNavLayout>
            <div className="bg-white px-2 h-[calc(100vh-55px)]">
                {/* <CallerPageTopNav agentName={values.agentName as string} /> */}
                <div>
                    {apiStatus && (
                        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-[500000] bg-slate-100 opacity-50">
                            <CircularProgress size={26} />
                        </div>
                    )}
                    <CustomerComplainHeader
                        values={values}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        customerDetails={customerDetails}
                    />
                </div>

                <div className="w-full mt-2">
                    <h1 className="text-sm font-semibold px-2">Orders</h1>
                    {/* Showing Order Details Form After Clicking The Order */}
                    <DialogLogBox
                        isOpen={isOpenCustomerComplaitDetailModel}
                        handleClose={() =>
                            setIsOpenCustomerComplaitDetailModel(false)
                        }
                        component={
                            <CustomerComplainOrderDetailsWrapper
                                orderId={selectedOrderId}
                                // setIsOpenCustomerOrderModel={
                                //     setIsOpenCustomerComplaitDetailModel
                                // }
                                setIsOpenCustomerOrderModel={() =>
                                    setIsOpenCreateComplaitModel(true)
                                }
                                handleClose={() =>
                                    setIsOpenCustomerComplaitDetailModel(false)
                                }
                            />
                        }
                    />

                    {/* Create Complain Modal From */}
                    <DialogLogBox
                        isOpen={isOpenCreateComplaitModel}
                        handleClose={() =>
                            setIsOpenCreateComplaitModel(false)  // cross button close modal
                        }
                        component={
                            <AddCustomerComplaintDetailsWrapper
                                orderId={selectedOrderId}
                                handleClose={() => 
                                    setIsOpenCreateComplaitModel(false) // api calling close modal
                                }
                            />
                        }
                    />

                    <div className="border-[1px] border-grey-700 max-h-[350px] overflow-y-scroll ">
                        <ATMTable
                            // headerClassName="bg-[#cdddf2] py-2 text-white z-0"
                            columns={column || []}
                            rows={customerDetails?.orderListing}
                            onRowClick={(row) => {
                                setIsOpenCustomerComplaitDetailModel(true)
                                setSelectedOrderId(row?._id)
                            }}
                        />
                    </div>
                </div>

                {/* Complaints History Table */}
                <div className="w-full my-4">
                    <h1 className="text-sm font-semibold my-1 px-2 ">
                        Complaints History
                    </h1>
                    <div className="h-[calc(94%)] overflow-y-scroll ">
                        <ComplaintListingWrapper
                            contactNumber={contactNumber}
                        />
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default CustomerComplain
