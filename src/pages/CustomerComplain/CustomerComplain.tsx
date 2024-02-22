import { FormikProps } from 'formik'
import React from 'react'
// import { CiBoxList } from 'react-icons/ci'
// import { MdOutlineFormatListNumbered } from 'react-icons/md'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import { CustomerDetailsPropsTypes, FormInitialValues } from './CustomerComplainWrapper'
import ComplaintListingWrapper from './components/ComplaintListing/ComplaintListingWrapper'
import CustomerComplainHeader from './components/CustomerComplainHeader'
// import CustomerComplainOrderDetailsWrapper from './components/CustomerComplainOrderDetails/CustomerComplainOrderDetailsWrapper'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import CustomerComplainOrderDetailsWrapper from './components/CustomerComplainOrderDetails/CustomerComplainOrderDetailsWrapper'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'

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
    const [selectedOrderId, setSelectedOrderId] = React.useState<string>('')
    // const [activeTab, setActiveTab] = React.useState<string>('ORDER')
    const [
        isOpenCustomerComplaitDetailModel,
        setIsOpenCustomerComplaitDetailModel,
    ] = React.useState<boolean>(false)

    return (
        <SideNavLayout >
            <div className="bg-white px-2 h-[calc(100vh-55px)]">
                {/* <CallerPageTopNav agentName={values.agentName as string} /> */}
                <div className='h-[40vh]'>
                    <CustomerComplainHeader
                        values={values}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        customerDetails={customerDetails}
                    />
                </div>

                <div className='w-full h-[calc(60%)] mt-4 '>
                    <h1 className="text-sm font-semibold mb-2 px-2 ">
                        Orders
                    </h1>
                    <div className="border-[1px] border-grey-700 h-[calc(90%)]  overflow-y-scroll ">
                        {/* {selectedOrderId !== '' ? ( */}
                        {/* <div className='-mt-4'> */}
                        <DialogLogBox
                            isOpen={isOpenCustomerComplaitDetailModel}
                            handleClose={() =>
                                setIsOpenCustomerComplaitDetailModel(false)
                            }
                            component={
                                <CustomerComplainOrderDetailsWrapper
                                    orderId={selectedOrderId}
                                    setIsOpenCustomerOrderModel={setIsOpenCustomerComplaitDetailModel}
                                />
                            }
                        />
                        {/* <CustomerComplainOrderDetailsWrapper
                                    orderId={selectedOrderId}
                                    
                                /> */}
                        {/* </div> */}
                        {/* ) : */}
                        <ATMTable
                            // headerClassName="bg-[#cdddf2] py-2 text-white z-0   "
                            columns={column || []}
                            rows={customerDetails?.orderListing}
                            onRowClick={(row) => {
                                setIsOpenCustomerComplaitDetailModel(true)
                                setSelectedOrderId(row?._id)
                            }}
                        />
                        {/* } */}
                    </div>
                </div>


                <div className='w-full h-[calc(60%)] mb-4 '>
                    <h1 className="text-sm font-semibold my-1 px-2 ">
                        Complaints History
                    </h1>
                    <div className=" h-[calc(94%)] overflow-y-scroll ">
                        <ComplaintListingWrapper />
                    </div>
                </div>

            </div>
        </SideNavLayout>
    )
}

export default CustomerComplain
