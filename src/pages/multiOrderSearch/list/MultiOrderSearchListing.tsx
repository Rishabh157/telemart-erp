// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
// import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

// |-- Redux --|
// import { setPage } from 'src/redux/slices/MultiOrderSearchSlice'
// import { AppDispatch, RootState } from 'src/redux/store'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './MultiOrderSearchListingWrapper'

// |-- Types --|
type Props = {
    columns: any[]
    rows: any[]
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const MultiOrderSearchListing = ({
    columns,
    rows,
    formikProps,
    apiStatus,
}: Props) => {
    const { values, setFieldValue, handleSubmit } = formikProps
    const [selectedRows, setSelectedRows] = useState([])

    return (
        <div className="h-[calc(100vh-60px)] px-4">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[45px] p-1">
                <ATMPageHeading>Multiple Order Search</ATMPageHeading>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white ">
                {/*Table Header */}
                <div className="flex justify-between mb-3 px-2">
                    <div className="w-[80%] flex gap-x-4">
                        <ATMTextArea
                            name=""
                            value={values?.orderNumbers}
                            label=""
                            placeholder="Order number..."
                            className="rounded"
                            isDisable={
                                values.mobileNumbers.length ? true : false
                            }
                            onChange={(newValue) => {
                                const formatedCommaValue = newValue?.replace(
                                    /\s+/g,
                                    ','
                                ) // Replace spaces with commas
                                setFieldValue(
                                    'orderNumbers',
                                    formatedCommaValue
                                )
                            }}
                        />
                        <ATMTextArea
                            name=""
                            value={values.mobileNumbers}
                            label=""
                            isDisable={
                                values.orderNumbers.length ? true : false
                            }
                            placeholder="Enter Mobile number... "
                            className="rounded"
                            onChange={(event: string) => {
                                // let newValue = event
                                // // Replace spaces with commas
                                // newValue = event.replace(/\s+/g, ',')
                                // console.log('newValue: replace', newValue)
                                // // Add comma after every 10 characters
                                // newValue = newValue.replace(/(.{10})/g, '$1,')
                                // console.log(
                                //     'newValue: repalce after 10',
                                //     newValue
                                // )
                                setFieldValue('mobileNumbers', event)
                            }}
                        />

                        <ATMLoadingButton
                            disabled={apiStatus}
                            loadingText="Searching..."
                            onClick={handleSubmit as any}
                            className="bg-primary-main text-white flex items-center py-1 px-2 rounded w-30 mt-4"
                        >
                            Search
                        </ATMLoadingButton>
                    </div>
                </div>

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        // isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        extraClasses="max-h-[calc(100%-150px)] overflow-auto"
                        isLoading={apiStatus}
                    />
                </div>
            </div>
        </div>
    )
}

export default MultiOrderSearchListing
